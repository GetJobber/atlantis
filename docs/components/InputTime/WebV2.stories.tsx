import { fn } from "storybook/test";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputTime } from "@jobber/components/InputTime";

const meta = {
  title: "Components/Forms and Inputs/InputTime/Web (v2)",
  component: InputTime,
  args: {
    version: 2,
    placeholder: "Select a time",
    disabled: false,
    invalid: false,
    value: new Date(),
    onChange: fn(),
  },
} satisfies Meta<typeof InputTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [value, setValue] = useState<Date>();

    return (
      <InputTime
        {...args}
        value={value}
        onChange={newDate => {
          setValue(newDate);
          args.onChange?.(newDate); // Log the action in the Storybook actions panel
        }}
      />
    );
  },
};
