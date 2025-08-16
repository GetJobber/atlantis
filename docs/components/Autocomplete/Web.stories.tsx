/* eslint-disable max-statements */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Autocomplete,
  BaseMenuGroupOption,
  BaseMenuOption,
  KeyboardAction,
  MenuOption,
  getRequestedIndexChange,
  isOptionGroup,
  isOptionSelected,
  useCustomKeyboardNavigation,
  useKeyboardNavigation,
} from "@jobber/components/Autocomplete";
import type {
  AnyOption,
  CustomOptionsMenuProp,
  Option,
  OptionLike,
} from "@jobber/components/Autocomplete";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Icon, IconNames } from "@jobber/components/Icon";
import { Grid } from "@jobber/components/Grid";
import { Heading } from "@jobber/components/Heading";
import { useCallbackRef } from "@jobber/hooks/useCallbackRef";
import { StatusIndicatorType } from "@jobber/components/StatusIndicator";
import { Modal } from "@jobber/components/Modal";

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

interface ServiceOption extends OptionLike {
  description: string;
  details: string;
  price: number;
  id: React.Key;
}

const simpleOptions: OptionLike[] = [
  {
    label: "Drain Cleaning",
  },
  {
    label: "Pipe Replacement",
  },
  {
    label: "Sewer Line Repair",
  },
];

const serviceOptions: ServiceOption[] = [
  {
    label: "Drain Cleaning",
    description: "Clear drains of accumulated debris and build up",
    details: "Recommended every 3 months",
    price: 100,
    id: "dc1",
  },
  {
    label: "Pipe Replacement",
    description: "Replace old poly-b pipes with new PVC",
    details: "Recommended every 10 years",
    price: 10_000,
    id: "pr1",
  },
  {
    label: "Sewer Line Repair",
    description: "Repair damaged sewer lines",
    details: "Recommended every 10 years",
    price: 2000,
    id: "slr1",
  },
];

const defaultOptions = [
  { value: 1, label: "Nostromo" },
  { value: 2, label: "Rodger Young" },
  { value: 3, label: "Serenity" },
  { value: 4, label: "Sleeper Service" },
  { value: 5, label: "Enterprise" },
  {
    value: 6,
    label: "Enterprise-D",
  },
];

// Each template calls args.initialOptions so that the options
// are not undefined in the code preview

const BasicTemplate: ComponentStory<typeof Autocomplete> = args => {
  const basicOptions = args.initialOptions ?? defaultOptions;
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
  const detailsOptions = args.initialOptions ?? withDetailsOptions;
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
  const headingOptionsAll = args.initialOptions ?? SectionHeadingOptions;
  const headingOptions = headingOptionsAll.filter(isOptionGroup);
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
  const valueOptions = args.initialOptions ?? defaultOptions;
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

const V2Template: ComponentStory<typeof Autocomplete> = () => {
  const [defaultValue, setDefaultValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  const [customOptionValue, setCustomOptionValue] = useState<
    ServiceOption | undefined
  >();
  const [customOptionInputValue, setCustomOptionInputValue] = useState("");

  const [defaultSectionedValue, setDefaultSectionedValue] = useState<
    OptionLike | undefined
  >();
  const [sectionedInputValue, setSectionedInputValue] = useState("");

  const [sectionActionDefaultValue, setSectionActionDefaultValue] = useState<
    OptionLike | undefined
  >();
  const [sectionActionInputValue, setSectionActionInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Flat, default layout</Heading>
      <Autocomplete
        version={2}
        placeholder="Search for a service"
        value={defaultValue}
        onChange={setDefaultValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={[{ type: "options", options: simpleOptions }]}
      />

      <Heading level={4}>Sectioned, default layout</Heading>
      <Autocomplete
        version={2}
        placeholder="Search for a service"
        value={defaultSectionedValue}
        onChange={setDefaultSectionedValue}
        inputValue={sectionedInputValue}
        onInputChange={setSectionedInputValue}
        menu={[
          {
            type: "section",
            id: "services",
            label: "Services",
            options: simpleOptions,
          },
        ]}
      />

      <Heading level={4}>Sectioned, default layout with action</Heading>
      <Autocomplete
        version={2}
        placeholder="Search for a service"
        value={sectionActionDefaultValue}
        onChange={setSectionActionDefaultValue}
        inputValue={sectionActionInputValue}
        onInputChange={setSectionActionInputValue}
        menu={[
          {
            type: "section",
            id: "services",
            label: "Services",
            options: simpleOptions,
            actionsBottom: [
              {
                type: "action",
                label: "Add Service",
                id: "add-service",
                onClick: () => {
                  alert("Add Service");
                },
              },
            ],
          },
        ]}
      />

      <Heading level={4}>Flat, custom option layout</Heading>
      <Autocomplete
        version={2}
        placeholder="Search for a service"
        value={customOptionValue}
        onChange={setCustomOptionValue}
        inputValue={customOptionInputValue}
        onInputChange={setCustomOptionInputValue}
        menu={[
          {
            type: "options",
            options: serviceOptions,
            actionsBottom: [
              {
                type: "action",
                label: "Add Service",
                id: "add-service",
                onClick: () => {
                  alert("Add Service");
                },
              },
            ],
          },
        ]}
        renderOption={({ value, isActive, isSelected }) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text variation={isActive ? "info" : "default"}>
                  {value.label}
                </Text>
                <Text variation={isActive ? "info" : "default"}>
                  {value.description}
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 var(--space-small)",
                }}
              >
                {isSelected && <Icon name="checkmark" />}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "auto",
                }}
              >
                <Text>{value.details}</Text>
                <Text align="end">
                  {value.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Text>
              </div>
            </div>
          );
        }}
      />
    </Content>
  );
};

export const Version2 = V2Template.bind({});
Version2.args = {};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  initialOptions: defaultOptions,
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
  initialOptions: defaultOptions,
  placeholder: "Search for something",
};

interface CustomOption {
  value: number;
  label: string;
  address: string;
  contact: string;
  status: string;
}
const actualOptions: CustomOption[] = [
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

const CustomRenderingTemplate = () => {
  const BasicCustomTemplate = () => {
    const [value, setValue] = useState<Option | undefined>();
    const [detailsValue, setDetailsValue] = useState<Option | undefined>();
    const basicOptions = withDetailsOptions;
    const sectionHeadingOptions = SectionHeadingOptions;
    const planetSection = sectionHeadingOptions.find(
      ({ label }) => label === "Planets",
    )?.options;

    return (
      <Content>
        <Autocomplete
          placeholder="Search for a basic option"
          value={value}
          onChange={newValue => setValue(newValue)}
          customRenderMenu={({
            MenuWrapper,
            inputFocused,
            onOptionSelect,
            options,
            selectedOption,
          }) => {
            const { highlightedIndex } = useKeyboardNavigation({
              options,
              onOptionSelect,
              visible: inputFocused,
            });

            return (
              <MenuWrapper visible={inputFocused}>
                {options.map((option, index) => {
                  return (
                    <MenuOption
                      key={option.value}
                      option={option}
                      addSeparators={false}
                      isHighlighted={index === highlightedIndex}
                      onOptionSelect={onOptionSelect}
                      isSelected={isOptionSelected(selectedOption, option)}
                    />
                  );
                })}
              </MenuWrapper>
            );
          }}
          getOptions={getOptions}
        />
        <Autocomplete
          placeholder="Search for an option with section headings"
          initialOptions={sectionHeadingOptions}
          value={detailsValue}
          onChange={newValue => setDetailsValue(newValue)}
          customRenderMenu={({
            MenuWrapper,
            inputFocused,
            onOptionSelect,
            options,
            selectedOption,
            menuRef,
          }) => {
            const { highlightedIndex } = useKeyboardNavigation({
              visible: inputFocused,
              options,
              onOptionSelect,
              menuRef,
            });

            return (
              <MenuWrapper visible={inputFocused}>
                {options.map((option, index) => {
                  const optionStyle = getOptionStyling({
                    option,
                    highlightedIndex,
                    options,
                  });

                  return (
                    <MenuOption
                      key={option.label}
                      option={option}
                      addSeparators={isOptionGroup(option)}
                      isHighlighted={index === highlightedIndex}
                      onOptionSelect={onOptionSelect}
                      isSelected={isOptionSelected(selectedOption, option)}
                      UNSAFE_style={optionStyle}
                    />
                  );
                })}
              </MenuWrapper>
            );
          }}
          getOptions={getHeadingsOption}
        />
      </Content>
    );

    function getOptionStyling({
      option,
      highlightedIndex,
      options,
    }: {
      option: AnyOption;
      highlightedIndex: number;
      options: AnyOption[];
    }) {
      const isSectionLabel = isOptionGroup(option);
      const isPlanetsLabel = option.label === "Planets";

      const inPlanetSection = planetSection?.find?.(
        ({ label }) => label === option.label,
      );
      const activeOption = options[highlightedIndex];

      const activeOptionInSection =
        isSectionLabel &&
        option?.options?.find?.(({ label }) => label === activeOption?.label);
      let optionColor = "var(--color-success--surface)";
      let groupColor = "var(--color-success)";

      if (isSectionLabel && activeOptionInSection) {
        groupColor = "var(--color-informative)";
        optionColor = "var(--color-informative--surface)";
      } else if (!isSectionLabel && inPlanetSection) {
        groupColor = "var(--color-warning)";
        optionColor = "var(--color-warning--surface)";
      } else if (isSectionLabel && isPlanetsLabel) {
        groupColor = "var(--color-critical)";
        optionColor = "var(--color-critical--surface)";
      }
      const isActive = activeOption === option ? 0.5 : 1;

      return {
        groupOption: {
          heading: {
            backgroundColor: groupColor,
          },
        },
        option: {
          backgroundColor: optionColor,
          opacity: isActive,
        },
      };
    }

    function getOptions(text: string) {
      if (text === "") {
        return basicOptions;
      }
      const filterRegex = new RegExp(text, "i");

      return basicOptions.filter(option => option.label.match(filterRegex));
    }

    function getHeadingsOption(text: string) {
      if (text === "") {
        return sectionHeadingOptions;
      }
      const filterRegex = new RegExp(text, "i");

      return sectionHeadingOptions.map(section => ({
        ...section,
        options: section.options.filter(option =>
          option.label.match(filterRegex),
        ),
      }));
    }
  };

  const AdvancedCustomTemplate = () => {
    const [value, setValue] = useState<CustomOption | undefined>();

    function getOptions(text: string) {
      if (text === "") {
        return actualOptions;
      }
      const filterRegex = new RegExp(text, "i");

      return actualOptions.filter(
        option =>
          option.label.match(filterRegex) ||
          option.address.match(filterRegex) ||
          option.contact.match(filterRegex),
      );
    }

    return (
      <Autocomplete
        placeholder="Search for something"
        initialOptions={actualOptions}
        value={value}
        onChange={newValue => setValue(newValue)}
        customRenderMenu={props => <CustomMenuContent {...props} />}
        getOptions={getOptions}
      />
    );
  };

  function CustomMenuContent({
    options,
    selectedOption,
    onOptionSelect,
    inputFocused,
    inputRef,
    MenuWrapper,
    menuRef,
  }: CustomOptionsMenuProp<CustomOption, CustomOption>) {
    // Set to -1 to account for the footer being the first option when options are being initialized
    const INITIAL_HIGHLIGHTED_OPTION_INDEX = -1;

    const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(
      INITIAL_HIGHLIGHTED_OPTION_INDEX,
    );
    // Length of options + 1 to account for the footer
    const maxIndex = options.length - 1 + 1;

    // We need to track the footer focus state because it can be focused instead of just the Input
    const [footerFocused, setFooterFocused] = useState(false);
    const footerElement = document.querySelector(
      "#footerElement",
    ) as HTMLElement;

    const footerFocusedCallback = useCallbackRef(() => {
      setFooterFocused(true);
    });
    const footerBlurCallback = useCallbackRef(() => {
      setFooterFocused(false);
    });

    useEffect(() => {
      footerElement?.addEventListener("focus", footerFocusedCallback);
      footerElement?.addEventListener("blur", footerBlurCallback);

      return () => {
        footerElement?.removeEventListener("focus", footerFocusedCallback);
        footerElement?.removeEventListener("blur", footerBlurCallback);
      };
    }, [footerElement, footerFocusedCallback, footerBlurCallback]);

    const menuVisible = useMemo(
      () => inputFocused || footerFocused,
      [inputFocused, footerFocused],
    );

    const onRequestHighlightChange = useCallback(
      (event: KeyboardEvent, direction: KeyboardAction) => {
        const indexChange = getRequestedIndexChange({
          event,
          options,
          direction,
          highlightedIndex: highlightedOptionIndex,
        });
        const newPreviousIndex = Math.max(
          0,
          highlightedOptionIndex + indexChange,
        );
        const newNextIndex = Math.min(
          maxIndex,
          highlightedOptionIndex + indexChange,
        );

        if (!menuVisible) return;

        switch (direction) {
          case KeyboardAction.Previous:
            // If the footer is focused, focus the input
            if (highlightedOptionIndex === maxIndex) {
              inputRef?.current?.focus();
            }
            setHighlightedOptionIndex(newPreviousIndex);
            menuRef?.children[newPreviousIndex]?.scrollIntoView?.({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });

            break;
          case KeyboardAction.Next: {
            setHighlightedOptionIndex(newNextIndex);
            const nextElement = menuRef?.children[newNextIndex];
            const footerHeight = footerElement?.offsetHeight || 0;

            if (nextElement) {
              const rect = nextElement.getBoundingClientRect();
              const menuRect = menuRef.getBoundingClientRect();

              // If element is hidden behind footer
              if (rect.bottom > menuRect.bottom - footerHeight) {
                // Calculate exact scroll position needed
                const scrollOffset =
                  rect.bottom - (menuRect.bottom - footerHeight);
                menuRef.scrollTop += scrollOffset;
              } else {
                nextElement.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }
            }

            if (newNextIndex === maxIndex) {
              footerElement?.focus();
            }
            break;
          }

          case KeyboardAction.Select:
            // Don't select the footer
            highlightedOptionIndex < maxIndex &&
              onOptionSelect(options[highlightedOptionIndex]);

            menuRef?.children[highlightedOptionIndex]?.scrollIntoView?.({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });

            // If the footer is selected, click it
            if (highlightedOptionIndex === maxIndex) {
              footerElement?.click();
            }
            break;
        }
      },
      [highlightedOptionIndex, options, onOptionSelect],
    );
    useCustomKeyboardNavigation({ onRequestHighlightChange });

    const optionsToRender = options.map((option, index) => {
      const label = option.status;
      const status = option.status === "Active" ? "success" : "informative";

      return (
        <BaseMenuOption
          addSeparators={true}
          isHighlighted={index === highlightedOptionIndex}
          onOptionSelect={onOptionSelect}
          option={option}
          key={option.value}
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

    function addNewClient() {
      window.alert("Add new client");
    }
    const footer = (
      <div style={{ position: "sticky", bottom: 0 }}>
        <Button
          label="+ Add new client"
          onClick={addNewClient}
          size="small"
          id="footerElement"
          fullWidth
          type="tertiary"
        />
      </div>
    );

    return (
      <MenuWrapper visible={menuVisible}>
        {optionsToRender}
        {footer}
      </MenuWrapper>
    );
  }

  return (
    <Grid>
      <Grid.Cell size={{ xs: 12 }}>
        <Heading level={2}>Basic Custom Rendering</Heading>
        <BasicCustomTemplate />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 12 }}>
        <Heading level={2}>Advanced Custom Rendering</Heading>
        <AdvancedCustomTemplate />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 12 }}>
        <AdvancedSectionHeadingTemplate />
      </Grid.Cell>
    </Grid>
  );
};
export const CustomRendering = CustomRenderingTemplate.bind({});

interface CustomOptionForGroup {
  value: number;
  label: string;
  status: string;
}
interface CustomGroupOption {
  label: string;
  icon: IconNames;
  options: CustomOptionForGroup[];
}

const SectionHeadingOptionsCustom: CustomGroupOption[] = [
  {
    label: "Quotes",
    icon: "quote",
    options: [
      { value: 1, label: "Quote for Acme Corp", status: "Draft" },
      { value: 2, label: "Quote for Stark Industries", status: "Approved" },
      {
        value: 3,
        label: "Quote for Wayne Enterprises",
        status: "Awaiting approval",
      },
      { value: 4, label: "Quote for Umbrella Corp", status: "Paid" },
    ],
  },
  {
    icon: "invoice",
    label: "Invoices",
    options: [
      { value: 5, label: "Invoice for Acme Corp", status: "Draft" },
      {
        value: 6,
        label: "Invoice for Stark Industries",
        status: "Awaiting payment",
      },
      {
        value: 7,
        label: "Invoice for Wayne Enterprises",
        status: "Awaiting payment",
      },
      { value: 8, label: "Invoice for Umbrella Corp", status: "Paid" },
    ],
  },
];

interface CustomElementOption {
  sectionLabel: string;
  indexToInsertAfter: number;
}
type OptionsWithExtraElements =
  | CustomGroupOption
  | CustomOptionForGroup
  | CustomElementOption;

function AdvancedSectionHeadingTemplate() {
  const [value, setValue] = useState<CustomOptionForGroup | undefined>();

  return (
    <Autocomplete
      placeholder="Search for something under a section heading"
      initialOptions={SectionHeadingOptionsCustom}
      value={value}
      onChange={newValue => setValue(newValue)}
      getOptions={() => SectionHeadingOptionsCustom}
      customRenderMenu={props => (
        <AdvancedSectionHeadingCustomMenuContent {...props} />
      )}
    />
  );
}

function AdvancedSectionHeadingCustomMenuContent({
  options,
  selectedOption,
  onOptionSelect,
  inputFocused,
  inputRef,
  MenuWrapper,
  menuRef,
}: CustomOptionsMenuProp<CustomGroupOption, CustomOptionForGroup>) {
  const { optionsWithExtraElements, extraElementFocused } =
    useCustomSectionOptions(options);
  // Set to 1 to account for the first option being the section heading
  const initialHighlight = options.some(isOptionGroup) ? 1 : 0;

  const [highlightedOptionIndex, setHighlightedOptionIndex] =
    useState(initialHighlight);
  // Length of options -1 and the number of extra elements

  const maxIndex = optionsWithExtraElements.length - 1;

  const menuVisible = useMemo(
    () => extraElementFocused || inputFocused,
    [extraElementFocused, inputFocused],
  );
  const onRequestHighlightChange = useCallback(
    (event: KeyboardEvent, direction: KeyboardAction) => {
      const requestedIndex =
        optionsWithExtraElements[highlightedOptionIndex + direction];
      // Default index change to the direction. If the requested index is not an extra element,
      // then we need to adjust the index change to account for the section heading
      let indexChange = direction;

      if (requestedIndex && !isExtraElement(requestedIndex)) {
        indexChange =
          requestedIndex && isOptionGroup(requestedIndex)
            ? direction + direction
            : direction;
      }

      const newPreviousIndex = Math.max(
        0,
        highlightedOptionIndex + indexChange,
      );
      const newNextIndex = Math.min(
        maxIndex,
        highlightedOptionIndex + indexChange,
      );

      if (!menuVisible) return;

      switch (direction) {
        case KeyboardAction.Previous:
          // If the option is an extra element, focus the extra element. Else focus the input
          if (isExtraElement(optionsWithExtraElements[newPreviousIndex])) {
            const element = document.getElementById(
              optionsWithExtraElements[newPreviousIndex].sectionLabel,
            ) as HTMLElement;
            element?.focus();
          } else {
            inputRef?.current?.focus();
          }

          setHighlightedOptionIndex(newPreviousIndex);
          menuRef?.children[newPreviousIndex]?.scrollIntoView?.({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });

          break;
        case KeyboardAction.Next:
          setHighlightedOptionIndex(newNextIndex);
          menuRef?.children[newNextIndex]?.scrollIntoView?.({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });

          // If the option is an extra element, focus the extra element. Else focus the input
          if (isExtraElement(optionsWithExtraElements[newNextIndex])) {
            const element = document.getElementById(
              optionsWithExtraElements[newNextIndex].sectionLabel,
            ) as HTMLElement;
            element?.focus();
          } else {
            inputRef?.current?.focus();
          }
          break;

        case KeyboardAction.Select:
          menuRef?.children[highlightedOptionIndex]?.scrollIntoView?.({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });

          // If the option is an extra element, click the extra element. Else check it is not an option group and select the option
          if (
            isExtraElement(optionsWithExtraElements[highlightedOptionIndex])
          ) {
            const element = document.getElementById(
              optionsWithExtraElements[highlightedOptionIndex].sectionLabel,
            ) as HTMLElement;
            element?.click();
          } else if (
            !isOptionGroup(optionsWithExtraElements[highlightedOptionIndex])
          ) {
            onOptionSelect(optionsWithExtraElements[highlightedOptionIndex]);
          }

          break;
      }
    },
    [
      highlightedOptionIndex,
      options,
      onOptionSelect,
      extraElementFocused,
      maxIndex,
      optionsWithExtraElements,
    ],
  );
  useCustomKeyboardNavigation({ onRequestHighlightChange });

  const optionsToRender = optionsWithExtraElements.map((option, index) => {
    if (isExtraElement(option)) {
      return (
        <AdvancedSectionFooterButton
          label={option.sectionLabel}
          id={option.sectionLabel}
          key={`${option.sectionLabel}-create-new`}
        />
      );
    }

    if (isOptionGroup(option)) {
      return (
        <BaseMenuGroupOption key={option.label}>
          <Flex template={["grow", "shrink"]}>
            <Heading level={5}>{option.label}</Heading>
            <Icon name={option.icon} />
          </Flex>
        </BaseMenuGroupOption>
      );
    }

    return (
      <SelectableOption
        isSelected={isOptionSelected(selectedOption, option)}
        key={option.value}
        option={option}
        index={index}
        highlightedOptionIndex={highlightedOptionIndex}
        onOptionSelect={onOptionSelect}
      />
    );
  });

  return <MenuWrapper visible={menuVisible}>{optionsToRender}</MenuWrapper>;
}

function AdvancedSectionFooterButton({
  label,
  id,
}: {
  readonly label: string;
  readonly id: string;
}) {
  return (
    <Button
      label={`+ Add new ${label}`}
      onClick={() => alert(`Add new ${label}`)}
      size="small"
      id={id}
      fullWidth
      type="tertiary"
    />
  );
}

/**
 * Renders the selectable option
 * @param option - The option to render
 * @param index - The index of the option
 * @param highlightedOptionIndex - The index of the highlighted option
 * @param onOptionSelect - The function to call when the option is selected
 * @param isSelected - Whether the option is selected
 */
function SelectableOption({
  option,
  index,
  highlightedOptionIndex,
  onOptionSelect,
  isSelected,
}: {
  readonly option: CustomOptionForGroup;
  readonly index: number;
  readonly highlightedOptionIndex: number;
  readonly onOptionSelect: (option?: CustomOptionForGroup) => void;
  readonly isSelected: boolean;
}) {
  let status: StatusIndicatorType = "informative";

  switch (option.status) {
    case "Paid":
    case "Approved":
      status = "success";
      break;
    case "Awaiting payment":
    case "Awaiting approval":
      status = "warning";
      break;
    case "Draft":
      status = "inactive";
      break;
  }

  return (
    <BaseMenuOption
      addSeparators={true}
      isHighlighted={highlightedOptionIndex === index}
      onOptionSelect={onOptionSelect}
      option={option}
    >
      <Flex template={["grow", "shrink"]}>
        <Text>
          {isSelected && <Icon name="checkmark" size="small" />} {option.label}
        </Text>
        <StatusLabel label={option.status} status={status} />
      </Flex>
    </BaseMenuOption>
  );
}

/**
 * Get the indices of the options that should have extra elements inserted after them
 * @param options - The options to get the extra element indices for
 * @returns The indices of the options that should have extra elements inserted after them
 */
function getExtraElementIndices(
  options: (CustomOptionForGroup | CustomGroupOption)[],
) {
  const sectionsOptions = options.filter(isOptionGroup);

  return sectionsOptions.map(({ label, options: optionsInSection }) => {
    const indexToInsertAfter = options.findIndex(
      opt => opt === optionsInSection[optionsInSection.length - 1],
    );

    return {
      sectionLabel: label,
      indexToInsertAfter,
    };
  });
}

/**
 * Creates a new array with the extra elements inserted into the options array
 * @param options - The options to insert the extra elements into
 * @param extraElements - The extra elements to insert into the options
 * @returns The options with the extra elements inserted
 */
function insertExtraElements(
  options: (CustomOptionForGroup | CustomGroupOption)[],
  extraElements: CustomElementOption[],
) {
  return options.reduce<Array<OptionsWithExtraElements>>(
    (acc, option, index) => {
      const shouldInsertExtraElement = extraElements.find(
        ({ indexToInsertAfter }) => indexToInsertAfter === index,
      );

      if (shouldInsertExtraElement) {
        return [
          ...acc,
          option,
          {
            sectionLabel: shouldInsertExtraElement.sectionLabel,
            indexToInsertAfter: shouldInsertExtraElement.indexToInsertAfter,
          },
        ];
      }

      return [...acc, option];
    },
    [],
  );
}

/**
 * Custom hook to handle the section options with extra elements
 * @param options - The options to handle
 * @returns The options with the extra elements inserted and the focus state for the extra elements
 */
function useCustomSectionOptions(
  options: (CustomGroupOption | CustomOptionForGroup)[],
) {
  const extraElements = useMemo(
    () => getExtraElementIndices(options),
    [options],
  );
  const optionsWithExtraElements = useMemo(
    () => insertExtraElements(options, extraElements),
    [options, extraElements],
  );
  // We need to track the focus state for the extra elements because it can be focused instead of just the Input
  const [extraElementFocused, setExtraElementFocused] = useState(false);

  const extraElementFocusCallback = useCallbackRef(() => {
    setExtraElementFocused(true);
  });
  const extraElementBlurCallback = useCallbackRef(() => {
    setExtraElementFocused(false);
  });
  // Add event listeners to the extra elements for focus and blur
  useEffect(() => {
    extraElements.forEach(({ sectionLabel }) => {
      const element = document.getElementById(sectionLabel) as HTMLElement;
      element?.addEventListener("focus", extraElementFocusCallback);
      element?.addEventListener("blur", extraElementBlurCallback);
    });

    return () => {
      extraElements.forEach(({ sectionLabel }) => {
        const element = document.getElementById(sectionLabel) as HTMLElement;
        element?.removeEventListener("focus", extraElementFocusCallback);
        element?.removeEventListener("blur", extraElementBlurCallback);
      });
    };
  }, [extraElements]);

  return {
    optionsWithExtraElements,
    extraElementFocused,
  };
}

/**
 * Checks if the option is an extra element
 * @param option - The option to check
 * @returns Whether the option is an extra element
 */
function isExtraElement(option: object): option is CustomElementOption {
  return option && "sectionLabel" in option && "indexToInsertAfter" in option;
}

const WithinModalTemplate: ComponentStory<typeof Modal> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [value1, setValue1] = useState<Option | undefined>();

  const BasicCustomTemplate = () => {
    const [value, setValue] = useState<Option | undefined>();
    const [detailsValue, setDetailsValue] = useState<Option | undefined>();
    const basicOptions = withDetailsOptions;
    const sectionHeadingOptions = SectionHeadingOptions;
    const planetSection = sectionHeadingOptions.find(
      ({ label }) => label === "Planets",
    )?.options;

    return (
      <Content>
        <Autocomplete
          placeholder="Search for a basic option"
          value={value}
          onChange={newValue => setValue(newValue)}
          customRenderMenu={({
            MenuWrapper,
            inputFocused,
            onOptionSelect,
            options,
            selectedOption,
          }) => {
            const { highlightedIndex } = useKeyboardNavigation({
              options,
              onOptionSelect,
              visible: inputFocused,
            });

            return (
              <MenuWrapper visible={inputFocused}>
                {options.map((option, index) => {
                  return (
                    <MenuOption
                      key={option.value}
                      option={option}
                      addSeparators={false}
                      isHighlighted={index === highlightedIndex}
                      onOptionSelect={onOptionSelect}
                      isSelected={isOptionSelected(selectedOption, option)}
                    />
                  );
                })}
              </MenuWrapper>
            );
          }}
          getOptions={getOptions}
        />
        <Autocomplete
          placeholder="Search for an option with section headings"
          initialOptions={sectionHeadingOptions}
          value={detailsValue}
          onChange={newValue => setDetailsValue(newValue)}
          customRenderMenu={({
            MenuWrapper,
            inputFocused,
            onOptionSelect,
            options,
            selectedOption,
            menuRef,
          }) => {
            const { highlightedIndex } = useKeyboardNavigation({
              visible: inputFocused,
              options,
              onOptionSelect,
              menuRef,
            });

            return (
              <MenuWrapper visible={inputFocused}>
                {options.map((option, index) => {
                  const optionStyle = getOptionStyling({
                    option,
                    highlightedIndex,
                    options,
                  });

                  return (
                    <MenuOption
                      key={option.label}
                      option={option}
                      addSeparators={isOptionGroup(option)}
                      isHighlighted={index === highlightedIndex}
                      onOptionSelect={onOptionSelect}
                      isSelected={isOptionSelected(selectedOption, option)}
                      UNSAFE_style={optionStyle}
                    />
                  );
                })}
              </MenuWrapper>
            );
          }}
          getOptions={getHeadingsOption}
        />
      </Content>
    );

    function getOptionStyling({
      option,
      highlightedIndex,
      options,
    }: {
      option: AnyOption;
      highlightedIndex: number;
      options: AnyOption[];
    }) {
      const isSectionLabel = isOptionGroup(option);
      const isPlanetsLabel = option.label === "Planets";

      const inPlanetSection = planetSection?.find?.(
        ({ label }) => label === option.label,
      );
      const activeOption = options[highlightedIndex];

      const activeOptionInSection =
        isSectionLabel &&
        option?.options?.find?.(({ label }) => label === activeOption?.label);
      let optionColor = "var(--color-success--surface)";
      let groupColor = "var(--color-success)";

      if (isSectionLabel && activeOptionInSection) {
        groupColor = "var(--color-informative)";
        optionColor = "var(--color-informative--surface)";
      } else if (!isSectionLabel && inPlanetSection) {
        groupColor = "var(--color-warning)";
        optionColor = "var(--color-warning--surface)";
      } else if (isSectionLabel && isPlanetsLabel) {
        groupColor = "var(--color-critical)";
        optionColor = "var(--color-critical--surface)";
      }
      const isActive = activeOption === option ? 0.5 : 1;

      return {
        groupOption: {
          heading: {
            backgroundColor: groupColor,
          },
        },
        option: {
          backgroundColor: optionColor,
          opacity: isActive,
        },
      };
    }

    function getOptions(text: string) {
      if (text === "") {
        return basicOptions;
      }
      const filterRegex = new RegExp(text, "i");

      return basicOptions.filter(option => option.label.match(filterRegex));
    }

    function getHeadingsOption(text: string) {
      if (text === "") {
        return sectionHeadingOptions;
      }
      const filterRegex = new RegExp(text, "i");

      return sectionHeadingOptions.map(section => ({
        ...section,
        options: section.options.filter(option =>
          option.label.match(filterRegex),
        ),
      }));
    }
  };

  const AdvancedCustomTemplate = () => {
    const [value, setValue] = useState<CustomOption | undefined>();

    function getOptions(text: string) {
      if (text === "") {
        return actualOptions;
      }
      const filterRegex = new RegExp(text, "i");

      return actualOptions.filter(
        option =>
          option.label.match(filterRegex) ||
          option.address.match(filterRegex) ||
          option.contact.match(filterRegex),
      );
    }

    return (
      <Autocomplete
        placeholder="Search for something"
        initialOptions={actualOptions}
        value={value}
        onChange={newValue => setValue(newValue)}
        customRenderMenu={props => <CustomMenuContent {...props} />}
        getOptions={getOptions}
      />
    );
  };

  function CustomMenuContent({
    options,
    selectedOption,
    onOptionSelect,
    inputFocused,
    inputRef,
    MenuWrapper,
    menuRef,
  }: CustomOptionsMenuProp<CustomOption, CustomOption>) {
    // Set to -1 to account for the footer being the first option when options are being initialized
    const INITIAL_HIGHLIGHTED_OPTION_INDEX = -1;

    const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(
      INITIAL_HIGHLIGHTED_OPTION_INDEX,
    );
    // Length of options + 1 to account for the footer
    const maxIndex = options.length - 1 + 1;

    // We need to track the footer focus state because it can be focused instead of just the Input
    const [footerFocused, setFooterFocused] = useState(false);
    const footerElement = document.querySelector(
      "#footerElement",
    ) as HTMLElement;

    const footerFocusedCallback = useCallbackRef(() => {
      setFooterFocused(true);
    });
    const footerBlurCallback = useCallbackRef(() => {
      setFooterFocused(false);
    });

    useEffect(() => {
      footerElement?.addEventListener("focus", footerFocusedCallback);
      footerElement?.addEventListener("blur", footerBlurCallback);

      return () => {
        footerElement?.removeEventListener("focus", footerFocusedCallback);
        footerElement?.removeEventListener("blur", footerBlurCallback);
      };
    }, [footerElement, footerFocusedCallback, footerBlurCallback]);

    const menuVisible = useMemo(
      () => inputFocused || footerFocused,
      [inputFocused, footerFocused],
    );

    const onRequestHighlightChange = useCallback(
      (event: KeyboardEvent, direction: KeyboardAction) => {
        const indexChange = getRequestedIndexChange({
          event,
          options,
          direction,
          highlightedIndex: highlightedOptionIndex,
        });
        const newPreviousIndex = Math.max(
          0,
          highlightedOptionIndex + indexChange,
        );
        const newNextIndex = Math.min(
          maxIndex,
          highlightedOptionIndex + indexChange,
        );

        if (!menuVisible) return;

        switch (direction) {
          case KeyboardAction.Previous:
            // If the footer is focused, focus the input
            if (highlightedOptionIndex === maxIndex) {
              inputRef?.current?.focus();
            }
            setHighlightedOptionIndex(newPreviousIndex);
            menuRef?.children[newPreviousIndex]?.scrollIntoView?.({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });

            break;
          case KeyboardAction.Next: {
            setHighlightedOptionIndex(newNextIndex);
            const nextElement = menuRef?.children[newNextIndex];
            const footerHeight = footerElement?.offsetHeight || 0;

            if (nextElement) {
              const rect = nextElement.getBoundingClientRect();
              const menuRect = menuRef.getBoundingClientRect();

              // If element is hidden behind footer
              if (rect.bottom > menuRect.bottom - footerHeight) {
                // Calculate exact scroll position needed
                const scrollOffset =
                  rect.bottom - (menuRect.bottom - footerHeight);
                menuRef.scrollTop += scrollOffset;
              } else {
                nextElement.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }
            }

            if (newNextIndex === maxIndex) {
              footerElement?.focus();
            }
            break;
          }

          case KeyboardAction.Select:
            // Don't select the footer
            highlightedOptionIndex < maxIndex &&
              onOptionSelect(options[highlightedOptionIndex]);

            menuRef?.children[highlightedOptionIndex]?.scrollIntoView?.({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });

            // If the footer is selected, click it
            if (highlightedOptionIndex === maxIndex) {
              footerElement?.click();
            }
            break;
        }
      },
      [highlightedOptionIndex, options, onOptionSelect],
    );
    useCustomKeyboardNavigation({ onRequestHighlightChange });

    const optionsToRender = options.map((option, index) => {
      const label = option.status;
      const status = option.status === "Active" ? "success" : "informative";

      return (
        <BaseMenuOption
          addSeparators={true}
          isHighlighted={index === highlightedOptionIndex}
          onOptionSelect={onOptionSelect}
          option={option}
          key={option.value}
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

    function addNewClient() {
      window.alert("Add new client");
    }
    const footer = (
      <div style={{ position: "sticky", bottom: 0 }}>
        <Button
          label="+ Add new client"
          onMouseDown={addNewClient}
          size="small"
          id="footerElement"
          fullWidth
          type="tertiary"
        />
      </div>
    );

    return (
      <MenuWrapper visible={menuVisible}>
        {optionsToRender}
        {footer}
      </MenuWrapper>
    );
  }

  return (
    <Content>
      <Text>
        This example serves as a testing bed to verify Autocompletes within
        Modals work as expected. We&apos;ve had problems in the past with
        Autocompletes using `customRenderMenu` and it causing the parent Modal
        to be dismissed when an option is selected.
      </Text>

      <Button
        label="Open Modal with Custom Focus"
        onClick={() => setModalOpen(true)}
      />
      <Modal.Provider
        open={modalOpen}
        onRequestClose={() => {
          console.log("onRequestClose");
          setModalOpen(false);
        }}
      >
        <Modal.Content>
          <Modal.Header title="This is an example showing Autocomplete within a Modal" />
          <Content>
            <Heading level={2}>Default Rendering</Heading>
            <Autocomplete
              initialOptions={defaultOptions}
              placeholder="Search for something"
              value={value1}
              onChange={newValue => setValue1(newValue)}
              getOptions={getDefaultOptions}
              validations={{
                maxLength: 255,
                required: {
                  value: true,
                  message: "This is a required field",
                },
              }}
            />

            <Heading level={2}>Basic Custom Rendering</Heading>
            <BasicCustomTemplate />
            <Heading level={2}>Advanced Custom Rendering</Heading>
            <AdvancedCustomTemplate />
          </Content>
        </Modal.Content>
      </Modal.Provider>
    </Content>
  );

  function getDefaultOptions(text: string) {
    if (text === "") {
      return defaultOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return defaultOptions.filter(option => option.label.match(filterRegex));
  }
};

export const WithinModal = WithinModalTemplate.bind({});
