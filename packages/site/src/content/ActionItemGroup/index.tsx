import Content from "@atlantis/docs/components/ActionItemGroup/ActionItemGroup.stories.mdx";
import MobileProps from "./ActionItemGroup.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<ActionItemGroup>
      <Card>
        <ActionItem
          title={"Request #13"}
          icon={"request"}
          onPress={() => alert("request")}
        />
        <ActionItem
          title={"Quote #64"}
          icon={"quote"}
          onPress={() => alert("quote")}
        />
        <ActionItem
          title={"Job #12"}
          icon={"job"}
          onPress={() => alert("job")}
        />
        <ActionItem
          title={"Invoice #72"}
          icon={"invoice"}
          onPress={() => alert("invoice")}
        >
          <Text>$250.00</Text>
        </ActionItem>
      </Card>
    </ActionItemGroup>`,
  },
  title: "ActionItemGroup",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/story/components-layouts-and-structure-actionitemgroup-mobile--basic`,
    },
  ],
} as const satisfies ContentExport;
