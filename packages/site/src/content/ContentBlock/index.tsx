import Content from "./ContentBlock.stories.mdx";
import Props from "./ContentBlock.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Box width="100%" background="surface"}}>
  <ContentBlock justify="center">
    <Card>
      <Box padding="base">
        <Text>I am a card inside of a content block. Instead of being 100% width, I have been constrained and horizontally justified by the content block.</Text>
      </Box>
    </Card>
  </ContentBlock>
</Box>
    `,
  },
  title: "ContentBlock",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-contentblock-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
