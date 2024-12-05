import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = args => (
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

export const Basic = Template.bind({});

const PrimaryTemplate: ComponentStory<
  typeof ButtonGroup.PrimaryAction
> = args => (
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

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  label: "Create",
  icon: "plus",
  onPress: () => console.log("create"),
};

const SecondaryTemplate: ComponentStory<
  typeof ButtonGroup.SecondaryAction
> = args => (
  <ButtonGroup
    bottomSheetHeading="What would you like to do"
    showCancelInBottomSheet={true}
  >
    <ButtonGroup.PrimaryAction
      label={"Click that ellipsis >>>"}
      buttonType={"secondary"}
      onPress={() => alert("No, not me. The ellipsis!")}
    />
    <ButtonGroup.SecondaryAction {...args} />
  </ButtonGroup>
);

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
  label: "Create",
  icon: "plus",
  onPress: () => console.log("create"),
};
