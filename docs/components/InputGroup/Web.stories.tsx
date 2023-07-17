import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputTime } from "@jobber/components/InputTime";
import { InputText } from "@jobber/components/InputText";
import { Autocomplete } from "@jobber/components/Autocomplete";

export default {
  title: "Components/Forms and Inputs/InputGroup/Web",
  component: InputGroup,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputGroup>;

const BasicTemplate: ComponentStory<typeof InputGroup> = args => {
  return (
    <InputGroup {...args}>
      <InputTime defaultValue={new CivilTime(8, 0)} />
      <InputTime defaultValue={new CivilTime(17, 0)} />
    </InputGroup>
  );
};

const NestedTemplate: ComponentStory<typeof InputGroup> = args => {
  return (
    <InputGroup {...args}>
      <InputText placeholder="Street 1" />
      <InputText placeholder="Street 2" />
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="City" />
        <InputText placeholder="Province" />
      </InputGroup>
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="Postal Code" />
        <InputText placeholder="Country" />
      </InputGroup>
    </InputGroup>
  );
};

const options = [
  { value: 1, label: "Nostromo" },
  { value: 2, label: "Rodger Young" },
  { value: 3, label: "Serenity" },
  { value: 4, label: "Sleeper Service" },
  { value: 5, label: "Enterprise" },
  { value: 6, label: "Enterprise-D" },
];

const NestedWithAutocompleteTemplate: ComponentStory<
  typeof InputGroup
> = args => {
  const [value, setValue] = useState<Option: any | undefined>();
  return (
    <InputGroup {...args}>
      <InputText placeholder="Street 1" />
      <InputText placeholder="Street 2" />
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="City" />
        <Autocomplete
          value={value}
          initialOptions={options}
          onChange={newValue => setValue(newValue)}
          getOptions={getOptions}
          placeholder="Autocomplete this!"
        />
      </InputGroup>
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="Zip code" />
        <InputText placeholder="Country" />
      </InputGroup>
    </InputGroup>
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
  flowDirection: "vertical",
};

export const Nested = NestedTemplate.bind({});
Nested.args = {
  flowDirection: "vertical",
};

export const NestedWithAutocomplete = NestedWithAutocompleteTemplate.bind({});
NestedWithAutocomplete.args = {
  flowDirection: "vertical",
};
