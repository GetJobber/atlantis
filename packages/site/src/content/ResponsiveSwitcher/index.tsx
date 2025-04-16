import Content from "./ResponsiveSwitcher.mdx";
import Props from "./ResponsiveSwitcher.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<ContentBlock maxWidth="100%">
  <ResponsiveSwitcher threshold="50ch">
    <Card>
      <Box padding="base">
        <Text>Content Left/Above</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Content Right/Below</Text>
      </Box>
    </Card>
  </ResponsiveSwitcher>
</ContentBlock>`,
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
