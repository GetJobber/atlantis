import Content from "./Center.stories.mdx";
import Props from "./Center.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{width:'100%', backgroundColor:'var(--color-surface'}}>
  <Center>
    <Card>
      <Box padding="base">
        <Text>Hello</Text>
      </Box>
    </Card>
  </Center>
</div>
    `,
  },
  title: "Center",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-center-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
