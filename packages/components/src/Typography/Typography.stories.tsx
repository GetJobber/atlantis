import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Typography } from "@jobber/components/Typography";

export default {
  title: "Components/Text and Typography/Typography/Web",
  component: Typography,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Typography>;

const BasicTemplate: StoryFn<typeof Typography> = args => (
  <div>
    <Typography {...args}>Some type here</Typography>
  </div>
);

export const Basic = {
  render: BasicTemplate,
  args: {},
};
export const Element = {
  render: BasicTemplate,
  args: {
    element: "h1",
  },
};
export const TextCase = {
  render: BasicTemplate,
  args: {
    textCase: "uppercase",
  },
};
export const Emphasis = {
  render: BasicTemplate,
  args: {
    element: "span",
    emphasisType: "highlight",
  },
};
