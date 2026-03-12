import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "@jobber/components/FormField";

const meta = {
  title: "Components/Private/FormField",
  component: FormField,
} satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof FormField>>>;

const BasicTemplate = (args: Story["args"]) => (
  <FormField
    {...args}
    name={args?.name ?? "example"}
    type={args?.type ?? "text"}
  />
);

const SelectTemplate = (args: Story["args"]) => {
  return (
    <FormField {...args} name={args?.name ?? "favoriteNumber"} type="select">
      <option>1</option>
      <option>2</option>
    </FormField>
  );
};

const InlineTemplate = (args: Story["args"]) => {
  return (
    <p>
      Send a follow up{" "}
      <FormField
        {...args}
        name={args?.name ?? "inline"}
        type={args?.type ?? "text"}
      />{" "}
      days after the job is complete.
    </p>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Words...",
    type: "text",
  },
};

export const TextArea: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Your life story",
    type: "textarea",
    name: "story",
  },
};

export const TimeInput: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Your time of birth",
    type: "time",
    name: "birthday",
  },
};

export const NumberInput: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Your age in numbers",
    type: "number",
    name: "age",
  },
};

export const Select: Story = {
  render: SelectTemplate,
  args: {
    placeholder: "Your favorite number",
    type: "select",
    name: "favoriteNumber",
  },
};

export const Small: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Small",
    name: "small",
    size: "small",
  },
};

export const Large: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Large",
    name: "large",
    size: "large",
  },
};

export const Error: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Error",
    name: "error",
    invalid: true,
  },
};

export const ReadOnly: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Read-only",
    name: "readOnly",
    readonly: true,
    value: "ABCXYZ",
  },
};

export const Disabled: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Disabled",
    name: "disabled",
    disabled: true,
  },
};

export const Inline: Story = {
  render: InlineTemplate,
  args: {
    value: "7",
    size: "small",
    inline: true,
    maxLength: 2,
    align: "center",
  },
};
