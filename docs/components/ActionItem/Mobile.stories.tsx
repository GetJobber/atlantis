import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ActionItem, Text } from "@jobber/components-native";

export default {
  title: "Components/Layouts and Structure/ActionItem/Mobile",
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof ActionItem>;

const BasicTemplate: ComponentStory<typeof ActionItem> = args => {
  return (
    <ActionItem {...args}>
      <Text>Service Checklist</Text>
    </ActionItem>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  icon: "work",
  onPress: () => alert("👍"),
};
