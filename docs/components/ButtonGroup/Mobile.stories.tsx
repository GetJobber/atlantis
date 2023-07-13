import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroup } from "@jobber/components-native";

export default {
  title: "Components/Actions/ButtonGroup/Mobile",
  parameters: {
    viewMode: "story",
  },
  component: ButtonGroup,
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
Basic.storyName = "ButtonGroup";
