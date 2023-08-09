import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputText/Mobile",
  component: InputText,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof InputText>;

const BasicTemplate: ComponentStory<typeof InputText> = args => {
  return <InputText {...args} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "age",
  placeholder: "Age in words",
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  placeholder: "What is your favorite fruit?",
  defaultValue: "Tomato",
  invalid: "That's not a fruit",
};
