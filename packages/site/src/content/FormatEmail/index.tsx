import FormatEmailContent, { toc } from "./FormatEmail.stories.mdx";
import Props from "./FormatEmail.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <FormatEmailContent />,
  toc,
  props: Props,
  component: {
    element: `<FormatEmail email={"myemail@address.me"} />`,
  },
  title: "FormatEmail",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-utilities-formatemail--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
