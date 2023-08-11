import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { View } from "react-native";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components-native";

export default {
  title: "Components/Layouts and Structure/Divider/Mobile",
  component: Divider,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Divider>;

const BasicTemplate: ComponentStory<typeof Divider> = args => (
  <View
    style={{
      display: "flex",
      gap: 16,
    }}
  >
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </View>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  size: "base",
};
