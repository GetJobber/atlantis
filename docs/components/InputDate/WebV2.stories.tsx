import React, { useState } from "react";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { InputDate } from "@jobber/components/InputDate";

const meta = {
  title: "Components/Forms and Inputs/InputDate/Web (v2)",
  component: InputDate,
  args: {
    version: 2,
    placeholder: "Select a date",
    disabled: false,
    invalid: false,
    onChange: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [value, setValue] = useState<Date>();

    return (
      <InputDate
        {...args}
        value={value}
        onChange={next => {
          setValue(next); // Controlled to reflect selection in the input while still logging actions
          args.onChange(next); // Log the action in the actions panel
        }}
        onBlur={() => {
          args.onBlur?.();
        }}
      />
    );
  },
};
