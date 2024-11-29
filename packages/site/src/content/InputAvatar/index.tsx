import { InputAvatar } from "@jobber/components";
import Content from "@atlantis/docs/components/InputAvatar/InputAvatar.stories.mdx";
import Props from "./InputAvatar.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputAvatar,
    defaultProps: {  },
  },
  title: "InputAvatar",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputAvatar-web--docs",
    },
  ],
} as const satisfies ContentExport;