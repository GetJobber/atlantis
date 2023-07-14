import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroup } from "@jobber/components-native";

export default {
  title: "Components/Actions/ButtonGroup/Mobile/ButtonGroup.PrimaryAction",
  parameters: {
    viewMode: "story",
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
  component: ButtonGroup.PrimaryAction,
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup.PrimaryAction> = args => (
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

export const Primary = Template.bind({});
Primary.storyName = "ButtonGroup.PrimaryAction";
Primary.args = {
  label: "Create",
  icon: "plus",
  onPress: () => console.log("create"),
};
