import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonDismiss } from "@jobber/components/ButtonDismiss";

const meta = {
  title: "Components/Private/ButtonDismiss",
  component: ButtonDismiss,
} satisfies Meta<typeof ButtonDismiss>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => <ButtonDismiss {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    ariaLabel: "Dismiss",
    onClick: () => {
      alert("🎃");
    },
  },
};
