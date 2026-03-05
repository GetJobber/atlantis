import type { JSXElementConstructor } from "react";
import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { showToast } from "@jobber/components/Toast";
import { Button } from "@jobber/components/Button";

type Toast = JSXElementConstructor<Parameters<typeof showToast>[0]>;

export default {
  title: "Components/Status and Feedback/Toast/Web",
  component: showToast as Toast,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Toast": ["showToast"],
        },
      },
    },
  },
} as Meta<Toast>;

const Template: StoryFn<Toast> = args => (
  <Button label="Show toast" onClick={() => showToast(args)} />
);

export const Basic = {
  render: Template,
  args: {
    message: "Showed toast",
  },
};
export const Variation = {
  render: Template,
  args: {
    message: "Thinking...",
    variation: "info",
  },
};
