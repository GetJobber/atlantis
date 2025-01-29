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
};

export const Cancel = BasicTemplate.bind({});
Cancel.args = {
  label: "Cancel",
  variation: "cancel",
  onPress: () => alert("I have been cancelled"),
};

export const WithCustomStyles = BasicTemplate.bind({});
WithCustomStyles.args = {
  label: "Custom Styled Button",
  icon: "plus",
  UNSAFE_style: {
    container: {
      backgroundColor: tokens["color-purple"],
      borderRadius: tokens["radius-large"],
      borderWidth: 2,
      borderColor: tokens["color-purple--dark"],
    },
    contentContainer: {
      paddingHorizontal: tokens["space-large"],
      gap: tokens["space-small"],
    },
    iconContainer: {
      backgroundColor: tokens["color-purple--light"],
      padding: tokens["space-small"],
      borderRadius: tokens["radius-base"],
    },
    actionLabelContainer: {
      paddingVertical: tokens["space-large"],
    },
  },
};
