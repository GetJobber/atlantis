import React, { useState } from "react";
import { fn } from "storybook/test";
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
    onChange: fn(),
    value: "",
  },
} satisfies Meta<typeof InputEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [value, setValue] = useState("");

    return (
      <InputEmail
        {...args}
        value={value}
        onChange={(newValue: string) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};
