import EmphasisContent, { toc } from "./Emphasis.stories.mdx";
import Props from "./Emphasis.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <EmphasisContent />,
  toc,
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
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-emphasis--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
