import { Content } from "@jobber/components";
import Content from "@atlantis/docs/components/Content/Content.stories.mdx";
import Props from "./Content.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Content,
    defaultProps: {  },
  },
  title: "Content",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Content-web--docs",
    },
  ],
} as const satisfies ContentExport;