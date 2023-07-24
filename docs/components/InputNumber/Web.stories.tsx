import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber, InputNumberRef } from "@jobber/components/InputNumber";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
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

const FocusTemplate: ComponentStory<typeof InputNumber> = args => {
  const inputNumberRef = useRef<InputNumberRef>(null);
  const focusInput = () => {
    inputNumberRef.current?.focus();
  };
  const blurInput = () => {
    inputNumberRef.current?.blur();
  };
  return (
    <Content>
      <InputNumber {...args} value={5} ref={inputNumberRef} />
      <Button label="Focus input" onClick={focusInput} />
      <br />
      <Button label="Blur input" onClick={blurInput} />
    </Content>
  );
};

export const FocusAndBlur = FocusTemplate.bind({});
FocusAndBlur.args = {};
