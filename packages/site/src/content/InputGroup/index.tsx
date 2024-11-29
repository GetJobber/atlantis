import { InputGroup } from "@jobber/components";
import Content from "@atlantis/docs/components/InputGroup/InputGroup.stories.mdx";
import Props from "./InputGroup.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputGroup,
    defaultProps: {  },
  },
  title: "InputGroup",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputGroup-web--docs",
    },
  ],
} as const satisfies ContentExport;