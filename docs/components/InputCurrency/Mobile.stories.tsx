import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputCurrency } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputCurrency/Mobile",
  component: InputCurrency,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof InputCurrency>;

const BasicTemplate: ComponentStory<typeof InputCurrency> = args => (
  <InputCurrency {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Unit Price",
};
