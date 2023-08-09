import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputFieldWrapper, Text } from "@jobber/components-native";

export default {
  title: "Components/Private/InputFieldWrapper/Mobile",
  component: InputFieldWrapper,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as ComponentMeta<typeof InputFieldWrapper>;

const BasicTemplate: ComponentStory<typeof InputFieldWrapper> = args => (
  <InputFieldWrapper {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Enter a value in cents",
  prefix: { icon: "invoice" },
};

export const PrefixAndSuffix = BasicTemplate.bind({});
PrefixAndSuffix.args = {
  placeholder: "Invoice Total",
  prefix: { label: "$", icon: "invoice" },
  hasMiniLabel: true,
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  placeholder: "Enter a value in cents",
  prefix: { icon: "invoice" },
  disabled: true,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  placeholder: "Enter a value in cents",
  prefix: { icon: "invoice" },
  invalid: true,
};

const ClearableTemplate: ComponentStory<typeof InputFieldWrapper> = args => {
  const [value, setValue] = useState("cucumber");
  function handleClear() {
    setValue("");
  }
  return (
    <InputFieldWrapper {...args} onClear={handleClear}>
      <Text>{value}</Text>
    </InputFieldWrapper>
  );
};

export const Clearable = ClearableTemplate.bind({});
Clearable.args = {
  showClearAction: true,
};
