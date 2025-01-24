import React, { useCallback, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Autocomplete,
  BaseMenuOption,
  CustomOptionsMenuProp,
  KeyboardAction,
  Option,
  getRequestedIndex,
  useKeyboardNavigation,
} from "@jobber/components/Autocomplete";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Combobox } from "@jobber/components/Combobox";
import { Icon } from "@jobber/components/Icon";

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
  {
    value: 6,
    label: "Enterprise-D",
    details: "NCC-1701D",
    test: "tes",
    options: [{ value: 2, label: "test" }],
  },
  { label: "Ships", options: [{ value: 2, label: "test" }] },
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

const actualOptions = [
  {
    value: 1,
    label: "Nostromo",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
    contact: "(406) 555-4145 · darlene.r@gmail.com",
    status: "Lead",
  },
  {
    value: 2,
    label: "Rodger Young",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    contact: "(406) 555-0120 · marvin.m@gmail.com",
    status: "Active",
  },
  {
    value: 3,
    label: "Serenity",
    address: "3 Properties",
    contact: "(406) 555-0120 · seemore.b@gmail.com",
    status: "Active",
  },
  {
    value: 4,
    label: "Sleeper Service",
    address: "3891 Ranchview Dr. Richardson, California 62639",
    contact: "(406) 555-0120",
    status: "Active",
  },
];

const SuperCustomTemplate = () => {
  const [value, setValue] = useState<(typeof actualOptions)[0]>();

  function getOptions(text: string) {
    if (text === "") {
      return actualOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return actualOptions.filter(option => option.label.match(filterRegex));
  }

  return (
    <Content>
      <pre>{JSON.stringify(value, undefined, 2)}</pre>
      <Autocomplete
        placeholder="Search for something"
        value={value}
        onChange={newValue => setValue(newValue)}
        customRenderMenu={props => <CustomMenuContent {...props} />}
        getOptions={getOptions}
      />
    </Content>
  );
};

function CustomMenuContent({
  options: actualOptions1,
  selectedOption,

  onOptionSelect,
}: CustomOptionsMenuProp<
  (typeof actualOptions)[number],
  (typeof actualOptions)[number]
>) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const onRequestHighlightChange = useCallback(
    (event: KeyboardEvent, direction: KeyboardAction) => {
      const indexChange = getRequestedIndex({
        event,
        options: actualOptions1,
        direction,
        highlightedIndex,
      });

      switch (direction) {
        case KeyboardAction.Previous:
          setHighlightedIndex(prev => Math.max(0, prev + indexChange));
          break;
        case KeyboardAction.Next:
          setHighlightedIndex(prev =>
            Math.min(actualOptions1.length - 1, prev + indexChange),
          );
          break;
        case KeyboardAction.Select:
          onOptionSelect(actualOptions1[highlightedIndex]);
          break;
      }
    },
    [highlightedIndex, actualOptions1, onOptionSelect],
  );
  useKeyboardNavigation({ onRequestHighlightChange });

  const optionsToRender = actualOptions1.map(option => {
    const label = option.status;
    const status = option.status === "Active" ? "success" : "informative";

    return (
      <BaseMenuOption
        addSeparators={true}
        isHighlighted={selectedOption === option}
        onOptionSelect={onOptionSelect}
        option={option}
        key={option.label}
      >
        <Flex template={["grow", "shrink"]}>
          <Flex align="start" template={["shrink", "grow"]}>
            <Content spacing="minuscule">
              {selectedOption === option && (
                <Icon name="checkmark" size="small" />
              )}
              <Text>{option.label}</Text>
              <Text variation="subdued">{option.address}</Text>
              <Text variation="subdued">{option.contact}</Text>
            </Content>
          </Flex>
          <StatusLabel status={status} label={label} />
        </Flex>
      </BaseMenuOption>
    );
  });

  const footer = (
    <Combobox.Action
      label={"+ Add new client"}
      visible
      onClick={() => console.log("hihi")}
    />
  );

  return (
    <>
      {optionsToRender}
      {footer}
    </>
  );
}

export const SuperCustom = SuperCustomTemplate.bind({});
