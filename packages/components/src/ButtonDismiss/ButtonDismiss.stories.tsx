import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { ButtonDismiss } from "@jobber/components/ButtonDismiss";

export default {
  title: "Components/Private/ButtonDismiss/Web",
  component: ButtonDismiss,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof ButtonDismiss>;

const BasicTemplate: StoryFn<typeof ButtonDismiss> = args => (
  <ButtonDismiss {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    onClick: () => {
      alert("🎃");
    },
  },
};
