import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Option, Select } from "@jobber/components-native";

export default {
  title: "Components/Selections/Select/Mobile",
  component: Select,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Select>;

const BasicTemplate: StoryFn<typeof Select> = args => (
  <Select {...args}>
    <Option value="1">1</Option>
    <Option value="2">2</Option>
  </Select>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    label: "Favorite number",
  },
};
export const InitialValue = {
  render: BasicTemplate,
  args: {
    label: "Favorite number",
    defaultValue: "2",
  },
};
