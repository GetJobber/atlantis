import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@jobber/components/Button";
import { Autocomplete, Option } from "@jobber/components/Autocomplete";

export default {
  title: "Components/Forms and Inputs/Autocomplete/Web",
  component: Autocomplete,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Autocomplete": ["Autocomplete", "Option"],
        },
      },
    },
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

// Each template calls args.initialOptions so that the options
// are not undefined in the code preview

const BasicTemplate: ComponentStory<typeof Autocomplete> = args => {
  const basicOptions = args.initialOptions;
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
      return basicOptions;
    }
    const filterRegex = new RegExp(text, "i");
    return basicOptions.filter(option => option.label.match(filterRegex));
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
  const detailsOptions = args.initialOptions;
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
      return detailsOptions;
    }
    const filterRegex = new RegExp(text, "i");
    return detailsOptions.filter(option => option.label.match(filterRegex));
  }
};

const SectionHeadingOptions = [
  {
    label: "Ships",
    options: [
      { value: 1, label: "Sulaco" },
      { value: 2, label: "Nostromo" },
      { value: 3, label: "Serenity" },
      { value: 4, label: "Sleeper Service" },
      { value: 5, label: "Enterprise" },
      { value: 6, label: "Enterprise-D" },
    ],
  },
  {
    label: "Planets",
    options: [
      { value: 7, label: "Endor" },
      { value: 8, label: "Vulcan" },
      { value: 9, label: "Bespin" },
      { value: 10, label: "Tatooine" },
    ],
  },
];

const SectionHeadingTemplate: ComponentStory<typeof Autocomplete> = args => {
  const headingOptions = args.initialOptions;
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
      return headingOptions;
    }
    const filterRegex = new RegExp(text, "i");
    return headingOptions.map(section => ({
      ...section,
      options: section.options.filter(option =>
        option.label.match(filterRegex),
      ),
    }));
  }
};

const SetAValueTemplate: ComponentStory<typeof Autocomplete> = args => {
  const valueOptions = args.initialOptions;
  const [value, setValue] = useState<Option | undefined>(valueOptions[0]);
  return (
    <>
      <pre>{JSON.stringify(value, undefined, 2)}</pre>
      <Autocomplete
        {...args}
        value={value}
        onChange={newValue => setValue(newValue)}
        getOptions={getOptions}
      />
      <Button
        label="Choose Enterprise"
        onClick={() => {
          setValue(valueOptions[4]);
        }}
      />
      <Button
        label="Reset"
        onClick={() => {
          setValue(undefined);
        }}
      />
    </>
  );
  function getOptions(text: string) {
    if (text === "") {
      return valueOptions;
    }
    const filterRegex = new RegExp(text, "i");
    return valueOptions.filter(option => option.label.match(filterRegex));
  }
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  initialOptions: options,
  placeholder: "Search for something",
};

export const WithDetails = WithDetailsTemplate.bind({});
WithDetails.args = {
  initialOptions: withDetailsOptions,
  placeholder: "Search for something with details",
};

export const SectionHeading = SectionHeadingTemplate.bind({});
SectionHeading.args = {
  initialOptions: SectionHeadingOptions,
  placeholder: "Search for something under a section heading",
};

export const SetAValue = SetAValueTemplate.bind({});
SetAValue.args = {
  initialOptions: options,
  placeholder: "Search for something",
};
