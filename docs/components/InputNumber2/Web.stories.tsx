import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber2 } from "@jobber/components/InputNumber2";

export default {
  title: "Components/Forms and Inputs/InputNumber2/Web",
  component: InputNumber2,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputNumber2>;

const BasiccTemplate: ComponentStory<typeof InputNumber2> = args => {
  const [value, setValue] = useState(args.value);

  return (
    <InputNumber2
      {...args}
      value={value}
      onChange={(newValue: number) => setValue(newValue)}
    />
  );
};

export const Basicc = BasiccTemplate.bind({});
Basicc.args = {
  value: 3,
  placeholder: "placeholder label",
  error: "error string",
  description: "description string",
};

// export const Invalid = BasiccTemplate.bind({});
// Invalid.args = {
//   value: 1.1,
//   invalid: true,
//   placeholder: "Give a whole number",
// };

// const SizesTemplate: ComponentStory<typeof InputNumber2> = () => {
//   return (
//     <Content>
//       <InputNumber2 size="small" value={100} />
//       <InputNumber2 size="large" value={1000} />
//     </Content>
//   );
// };

// export const Sizes = SizesTemplate.bind({});

// const InlineTemplate: ComponentStory<typeof InputNumber2> = args => {
//   const [value, setValue] = useState(args.value);

//   return (
//     <Text>
//       Follow-up after
//       <InputNumber2
//         {...args}
//         value={value}
//         onChange={(newValue: number) => setValue(newValue)}
//       />
//       days
//     </Text>
//   );
// };

// export const Inline = InlineTemplate.bind({});
// Inline.args = {
//   size: "small",
//   value: 2,
//   inline: true,
//   maxLength: 2,
//   align: "center",
// };

// const FocusTemplate: ComponentStory<typeof InputNumber2> = args => {
//   const inputNumber2Ref = useRef<InputNumber2Ref>(null);

//   function toggleInputFocus(shouldFocus = true) {
//     const action = shouldFocus ? "focus" : "blur";
//     inputNumber2Ref.current?.[action]();
//   }

//   return (
//     <Content>
//       <InputNumber2 {...args} value={5} ref={inputNumber2Ref} />
//       <Button label="Focus input" onClick={() => toggleInputFocus(true)} />
//       <br />
//       <Button label="Blur input" onClick={() => toggleInputFocus(false)} />
//     </Content>
//   );
// };

// export const FocusAndBlur = FocusTemplate.bind({});
// FocusAndBlur.args = {};

// const ReadonlyTemplate: ComponentStory<typeof InputNumber2> = args => {
//   return <InputNumber2 {...args} />;
// };

// export const Readonly = ReadonlyTemplate.bind({});
// Readonly.args = {
//   placeholder: "Your pin number",
//   value: 12345,
//   readonly: true,
// };

// const DisabledTemplate: ComponentStory<typeof InputNumber2> = args => {
//   return <InputNumber2 {...args} />;
// };

// export const Disabled = DisabledTemplate.bind({});
// Disabled.args = {
//   placeholder: "SIN number",
//   value: 12345,
//   disabled: true,
// };

// const PrefixAndSuffixTemplate: ComponentStory<typeof InputNumber2> = args => {
//   return <InputNumber2 {...args} />;
// };

// export const PrefixAndSuffix = PrefixAndSuffixTemplate.bind({});
// PrefixAndSuffix.args = {
//   suffix: { label: ".00" },
//   prefix: { label: "$", icon: "invoice" },
//   placeholder: "Invoice total",
//   defaultValue: "100000",
// };

// const ControlledTemplate: ComponentStory<typeof InputNumber2> = args => {
//   const [value, setValue] = useState(args.value);

//   return (
//     <Content>
//       <InputNumber2
//         {...args}
//         value={value}
//         onChange={(newValue: number) => setValue(newValue)}
//       />
//       <Button label="Reset" onClick={() => setValue(args.value)} />
//     </Content>
//   );
// };

// export const Controlled = ControlledTemplate.bind({});
// Controlled.args = {
//   value: 10,
// };
