import Content from "./SideKick.mdx";
import Props from "./SideKick.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<div style={{width:'100%'}}>
    <SideKick  contentMinWidth="200px" sideWidth="50ch">
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
      url: "http://localhost:6006/?path=/docs/components-utilities-Sidekick-web--docs",
    },
  ],
} as const satisfies ContentExport;
