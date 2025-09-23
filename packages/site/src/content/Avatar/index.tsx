import Content from "./Avatar.stories.mdx";
import Props from "./Avatar.props.json";
import Notes from "./AvatarNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-images-and-icons-avatar--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
