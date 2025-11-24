import React from "react";
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
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <InputText {...args} />,
};
