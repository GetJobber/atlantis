import Content from "@atlantis/docs/components/Avatar/Avatar.stories.mdx";
import Props from "./Avatar.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Avatar
      color={"var(--color-indigo)"}
      initials={"JBLR"}
      name={"The Jobbler"}
      size={"large"}
    />`,
  },
  title: "Avatar",
  description:
    "An Avatar is used to display a visual identifier for an individual user.",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-images-and-icons-avatar--docs`,
    },
  ],
} as const satisfies ContentExport;
