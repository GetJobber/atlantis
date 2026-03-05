import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { InputNumber } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputNumber/Mobile",
  component: InputNumber,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof InputNumber>;

const BasicTemplate: StoryFn<typeof InputNumber> = args => (
  <InputNumber {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Quantity",
    value: 12,
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    placeholder: "Area",
    invalid: "Enter a number",
    suffix: { label: "meters" },
    clearable: "never",
  },
};
