import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  RawDatePicker,
  SelectInput,
  SelectOption,
  TextInput,
} from "@jobber/components/FormField";
import { CheckboxInput } from "@jobber/components/Checkbox";

export default {
  title: "Components/Forms and Inputs/RawForm/Web",
  component: TextInput,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof TextInput>;

const TextTemplate: ComponentStory<typeof TextInput> = args => {
  return (
    <div>
      <TextInput {...args} />
    </div>
  );
};
export const Text = TextTemplate.bind({});
Text.args = {
  label: "Raw",
};

const SelectTemplate: ComponentStory<typeof SelectInput> = args => {
  return (
    <div>
      <SelectInput {...args}>
        <SelectOption value={"First"}>First</SelectOption>
        <SelectOption value={"Second"}>Second</SelectOption>
        <SelectOption value={"Third"}>Third</SelectOption>
      </SelectInput>
    </div>
  );
};
export const Select = SelectTemplate.bind({});
Select.args = {
  label: "Raw Select",
};

const DateTemplate: ComponentStory<typeof RawDatePicker> = args => {
  return (
    <div>
      <RawDatePicker {...args} />
    </div>
  );
};
export const Date = DateTemplate.bind({});
Date.args = {
  label: "Raw",
};

const CheckboxTemplate: ComponentStory<typeof CheckboxInput> = args => {
  return (
    <div>
      <CheckboxInput {...args} />
    </div>
  );
};
export const Checkbox = CheckboxTemplate.bind({});
Text.args = {
  label: "Raw",
};
