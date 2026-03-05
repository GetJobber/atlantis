import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
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
} satisfies Meta<typeof InputFieldWrapper>;

const BasicTemplate: StoryFn<typeof InputFieldWrapper> = args => (
  <InputFieldWrapper {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter a value in cents",
    prefix: { icon: "invoice" },
  },
};
export const PrefixAndSuffix = {
  render: BasicTemplate,
  args: {
    placeholder: "Invoice Total",
    prefix: { label: "$", icon: "invoice" },
    placeholderMode: "mini",
  },
};
export const Disabled = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter a value in cents",
    prefix: { icon: "invoice" },
    disabled: true,
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter a value in cents",
    prefix: { icon: "invoice" },
    invalid: true,
  },
};

const ClearableTemplate: StoryFn<typeof InputFieldWrapper> = args => {
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

export const Clearable = {
  render: ClearableTemplate,
  args: {
    showClearAction: true,
  },
};
