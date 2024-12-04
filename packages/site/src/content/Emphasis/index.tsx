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
      url: "http://localhost:6006/?path=/docs/components-utilities-Emphasis-web--docs",
    },
  ],
} as const satisfies ContentExport;
