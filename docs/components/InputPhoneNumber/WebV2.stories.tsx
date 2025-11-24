import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputPhoneNumber } from "@jobber/components/InputPhoneNumber";

const meta = {
  title: "Components/Forms and Inputs/InputPhoneNumber/Web (v2)",
  component: InputPhoneNumber,
  args: {
    version: 2,
    placeholder: "Enter your phone number",
    disabled: false,
    invalid: false,
    pattern: "(***) ***-****",
    required: false,
  },
} satisfies Meta<typeof InputPhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: "",
    onChange: (v: string) => {
      void v;
    },
  },
  render: args => {
    const [value, setValue] = useState(args.value as string);

    return <InputPhoneNumber {...args} value={value} onChange={setValue} />;
  },
};
