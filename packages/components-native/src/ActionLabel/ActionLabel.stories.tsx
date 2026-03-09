import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { ActionLabel } from "@jobber/components-native";

const meta = {
  title: "Components/Actions/ActionLabel",
  component: ActionLabel,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof ActionLabel>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => {
  const { children, ...actionLabelProps } = args ?? {};

  return <ActionLabel {...actionLabelProps}>{children}</ActionLabel>;
};

export const Basic: Story = {
  render: BasicTemplate,
  args: { children: "I am a label text" },
};

export const Color: Story = {
  render: BasicTemplate,
  args: { variation: "learning", children: "Learning" },
};

export const DarkBackground: Story = {
  render: BasicTemplate,
  args: { variation: "onPrimary", children: "Light Me Up" },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  render: BasicTemplate,
  args: { disabled: true, children: "Disabled" },
};
