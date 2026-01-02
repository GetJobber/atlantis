import Content from "./Select.stories.mdx";
import Notes from "./SelectNotes.mdx";
import Props from "./Select.props.json";
import MobileProps from "./Select.props-mobile.json";
import RebuiltProps from "./SelectV2.props.json";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  webSupportedProps: RebuiltProps,
  notes: () => <Notes />,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
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
  webSupportedLinks: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-selections-select-web-v2--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
