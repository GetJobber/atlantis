import { Avatar } from "@jobber/components";
import Content from "@atlantis/docs/components/Avatar/Avatar.stories.mdx";
import Props from "./Avatar.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Avatar,
    defaultProps: {},
  },
  title: "Avatar",
  description:
    "An Avatar is used to display a visual identifier for an individual user.",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-images-and-icons-avatar--docs",
    },
  ],
} as const satisfies ContentExport;
