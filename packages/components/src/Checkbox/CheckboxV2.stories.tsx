import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@jobber/components/Checkbox";

const meta = {
  title: "Components/Selections/Checkbox/Web (v2)",
  component: Checkbox,
  args: {
    version: 2,
    label: "Subscribe to updates",
    defaultChecked: false,
    disabled: false,
    invalid: false,
    indeterminate: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Checkbox {...args} />,
};
