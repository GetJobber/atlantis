import { Page } from "@jobber/components";
import Content from "@atlantis/docs/components/Page/Page.stories.mdx";
import Props from "./Page.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Page,
    defaultProps: {  },
  },
  title: "Page",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Page-web--docs",
    },
  ],
} as const satisfies ContentExport;