import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button, InputText } from "@jobber/components-native";

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

export const Toolbar = BasicTemplate.bind({});
Toolbar.args = {
  placeholder: "Write your message",
  toolbar: (
    <>
      <Button
        label="Rewrite"
        size="small"
        icon="sparkles"
        variation="cancel"
        fullWidth={false}
      />
      <Button
        accessibilityLabel="Undo"
        size="small"
        icon="redo"
        type="tertiary"
        variation="cancel"
        fullWidth={false}
      />
    </>
  ),
};
