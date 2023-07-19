import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPassword } from "@jobber/components/InputPassword";

export default {
  title: "Components/Forms and Inputs/InputPassword/Web",
  component: InputPassword,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputPassword>;

const BasicTemplate: ComponentStory<typeof InputPassword> = args => (
  <InputPassword {...args} />
);

const ControlledTemplate: ComponentStory<typeof InputPassword> = args => {
  const [value, setValue] = useState("password");
  return (
    <InputPassword
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Password",
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: "Password",
};

export const HasVisibility = BasicTemplate.bind({});
HasVisibility.args = {
  placeholder: "Password",
  hasVisibility: true,
};

export const WithError = BasicTemplate.bind({});
WithError.args = {
  placeholder: "Password",
  validations: {
    required: { value: true, message: "Password is required" },
    minLength: {
      value: 10,
      message: "Password must be at least 10 characters",
    },
  },
};
