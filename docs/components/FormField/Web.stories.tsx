import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormField, TextInput } from "@jobber/components/FormField";

export default {
  title: "Components/Private/FormField/Web",
  component: FormField,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof FormField>;

const BasicTemplate: ComponentStory<typeof FormField> = args => (
  <FormField {...args} />
);

const SelectTemplate: ComponentStory<typeof FormField> = args => {
  return (
    <FormField {...args}>
      <option>1</option>
      <option>2</option>
    </FormField>
  );
};

const InlineTemplate: ComponentStory<typeof FormField> = args => {
  return (
    <p>
      Send a follow up <FormField {...args} /> days after the job is complete.
    </p>
  );
};

const RemixTemplate: ComponentStory<typeof TextInput> = args => {
  return (
    <div>
      <TextInput {...args} />
    </div>
  );
};
export const Remix = RemixTemplate.bind({});
Remix.args = {
  label: "Remix",
};
export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Words...",
  type: "text",
};

export const TextArea = BasicTemplate.bind({});
TextArea.args = {
  placeholder: "Your life story",
  type: "textarea",
  name: "story",
};

export const TimeInput = BasicTemplate.bind({});
TimeInput.args = {
  placeholder: "Your time of birth",
  type: "time",
  name: "birthday",
};

export const NumberInput = BasicTemplate.bind({});
NumberInput.args = {
  placeholder: "Your age in numbers",
  type: "number",
  name: "age",
};

export const Select = SelectTemplate.bind({});
Select.args = {
  placeholder: "Your favorite number",
  type: "select",
  name: "favoriteNumber",
};

export const Small = BasicTemplate.bind({});
Small.args = {
  placeholder: "Small",
  name: "small",
  size: "small",
};

export const Large = BasicTemplate.bind({});
Large.args = {
  placeholder: "Large",
  name: "large",
  size: "large",
};

export const Error = BasicTemplate.bind({});
Error.args = {
  placeholder: "Error",
  name: "error",
  invalid: true,
};

export const ReadOnly = BasicTemplate.bind({});
ReadOnly.args = {
  placeholder: "Read-only",
  name: "readOnly",
  readonly: true,
  value: "ABCXYZ",
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  placeholder: "Disabled",
  name: "disabled",
  disabled: true,
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  value: "7",
  size: "small",
  inline: true,
  maxLength: 2,
  align: "center",
};
