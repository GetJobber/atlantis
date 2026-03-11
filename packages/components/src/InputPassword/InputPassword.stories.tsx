import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputPassword } from "@jobber/components/InputPassword";

const meta = {
  title: "Components/Forms and Inputs/InputPassword",
  component: InputPassword,
} satisfies Meta<typeof InputPassword>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputPassword>>>;

const BasicTemplate = (args: Story["args"]) => <InputPassword {...args} />;

const ControlledTemplate = (args: Story["args"]) => {
  const [value, setValue] = useState("password");

  return (
    <InputPassword
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    placeholder: "Password",
  },
};

export const HasVisibility: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
    hasVisibility: true,
  },
};

export const WithError: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
    validations: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 10,
        message: "Password must be at least 10 characters",
      },
    },
  },
};
