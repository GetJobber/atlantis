import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPassword } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputPassword/Mobile",
  component: InputPassword,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof InputPassword>;

const BasicTemplate: ComponentStory<typeof InputPassword> = args => (
  <InputPassword {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Password",
};
