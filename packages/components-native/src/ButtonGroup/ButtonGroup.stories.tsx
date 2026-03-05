import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { ButtonGroup } from "@jobber/components-native";

export default {
  title: "Components/Actions/ButtonGroup/Mobile",
  component: ButtonGroup,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
  subcomponents: {
    "ButtonGroup.PrimaryAction": ButtonGroup.PrimaryAction,
    "ButtonGroup.SecondaryAction": ButtonGroup.SecondaryAction,
  },
} satisfies Meta<typeof ButtonGroup>;

const Template: StoryFn<typeof ButtonGroup> = args => (
  <ButtonGroup {...args}>
    <ButtonGroup.PrimaryAction
      label={"Create"}
      icon={"plus"}
      onPress={() => console.log("create")}
    />
    <ButtonGroup.PrimaryAction
      label={"Edit"}
      icon={"edit"}
      onPress={() => console.log("edit")}
    />
    <ButtonGroup.SecondaryAction
      label={"Delete"}
      icon={"trash"}
      onPress={() => console.log("delete")}
    />
  </ButtonGroup>
);

export const Basic = {
  render: Template,
};

const PrimaryTemplate: StoryFn<typeof ButtonGroup.PrimaryAction> = args => (
  <ButtonGroup>
    <ButtonGroup.PrimaryAction {...args} />
    <ButtonGroup.SecondaryAction
      label={"Edit"}
      icon={"edit"}
      onPress={() => console.log("edit")}
    />
    <ButtonGroup.SecondaryAction
      label={"Delete"}
      icon={"trash"}
      onPress={() => console.log("delete")}
    />
  </ButtonGroup>
);

export const Primary = {
  render: PrimaryTemplate,
  args: {
    label: "Create",
    icon: "plus",
    onPress: () => console.log("create"),
  },
};
const SecondaryTemplate: StoryFn<typeof ButtonGroup.SecondaryAction> = args => (
  <ButtonGroup
    bottomSheetHeading="What would you like to do"
    showCancelInBottomSheet={true}
  >
    <ButtonGroup.PrimaryAction
      label={"Click that ellipsis >>>"}
      buttonType={"secondary"}
      onPress={() => console.log("No, not me. The ellipsis!")}
    />
    <ButtonGroup.SecondaryAction {...args} />
  </ButtonGroup>
);

export const Secondary = {
  render: SecondaryTemplate,
  args: {
    label: "Create",
    icon: "plus",
    onPress: () => console.log("create"),
  },
};
