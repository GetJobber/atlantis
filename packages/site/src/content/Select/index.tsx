import Content from "@atlantis/docs/components/Select/Select.stories.mdx";
import Props from "./Select.props.json";
import MobileProps from "./Select.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Select placeholder={"My best friend"}>
      <Option value="tony">Tony</Option>
      <Option value="quincy">Quincy</Option>
      <Option value="peppa">Peppa Pig</Option>
    </Select>`,
    mobileElement: `<Select label={"Favorite number"}>
      <Option value="1">1</Option>
      <Option value="2">2</Option>
    </Select>`,
  },

  title: "Select",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-Select-web--docs`,
    },
  ],
} as const satisfies ContentExport;
