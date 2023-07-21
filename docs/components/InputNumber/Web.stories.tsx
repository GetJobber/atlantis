import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber } from "@jobber/components/InputNumber";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Forms and Inputs/InputNumber/Web",
  component: InputNumber,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputNumber>;

const BasicTemplate: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState(args.value);
  return (
    <InputNumber
      {...args}
      value={value}
      onChange={(newValue: number) => setValue(newValue)}
    />
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  value: 3,
};

export const Controlled = BasicTemplate.bind({});
Controlled.args = {
  value: 30,
  min: 0,
  max: 32,
  placeholder: "Age",
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  value: 1234,
  disabled: true,
  placeholder: "SIN Number",
};

export const ReadOnly = BasicTemplate.bind({});
ReadOnly.args = {
  value: 1234,
  readonly: true,
  placeholder: "Your PIN number",
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  value: 1.1,
  invalid: true,
  placeholder: "Give a whole number",
};

export const Sizes = BasicTemplate.bind({});
Sizes.args = {
  size: "small",
};

const InlineTemplate: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState(args.value);
  return (
    <Text>
      Follow-up after
      <InputNumber
        {...args}
        value={value}
        onChange={(newValue: number) => setValue(newValue)}
      />
      days
    </Text>
  );
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  size: "small",
  value: 2,
  inline: true,
  maxLength: 2,
  align: "center",
};
