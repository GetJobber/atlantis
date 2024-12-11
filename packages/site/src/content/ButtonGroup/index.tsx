import Content from "@atlantis/docs/components/ButtonGroup/ButtonGroup.stories.mdx";
import Props from "./ButtonGroup.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    mobileElement: `<ButtonGroup>
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
    `,
  },
  title: "ButtonGroup",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ButtonGroup-web--docs",
    },
  ],
} as const satisfies ContentExport;
