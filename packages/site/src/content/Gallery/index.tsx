import { Gallery } from "@jobber/components";
import Content from "@atlantis/docs/components/Gallery/Gallery.stories.mdx";
import Props from "./Gallery.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Gallery,
    defaultProps: {  },
  },
  title: "Gallery",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Gallery-web--docs",
    },
  ],
} as const satisfies ContentExport;