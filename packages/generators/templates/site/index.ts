import { {{name}} } from "@jobber/components";
import Content from "@atlantis/docs/components/{{name}}/{{name}}.stories.mdx";
import Props from "./{{name}}.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: Content,
  props: Props,
  component: {
    element: {{name}},
    defaultProps: {  },
    code: `<{{name}} />`,
  },
  title: "{{name}}",
  description:
    "{{name}}s are a ...",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-{{lowerCase name}}-web--docs",
    },
  ],
} as const satisfies ContentExport;
