import {{ name }}Content from "./{{name}}.stories.mdx";
import Props from "./{{name}}.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <{{ name }}Content />,
  props: Props,
  component: {
    element: `<{{name}} />`,
    defaultProps: {  },
  },
  title: "{{name}}",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-(section)-{{lowerCase name}}--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
