import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@jobber/components-native";
import { tokens } from "@jobber/design";

export default {
  title: "Components/Actions/Button/Mobile",
  component: Button,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Button>;

const BasicTemplate: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "New Job",
  onPress: () => alert("👍"),
  UNSAFE_style: {
    container: { backgroundColor: tokens["color-purple--light"] },
    contentContainer: {
      backgroundColor: tokens["color-purple--lighter"],
      borderRadius: tokens["radius-large"],
    },
    iconContainer: { backgroundColor: tokens["color-purple"] },
    actionLabelContainer: { paddingLeft: tokens["space-larger"] },
  },
};

export const Cancel = BasicTemplate.bind({});
Cancel.args = {
  label: "Cancel",
  variation: "cancel",
  onPress: () => alert("I have been cancelled"),
};
