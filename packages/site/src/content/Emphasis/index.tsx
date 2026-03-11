import EmphasisContent from "./Emphasis.stories.mdx";
import Props from "./Emphasis.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <EmphasisContent />,
  props: Props,
  component: {
    element: `<Typography size="largest" element="span" fontWeight={"extraBold"}>
          Save <Emphasis variation="highlight">40%</Emphasis> today
        </Typography>
    `,
  },
  title: "Emphasis",
  description: "",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-emphasis--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
