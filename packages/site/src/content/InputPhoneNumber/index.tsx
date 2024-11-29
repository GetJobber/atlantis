import { InputPhoneNumber } from "@jobber/components";
import Content from "@atlantis/docs/components/InputPhoneNumber/InputPhoneNumber.stories.mdx";
import Props from "./InputPhoneNumber.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputPhoneNumber,
    defaultProps: {  },
  },
  title: "InputPhoneNumber",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputPhoneNumber-web--docs",
    },
  ],
} as const satisfies ContentExport;