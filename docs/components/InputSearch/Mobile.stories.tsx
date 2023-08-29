import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputSearch } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputSearch/Mobile",
  component: InputSearch,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as ComponentMeta<typeof InputSearch>;

const BasicTemplate: ComponentStory<typeof InputSearch> = args => {
  const [value, setValue] = useState("");
  return (
    <InputSearch
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
      onDebouncedChange={() => alert(value)}
    />
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Search",
  prefix: {
    icon: "search",
  },
};
