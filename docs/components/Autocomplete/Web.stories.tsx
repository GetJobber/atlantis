import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Autocomplete, Option } from "@jobber/components/Autocomplete";

export default {
  title: "Components/Forms and Inputs/Autocomplete/Web",
  component: Autocomplete,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof Autocomplete>;

const options = [
  { value: 1, label: "Nostromo" },
  { value: 2, label: "Rodger Young" },
  { value: 3, label: "Serenity" },
  { value: 4, label: "Sleeper Service" },
  { value: 5, label: "Enterprise" },
  { value: 6, label: "Enterprise-D" },
];

const BasicTemplate: ComponentStory<typeof Autocomplete> = args => {
  const [value, setValue] = useState<Option | undefined>();
  return (
    <Autocomplete
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
      getOptions={getOptions}
      validations={{
        maxLength: 255,
        required: {
          value: true,
          message: "This is a required field",
        },
      }}
    />
  );
  function getOptions(text: string) {
    if (text === "") {
      return options;
    }
    const filterRegex = new RegExp(text, "i");
    return options.filter(option => option.label.match(filterRegex));
  }
};

const withDetailsOptions = [
  {
    value: 1,
    label: "Sulaco",
    description: "They mostly come at night, mostly.",
    details: "LV-426",
  },
  { value: 2, label: "Nostromo", details: "LV-426" },
  { value: 3, label: "Serenity", description: "I aim to misbehave." },
  { value: 4, label: "Sleeper Service" },
  { value: 5, label: "Enterprise" },
  {
    value: 6,
    label: "Enterprise-D",
    description: "Tea, earl grey, hot.",
    details: "NCC-1701D",
  },
];

const WithDetailsTemplate: ComponentStory<typeof Autocomplete> = args => {
  const [value, setValue] = useState<Option | undefined>();
  return (
    <Autocomplete
      {...args}
      value={value}
      onChange={newValue => setValue(newValue)}
      getOptions={getOptions}
    />
  );
  function getOptions(text: string) {
    if (text === "") {
      return withDetailsOptions;
    }
    const filterRegex = new RegExp(text, "i");
    return withDetailsOptions.filter(option => option.label.match(filterRegex));
  }
};
export const Basic = BasicTemplate.bind({});
Basic.args = {
  initialOptions: [],
  placeholder: "Search for something",
};

export const WithDetails = WithDetailsTemplate.bind({});
WithDetails.args = {
  initialOptions: withDetailsOptions,
  placeholder: "Search for something with details",
};
