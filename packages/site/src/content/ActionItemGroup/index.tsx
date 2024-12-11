import Content from "@atlantis/docs/components/ActionItemGroup/ActionItemGroup.stories.mdx";
import MobileProps from "./ActionItemGroup.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-actionitemgroup--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
