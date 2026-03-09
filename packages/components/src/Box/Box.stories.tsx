import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@jobber/components/Box";

const meta = {
  title: "Components/Layouts and Structure/Box",
  component: Box,
} satisfies Meta<typeof Box>;
export default meta;
type Story = StoryObj<typeof Box>;

const BasicTemplate = (args: Story["args"]) => <Box {...args}>Box Content</Box>;

export const Basic: Story = {
  render: BasicTemplate,
  args: {},
};
