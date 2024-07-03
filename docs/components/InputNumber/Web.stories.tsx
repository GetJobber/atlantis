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

const SizesTemplate: ComponentStory<typeof InputNumber> = () => {
  return (
    <Content>
      <InputNumber size="small" value={100} />
      <InputNumber size="large" value={1000} />
    </Content>
  );
};

export const Sizes = SizesTemplate.bind({});

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

  function toggleInputFocus(shouldFocus = true) {
    const action = shouldFocus ? "focus" : "blur";
    inputNumberRef.current?.[action]();
  }

  return (
    <Content>
      <InputNumber {...args} value={5} ref={inputNumberRef} />
      <Button label="Focus input" onClick={() => toggleInputFocus(true)} />
      <br />
      <Button label="Blur input" onClick={() => toggleInputFocus(false)} />
    </Content>
  );
};

export const FocusAndBlur = FocusTemplate.bind({});
FocusAndBlur.args = {};

const ReadonlyTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const Readonly = ReadonlyTemplate.bind({});
Readonly.args = {
  placeholder: "Your pin number",
  value: 12345,
  readonly: true,
};

const DisabledTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  placeholder: "SIN number",
  value: 12345,
  disabled: true,
};

const PrefixAndSuffixTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const PrefixAndSuffix = PrefixAndSuffixTemplate.bind({});
PrefixAndSuffix.args = {
  suffix: { label: ".00" },
  prefix: { label: "$", icon: "invoice" },
  placeholder: "Invoice total",
  defaultValue: "100000",
};

const ControlledTemplate: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState(args.value);

  return (
    <Content>
      <InputNumber
        {...args}
        value={value}
        onChange={(newValue: number) => setValue(newValue)}
      />
      <Button label="Reset" onClick={() => setValue(args.value)} />
    </Content>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  value: 10,
};
