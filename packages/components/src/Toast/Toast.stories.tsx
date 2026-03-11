import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { showToast } from "@jobber/components/Toast";
import { Button } from "@jobber/components/Button";
import type { ToastProps } from "@jobber/components/Toast";

interface ToastStoryArgs extends Pick<ToastProps, "message" | "variation"> {}

const meta = {
  title: "Components/Status and Feedback/Toast",
} satisfies Meta<ToastStoryArgs>;

export default meta;

type Story = StoryObj<ToastStoryArgs>;

const Template = (args: Story["args"]) => (
  <Button
    label="Show toast"
    onClick={() =>
      showToast({
        message: args?.message ?? "Showed toast",
        variation: args?.variation,
      })
    }
  />
);

export const Basic: Story = {
  render: Template,
  args: {
    message: "Showed toast",
  },
};

export const Variation: Story = {
  render: Template,
  args: {
    message: "Thinking...",
    variation: "info",
  },
};
