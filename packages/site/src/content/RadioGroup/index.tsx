import { RadioGroup } from "@jobber/components";
import Content from "@atlantis/docs/components/RadioGroup/RadioGroup.stories.mdx";
import Props from "./RadioGroup.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: RadioGroup,
    defaultProps: {  },
  },
  title: "RadioGroup",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-RadioGroup-web--docs",
    },
  ],
} as const satisfies ContentExport;