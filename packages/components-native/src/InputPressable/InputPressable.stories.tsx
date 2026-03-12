import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputPressable } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputPressable",
  component: InputPressable,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof InputPressable>;
export default meta;
type Story = StoryObj<typeof meta>;

const ClearableTemplate = (args: Story["args"]) => {
  const [value, setValue] = useState("Cucumber");

  function handleClear() {
    setValue("");
  }

  return <InputPressable {...args} value={value} onClear={handleClear} />;
};

export const Basic: Story = {
  args: {
    placeholder: "Placeholder",
    value: "Mango",
    onPress: () => alert("👍"),
  },
};

export const PrefixOrSuffix: Story = {
  args: {
    placeholder: "Selected date",
    value: "2021-01-01",
    prefix: { icon: "calendar" },
    onPress: () => alert("📅"),
  },
};

export const ClickableSuffix: Story = {
  render: () => (
    <InputPressable
      placeholder="Placeholder"
      value="input value"
      onPress={() => alert("👍")}
      suffix={{ icon: "dropdown", onPress: () => alert("👍") }}
    />
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Favourite fruit",
    disabled: true,
    value: "Mango",
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Favourite fruit",
    value: "Cucumber",
    invalid: "That isn't a fruit!",
  },
};

export const Clearable: Story = {
  render: ClearableTemplate,
  args: {
    placeholder: "Favourite fruit",
    clearable: "always",
  },
};
