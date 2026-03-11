import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InlineLabel } from "@jobber/components/InlineLabel";

const meta = {
  title: "Components/Status and Feedback/InlineLabel",
  component: InlineLabel,
} satisfies Meta<typeof InlineLabel>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InlineLabel>>>;

const BasicTemplate = (args: Story["args"]) => (
  <InlineLabel {...args}>Draft</InlineLabel>
);

export const Basic: Story = {
  render: BasicTemplate,
};
