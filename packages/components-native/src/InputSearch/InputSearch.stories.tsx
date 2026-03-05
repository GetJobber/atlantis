import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
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
} satisfies Meta<typeof InputSearch>;

const BasicTemplate: StoryFn<typeof InputSearch> = args => {
  const [value, setValue] = useState("");

  return (
    <InputSearch
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
      onDebouncedChange={() => console.log(value)}
    />
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Search",
    prefix: {
      icon: "search",
    },
  },
};
