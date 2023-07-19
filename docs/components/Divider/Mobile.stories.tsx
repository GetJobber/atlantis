import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
  <div
    style={{
      display: "grid",
      gap: "var(--space-base)",
    }}
  >
    <Content>Some amazing content</Content>
    <Divider {...args} />
    <Content>Even more amazing content</Content>
  </div>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  size: "base",
};
