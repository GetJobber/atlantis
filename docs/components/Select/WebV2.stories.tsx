import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Option, Select } from "@jobber/components/Select";

const meta = {
  title: "Components/Selections/Select/Web (v2)",
  component: Select,
  args: {
    version: 2,
    placeholder: "Select an option",
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    return (
      <Select {...args}>
        <Option value="one">One</Option>
        <Option value="two">Two</Option>
        <Option value="three">Three</Option>
      </Select>
    );
  },
};
