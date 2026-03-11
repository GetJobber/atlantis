import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Option, Select } from "@jobber/components-native";

type SelectStoryArgs = Pick<
  React.ComponentProps<typeof Select>,
  "label" | "defaultValue"
>;

const meta = {
  title: "Components/Selections/Select",
  component: Select,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<SelectStoryArgs>;

export const Basic: Story = {
  render: args => (
    <Select label={args?.label ?? "Favorite number"}>
      <Option value="1">1</Option>
      <Option value="2">2</Option>
    </Select>
  ),
  args: {
    label: "Favorite number",
  },
};

export const InitialValue: Story = {
  render: args => (
    <Select
      label={args?.label ?? "Favorite number"}
      defaultValue={args?.defaultValue ?? "2"}
    >
      <Option value="1">1</Option>
      <Option value="2">2</Option>
    </Select>
  ),
  args: {
    label: "Favorite number",
    defaultValue: "2",
  },
};
