import Content from "./SideKick.mdx";
import Props from "./SideKick.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{width:'100%'}}>
  <SideKick contentMinWidth="80%" sideWidth="70px">
    <InputText placeholder="Name" label="Name" />
    <Button>
        <Button.Label>Submit</Button.Label>
    </Button>
  </SideKick>
</div>
    `,
  },
  title: "SideKick",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-sidekick-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
