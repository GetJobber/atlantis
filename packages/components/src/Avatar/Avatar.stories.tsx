import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@jobber/components/Avatar";
import { Tooltip } from "@jobber/components/Tooltip";

const meta = {
  title: "Components/Images and Icons/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => <Avatar {...args} />;

const TooltipTemplate = (args: Story["args"]) => (
  <Tooltip message="The Jobbler">
    <Avatar {...args} />
  </Tooltip>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    color: "var(--color-green)",
    imageUrl:
      "https://images.unsplash.com/photo-1533858539156-90ea20bafd17?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    initials: "JBLR",
    name: "The Jobbler",
    size: "large",
  },
};

export const WithTooltip: Story = {
  render: TooltipTemplate,
  args: {
    size: "large",
    initials: "JBLR",
  },
};
