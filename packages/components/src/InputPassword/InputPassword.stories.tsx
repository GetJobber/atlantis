import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { InputPassword } from "@jobber/components/InputPassword";

export default {
  title: "Components/Forms and Inputs/InputPassword/Web",
  component: InputPassword,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof InputPassword>;

const BasicTemplate: StoryFn<typeof InputPassword> = args => (
  <InputPassword {...args} />
);

const ControlledTemplate: StoryFn<typeof InputPassword> = args => {
  const [value, setValue] = useState("password");

  return (
    <InputPassword
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
  },
};
export const Controlled = {
  render: ControlledTemplate,
  args: {
    placeholder: "Password",
  },
};
export const HasVisibility = {
  render: BasicTemplate,
  args: {
    placeholder: "Password",
    hasVisibility: true,
  },
};
export const WithError = {
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
