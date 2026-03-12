import Content from "./SideKick.mdx";
import Props from "./SideKick.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<ContentBlock maxWidth="100%">
  <SideKick contentMinWidth="80%" sideWidth="70px">
    <InputText placeholder="Name" label="Name" />
    <Button>
        <Button.Label>Submit</Button.Label>
    </Button>
  </SideKick>
</ContentBlock>
    `,
  },
  title: "SideKick",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-sidekick--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
