import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputPhoneNumber } from "@jobber/components/InputPhoneNumber";

const meta = {
  title: "Components/Forms and Inputs/InputPhoneNumber/Web (v2)",
  component: InputPhoneNumber,
  args: {
    version: 2,
    placeholder: "Enter your phone number",
    value: "",
    pattern: "(***) ***-****",
    disabled: false,
    invalid: false,
    required: false,
    onChange: (v: string) => {
      void v;
    },
  },
  argTypes: {
    onChange: { table: { disable: true } }, // hide handler from Controls
  },
} satisfies Meta<typeof InputPhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    // Local state to manage the required controlled value
    const [value, setValue] = useState(args.value as string);

    return <InputPhoneNumber {...args} value={value} onChange={setValue} />;
  },
};
