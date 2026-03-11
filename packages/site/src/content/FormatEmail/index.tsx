import FormatEmailContent from "./FormatEmail.stories.mdx";
import Props from "./FormatEmail.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <FormatEmailContent />,
  props: Props,
  component: {
    element: `<FormatEmail email={"myemail@address.me"} />`,
  },
  title: "FormatEmail",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-utilities-formatemail--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
