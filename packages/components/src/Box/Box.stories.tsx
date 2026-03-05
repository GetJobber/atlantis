import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Box/Web",
  component: Box,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Box>;

const BasicTemplate: StoryFn<typeof Box> = args => (
  <Box {...args}>Box Content</Box>
);

export const Basic = {
  render: BasicTemplate,
  args: {},
};
