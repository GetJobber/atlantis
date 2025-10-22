/* eslint-disable max-statements */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
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
} from "@jobber/components/Autocomplete";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Icon } from "@jobber/components/Icon";
import { Grid } from "@jobber/components/Grid";
import { Heading } from "@jobber/components/Heading";
import { useCallbackRef } from "@jobber/hooks/useCallbackRef";

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
    </Grid>
  );
};
export const CustomRendering = CustomRenderingTemplate.bind({});
