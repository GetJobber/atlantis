import React, { useState } from "react";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";

const meta = {
  title: "Components/Forms and Inputs/InputText/Web (v2)",
  component: InputText,
  args: {
    version: 2,
    placeholder: "Type here",
    disabled: false,
    invalid: false,
    onChange: fn(),
    value: "",
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [value, setValue] = useState("");

    return (
      <InputText
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
