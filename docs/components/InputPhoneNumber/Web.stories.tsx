import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPhoneNumber } from "@jobber/components/InputPhoneNumber";

export default {
  title: "Components/Forms and Inputs/InputPhoneNumber/Web",
  component: InputPhoneNumber,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputPhoneNumber>;

const BasicTemplate: ComponentStory<typeof InputPhoneNumber> = args => {
  const [value, setValue] = useState(args.value);
  return <InputPhoneNumber {...args} value={value} onChange={setValue} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Enter your phone number",
};

export const WithCountryCode = BasicTemplate.bind({});
WithCountryCode.args = {
  placeholder: "Enter your phone number",
  prefix: { label: "+1" },
};

export const CustomPattern = BasicTemplate.bind({});
CustomPattern.args = {
  placeholder: "Enter your phone number",
  pattern: "(***) ***-**-**",
};

export const InitialValue = BasicTemplate.bind({});
InitialValue.args = {
  value: "555-TUNA",
  placeholder: "Enter your phone number",
};
