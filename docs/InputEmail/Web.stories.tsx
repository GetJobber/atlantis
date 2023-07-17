import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputEmail } from "@jobber/components/InputEmail";

export default {
  title: "Components/Forms and Inputs/InputEmail/Web",
  component: InputEmail,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputEmail>;

const BasicTemplate: ComponentStory<typeof InputEmail> = args => (
  <InputEmail {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Enter your email",
};
