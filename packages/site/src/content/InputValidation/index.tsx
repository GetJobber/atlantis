import Content, { toc } from "./InputValidation.stories.mdx";
import Props from "./InputValidation.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  component: {
    element: `const [validationMessages, setValidationMessages] = useState("");

  return (
    <>
      <Text>
        My name is
        <InputText
          validations={{
            required: {
              value: true,
              message: "Please tell me your name",
            },
            pattern: {
              value: /Jeff/,
              message: "Have you considered a better name, like Jeff?",
            },
          }}
          onValidation={(message) => setValidationMessages(message)}
          size="small"
          inline={true}
          maxLength={4}
        />
      </Text>
      {validationMessages && <InputValidation message={validationMessages} />}
    </>
  );`,
    defaultProps: {},
  },
  title: "InputValidation",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputvalidation--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
