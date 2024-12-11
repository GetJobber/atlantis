import Content from "@atlantis/docs/components/ButtonGroup/ButtonGroup.stories.mdx";
import Props from "./ButtonGroup.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    mobileElement: `<Host>
    <ButtonGroup>
      <ButtonGroup.PrimaryAction
        label={"Create"}
        icon={"plus"}
        onPress={() => alert("create")}
      />
      <ButtonGroup.PrimaryAction
        label={"Edit"}
        icon={"edit"}
      onPress={() => alert("edit")}
      />
      <ButtonGroup.SecondaryAction
        label={"Delete"}
        icon={"trash"}
        onPress={() => alert("delete")}
      />
    </ButtonGroup>
    </Host>
    `,
  },
  title: "ButtonGroup",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-actions-buttongroup--docs`),
    },
  ],
} as const satisfies ContentExport;
