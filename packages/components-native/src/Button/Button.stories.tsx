import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { fn } from "storybook/test";
import { Button } from "@jobber/components-native";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => <Button {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    label: "New Job",
    onPress: fn(),
  },
};

export const Cancel: Story = {
  render: BasicTemplate,
  args: {
    label: "Cancel",
    variation: "cancel",
    onPress: fn(),
  },
};
