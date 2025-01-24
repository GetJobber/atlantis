import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormField } from "@jobber/components/FormField";

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

export const ComposedTemplate: ComponentStory<
  typeof FormField.Control
> = args => {
  return (
    <FormField.Control>
      <FormField.Label>Label</FormField.Label>
      <FormField.Input
        placeholder="Enter Your Text!"
        {...args}
        size={2}
        value={args.value as string}
      />
      <FormField.HelperText>Description</FormField.HelperText>
      <FormField.ErrorMessage>Error</FormField.ErrorMessage>
    </FormField.Control>
  );
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
