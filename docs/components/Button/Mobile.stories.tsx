import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@jobber/components-native";

export default {
  title: "Components/Actions/Button/Mobile",
  component: Button,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof Button>;

const BasicTemplate: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "New Job",
  onPress: () => alert("👍"),
};

export const Cancel = BasicTemplate.bind({});
Cancel.args = {
  label: "Cancel",
  variation: "cancel",
  onPress: () => alert("I have been cancelled"),
};
