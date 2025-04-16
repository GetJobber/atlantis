import Content from "./Stack.mdx";
import Props from "./Stack.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Stack>
  <Card>
    <Box padding="base">Vertically</Box>
  </Card>
  <Card>
    <Box padding="base">Stacked</Box>
  </Card>
</Stack>
    `,
  },
  title: "Stack",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-stack-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
