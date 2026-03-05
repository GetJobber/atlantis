import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { InputCurrency } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputCurrency/Mobile",
  component: InputCurrency,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof InputCurrency>;

const BasicTemplate: StoryFn<typeof InputCurrency> = args => (
  <InputCurrency {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Unit Price",
  },
};
