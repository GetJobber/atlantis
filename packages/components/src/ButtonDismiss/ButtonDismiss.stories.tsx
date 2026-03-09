import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonDismiss } from "@jobber/components/ButtonDismiss";
import type { ButtonDismissProps } from "@jobber/components/ButtonDismiss";

const meta = {
  title: "Components/Private/ButtonDismiss",
  component: ButtonDismiss,
} satisfies Meta<typeof ButtonDismiss>;
export default meta;
type Story = StoryObj<typeof ButtonDismiss>;

const toButtonDismissProps = (args: Story["args"]): ButtonDismissProps => {
  const storyArgs = (args ?? {}) as Partial<ButtonDismissProps>;

  return {
    ariaLabel: storyArgs.ariaLabel ?? "Dismiss",
    onClick: storyArgs.onClick,
  };
};

const BasicTemplate = (args: Story["args"]) => (
  <ButtonDismiss {...toButtonDismissProps(args)} />
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    onClick: () => {
      alert("🎃");
    },
  },
};
