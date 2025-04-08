import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber2 } from "@jobber/components/InputNumber2";

export default {
  title: "Components/Forms and Inputs/InputNumber2/Web",
  component: InputNumber2,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputNumber2>;

const BasicTemplate: ComponentStory<typeof InputNumber2> = args => (
  <InputNumber2 {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
