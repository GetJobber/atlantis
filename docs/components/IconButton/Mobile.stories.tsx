import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IconButton } from "@jobber/components-native";

export default {
  title: "Components/Actions/IconButton/Mobile",
  component: IconButton,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof IconButton>;

const BasicTemplate: ComponentStory<typeof IconButton> = args => (
  <IconButton {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  accessibilityLabel: "New Job",
  name: "remove",
  onPress: () => alert("👍"),
};
