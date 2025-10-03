import Content from "./Select.stories.mdx";
import Notes from "./SelectNotes.mdx";
import Props from "./Select.props.json";
import MobileProps from "./Select.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  notes: () => <Notes />,
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
      url: getStorybookUrl(`?path=/docs/components-selections-select--docs`),
    },
  ],
} as const satisfies ContentExport;
