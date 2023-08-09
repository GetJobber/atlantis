import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputNumber/Mobile",
  component: InputNumber,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof InputNumber>;

const BasicTemplate: ComponentStory<typeof InputNumber> = args => (
  <InputNumber {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Quantity",
  value: 12,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  placeholder: "Area",
  invalid: "Enter a number",
  suffix: { label: "meters" },
  clearable: "never",
};
