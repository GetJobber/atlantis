import Content from "./ResponsiveSwitcher.mdx";
import Props from "./ResponsiveSwitcher.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{width:'100%'}}>
    <ResponsiveSwitcher threshold="50ch">
    <Card>
    <Rectangle>
    <Text>Content Left/Above</Text>
    </Rectangle>
    </Card>
    <Card>
    <Rectangle>
    <Text>Content Right/Below</Text>
    </Rectangle>
    </Card>
    </ResponsiveSwitcher>
    </div>`,
  },
  title: "ResponsiveSwitcher",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-responsiveswitcher-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
