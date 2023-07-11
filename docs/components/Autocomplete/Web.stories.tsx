import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Autocomplete } from "@jobber/components/Autocomplete";

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
  const [value, setValue] = useState();
  return (
    <Autocomplete
      {...args}
      value={value}
      onChange={() => setValue(value)}
      getOptions={getOptions}
      name={"autocompleteInput"}
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  initialOptions: [],
  placeholder: "Search for a something",
};
