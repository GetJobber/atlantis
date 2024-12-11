import EmphasisContent from "@atlantis/docs/components/Emphasis/Emphasis.stories.mdx";
import Props from "./Emphasis.props.json";
import { ContentExport } from "../../types/content";

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
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-text-and-typography-emphasis--docs`,
    },
  ],
} as const satisfies ContentExport;
