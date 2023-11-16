import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useRef } from "react";
import {
  CurrencyInput,
  RawDatePicker,
  SelectInput,
  SelectOption,
  TextInput,
} from "@jobber/components/FormField";
import { CheckboxInput } from "@jobber/components/Checkbox";
import { CompleteAuto, Option } from "@jobber/components/Autocomplete";

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
  placeholder: "Raw",
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
  placeholder: "Raw Select",
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
  placeholder: "Raw",
};

const CheckboxTemplate: ComponentStory<typeof CheckboxInput> = args => {
  return (
    <div>
      <CheckboxInput {...args} />
    </div>
  );
};
export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {};

const CurrencyTemplate: ComponentStory<typeof CurrencyInput> = args => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <CurrencyInput {...args} ref={ref} />
    </div>
  );
};
export const Currency = CurrencyTemplate.bind({});
Currency.args = {
  placeholder: "Currency",
};

const CompleteAutoTemplate: ComponentStory<typeof CompleteAuto> = args => {
  const [selectedOption, setSelectedOption] = React.useState<
    Option | undefined
  >(undefined);

  const getOptions = async (searchValue: string) => {
    return [
      {
        label: "First",
        value: "First",
      },
      {
        label: "Second",
        value: "Second",
      },
      {
        label: "Third",
        value: "Third",
      },
    ].filter(option => option.label.includes(searchValue));
  };

  return (
    <div>
      <CompleteAuto
        {...args}
        getOptions={getOptions}
        value={selectedOption}
        onChange={s => setSelectedOption(s)}
      />
    </div>
  );
};

export const Complete = CompleteAutoTemplate.bind({});
Complete.args = {
  placeholder: "Complete",
};
