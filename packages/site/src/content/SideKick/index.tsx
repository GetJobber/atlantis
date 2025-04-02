import Content from "./SideKick.mdx";
import Props from "./SideKick.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<SideKick contentMinWidth="60%" sideWidth="60px">
        <InputText label="Name" />
        <Button>
            <Button.Label>Submit</Button.Label>
        </Button>
    </SideKick>
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
