import Content from "./ContentBlock.stories.mdx";
import Props from "./ContentBlock.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{width:'100%', backgroundColor:'var(--color-surface'}}>
  <ContentBlock justify="center">
    <Card>
      <Box padding="base">
        <Text>I am a card inside of a content block. Instead of being 100% width, I have been constrained and horizontally justified by the content block.</Text>
      </Box>
    </Card>
  </ContentBlock>
</div>
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
