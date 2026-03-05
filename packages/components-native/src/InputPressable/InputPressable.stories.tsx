import React, { useState } from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-native-web-vite";
import { InputPressable } from "@jobber/components-native";

const meta: Meta<typeof InputPressable> = {
  title: "Components/Forms and Inputs/InputPressable/Mobile",
  component: InputPressable,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
};

export default meta;
type Story = StoryObj<typeof InputPressable>;

const BasicTemplate: StoryFn<typeof InputPressable> = args => (
  <InputPressable {...args} />
);

const ClearableTemplate: StoryFn<typeof InputPressable> = args => {
  const [value, setValue] = useState("Cucumber");

  function handleClear() {
    setValue("");
  }

  return <InputPressable {...args} value={value} onClear={handleClear} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Placeholder",
    value: "Mango",
    onPress: () => console.log("👍"),
  },
};
export const PrefixOrSuffix = {
  render: BasicTemplate,
  args: {
    placeholder: "Selected date",
    value: "2021-01-01",
    prefix: { icon: "calendar" },
    onPress: () => console.log("📅"),
  },
};
export const ClickableSuffix: Story = {
  render: () => (
    <InputPressable
      placeholder="Placeholder"
      value="input value"
      onPress={() => console.log("👍")}
      suffix={{ icon: "dropdown", onPress: () => console.log("👍") }}
    />
  ),
};

export const Disabled = {
  render: BasicTemplate,
  args: {
    placeholder: "Favourite fruit",
    disabled: true,
    value: "Mango",
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    placeholder: "Favourite fruit",
    value: "Cucumber",
    invalid: "That isn't a fruit!",
  },
};
export const Clearable = {
  render: ClearableTemplate,
  args: {
    placeholder: "Favourite fruit",
    clearable: "always",
  },
};
