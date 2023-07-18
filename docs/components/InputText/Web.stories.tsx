import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";

export default {
  title: "Components/Forms and Inputs/InputText/Web",
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

export const Multiline = BasicTemplate.bind({});
Multiline.args = {
  defaultValue: "Rocinante",
  multiline: true,
  rows: { min: 1, max: 5 },
};

export const Readonly = BasicTemplate.bind({});
Readonly.args = {
  defaultValue: "Rocinante",
  readonly: true,
};

export const Loading = BasicTemplate.bind({});
Loading.args = {
  name: "phoneNumber",
  loading: true,
};
