import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPressable } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputPressable/Mobile",
  component: InputPressable,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof InputPressable>;

const BasicTemplate: ComponentStory<typeof InputPressable> = args => (
  <InputPressable {...args} />
);

const ClearableTemplate: ComponentStory<typeof InputPressable> = args => {
  const [value, setValue] = useState("Cucumber");
  function handleClear() {
    setValue("");
  }
  return <InputPressable {...args} value={value} onClear={handleClear} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Placeholder",
  value: "Mango",
  onPress: () => alert("👍"),
};

export const PrefixOrSuffix = BasicTemplate.bind({});
PrefixOrSuffix.args = {
  placeholder: "Selected date",
  value: "2021-01-01",
  prefix: { icon: "calendar" },
  onPress: () => alert("📅"),
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  placeholder: "Favourite fruit",
  disabled: true,
  value: "Mango",
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  placeholder: "Favourite fruit",
  value: "Cucumber",
  invalid: "That isn't a fruit!",
};

export const Clearable = ClearableTemplate.bind({});
Clearable.args = {
  placeholder: "Favourite fruit",
  clearable: "always",
};
