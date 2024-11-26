import { Card } from "@jobber/components";
import CardContent from "@atlantis/docs/components/Card/Card.stories.mdx";
import Props from "./Card.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <CardContent />,
  props: Props,
  component: {
    element: Card,
    defaultProps: { header: "Card Title" },
  },
  title: "Card",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Card-web--docs",
    },
  ],
} as const satisfies ContentExport;
