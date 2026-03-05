import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { FormField } from "@jobber/components/FormField";

export default {
  title: "Components/Private/FormField/Web",
  component: FormField,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof FormField>;

const BasicTemplate: StoryFn<typeof FormField> = args => (
  <FormField {...args} />
);

const SelectTemplate: StoryFn<typeof FormField> = args => {
  return (
    <FormField {...args}>
      <option>1</option>
      <option>2</option>
    </FormField>
  );
};

const InlineTemplate: StoryFn<typeof FormField> = args => {
  return (
    <p>
      Send a follow up <FormField {...args} /> days after the job is complete.
    </p>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Words...",
    type: "text",
  },
};
export const TextArea = {
  render: BasicTemplate,
  args: {
    placeholder: "Your life story",
    type: "textarea",
    name: "story",
  },
};
export const TimeInput = {
  render: BasicTemplate,
  args: {
    placeholder: "Your time of birth",
    type: "time",
    name: "birthday",
  },
};
export const NumberInput = {
  render: BasicTemplate,
  args: {
    placeholder: "Your age in numbers",
    type: "number",
    name: "age",
  },
};
export const Select = {
  render: SelectTemplate,
  args: {
    placeholder: "Your favorite number",
    type: "select",
    name: "favoriteNumber",
  },
};
export const Small = {
  render: BasicTemplate,
  args: {
    placeholder: "Small",
    name: "small",
    size: "small",
  },
};
export const Large = {
  render: BasicTemplate,
  args: {
    placeholder: "Large",
    name: "large",
    size: "large",
  },
};
export const Error = {
  render: BasicTemplate,
  args: {
    placeholder: "Error",
    name: "error",
    invalid: true,
  },
};
export const ReadOnly = {
  render: BasicTemplate,
  args: {
    placeholder: "Read-only",
    name: "readOnly",
    readonly: true,
    value: "ABCXYZ",
  },
};
export const Disabled = {
  render: BasicTemplate,
  args: {
    placeholder: "Disabled",
    name: "disabled",
    disabled: true,
  },
};
export const Inline = {
  render: InlineTemplate,
  args: {
    value: "7",
    size: "small",
    inline: true,
    maxLength: 2,
    align: "center",
  },
};
