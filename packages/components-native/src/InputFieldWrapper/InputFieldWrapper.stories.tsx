import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputFieldWrapper, Text } from "@jobber/components-native";

const meta = {
  title: "Components/Private/InputFieldWrapper",
  component: InputFieldWrapper,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputFieldWrapper>;
export default meta;
type Story = StoryObj<typeof meta>;
type ClearableStory = StoryObj<
  Pick<React.ComponentProps<typeof InputFieldWrapper>, "showClearAction">
>;

export const Basic: Story = {
  args: {
    placeholder: "Enter a value in cents",
    prefix: { icon: "invoice" },
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    placeholder: "Invoice Total",
    prefix: { label: "$", icon: "invoice" },
    placeholderMode: "mini",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Enter a value in cents",
    prefix: { icon: "invoice" },
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Enter a value in cents",
    prefix: { icon: "invoice" },
    invalid: true,
  },
};

const ClearableTemplate = (
  args: React.ComponentProps<typeof InputFieldWrapper>,
) => {
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

export const Clearable: ClearableStory = {
  render: args =>
    ClearableTemplate({
      showClearAction: args.showClearAction,
    }),
  args: {
    showClearAction: true,
  },
};
