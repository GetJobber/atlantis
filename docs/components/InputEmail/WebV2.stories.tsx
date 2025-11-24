import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputEmail } from "@jobber/components/InputEmail";

const meta = {
  title: "Components/Forms and Inputs/InputEmail/Web (v2)",
  component: InputEmail,
  args: {
    version: 2,
    placeholder: "Enter your email",
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof InputEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <InputEmail {...args} />,
};
