module.exports = {
  meta: {
    type: "problem",
    messages: {
      deprecatedProp:
        "'{{propValue}}' is a deprecated value for '{{propName}}' on '{{component}}'. Use '{{suggestion}}' instead.",
    },
    docs: {
      description:
        "Disallow usage of deprecated prop values on specific component props",
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: {
              type: "object",
              properties: {
                component: { type: "string" },
                prop: { type: "string" },
                deprecatedValues: {
                  type: "object",
                  additionalProperties: { type: "string" },
                },
              },
              required: ["component", "prop", "deprecatedValues"],
              additionalProperties: false,
            },
          },
        },
        required: ["components"],
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    // Extract the list of components from options
    const componentsConfig = context.options[0].components;

    return {
      JSXOpeningElement(node) {
        const componentName = node.name.name;

        // Find the configuration for the current component if present
        const componentConfig = componentsConfig.find(
          config => config.component === componentName,
        );

        if (componentConfig) {
          // Check all the props/attributes of the component
          node.attributes.forEach(attribute => {
            const propName = attribute.name.name;
            const propValueNode = attribute.value;

            // Check if the attribute is the specified prop and if it has a deprecated value
            if (
              propName === componentConfig.prop &&
              propValueNode &&
              propValueNode.type === "Literal" &&
              componentConfig.deprecatedValues[propValueNode.value]
            ) {
              context.report({
                node: propValueNode,
                messageId: "deprecatedProp",
                data: {
                  propValue: propValueNode.value,
                  suggestion:
                    componentConfig.deprecatedValues[propValueNode.value],
                  component: componentName,
                  propName: propName,
                },
              });
            }
          });
        }
      },
    };
  },
};
