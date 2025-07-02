import {
  Box,
  Cluster,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Typography,
} from "@jobber/components";
import {
  CustomOptionsMenuProp,
  KeyboardAction,
  isOptionGroup,
  isOptionSelected,
  useCustomKeyboardNavigation,
} from "@jobber/components/Autocomplete";
import { IconNames } from "@jobber/design";
import { useCallbackRef } from "@jobber/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HomeDepotIcon } from "./HomeDepotIcon";
import styles from "./CatalogItem.module.css";

export interface CustomOptionForGroup {
  label: string;
  description: string;
  cost: number;
  value: number;
  type: "default" | "catalog";
}

export interface CustomGroupOption {
  label: string;
  description: string;
  icon: IconNames;
  type: "default" | "catalog";
  options: CustomOptionForGroup[];
}

/**
 * Checks if the option is an extra element
 * @param option - The option to check
 * @returns Whether the option is an extra element
 */
function isExtraElement(option: object): option is CustomElementOption {
  return option && "sectionLabel" in option && "indexToInsertAfter" in option;
}

interface CustomElementOption {
  sectionLabel: string;
  indexToInsertAfter: number;
}

export function AdvancedAutocomplete({
  options,
  selectedOption,
  onOptionSelect,
  inputFocused,
  inputRef,
  MenuWrapper,
  menuRef,
}: CustomOptionsMenuProp<CustomGroupOption, CustomOptionForGroup>) {
  const [activeView, setActiveView] = useState("default");
  const catalogRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const { optionsWithExtraElements, extraElementFocused } =
    useCustomSectionOptions(options);
  // Set to 1 to account for the first option being the section heading
  const initialHighlight = 1;

  const [highlightedOptionIndex, setHighlightedOptionIndex] =
    useState(initialHighlight);

  const menuVisible = useMemo(
    () => extraElementFocused || inputFocused,
    [extraElementFocused, inputFocused],
  );
  const onRequestHighlightChange = useCallback(
    (_event: KeyboardEvent, direction: KeyboardAction) => {
      let newIndex = 0;

      switch (direction) {
        case KeyboardAction.Previous:
          newIndex = highlightedOptionIndex - 1;

          break;
        case KeyboardAction.Next:
          newIndex = highlightedOptionIndex + 1;
          break;

        case KeyboardAction.Select:
          onOptionSelect(optionsWithExtraElements[highlightedOptionIndex]);
          break;
      }

      if (newIndex < 0) {
        if (activeView === "catalog") {
          backRef.current?.focus();
        } else {
          catalogRef.current?.focus();
        }
      } else if (newIndex > optionsWithExtraElements.length - 1) {
        newIndex = 0;
      } else if (newIndex >= optionsWithExtraElements.length) {
        inputRef?.current?.focus();
      } else {
        if (catalogRef.current?.focus) {
          catalogRef.current?.blur();
        }
      }
      setHighlightedOptionIndex(newIndex);

      menuRef?.children[newIndex]?.scrollIntoView?.({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [
      highlightedOptionIndex,
      onOptionSelect,
      optionsWithExtraElements,
      inputRef,
      catalogRef,
    ],
  );
  useCustomKeyboardNavigation({ onRequestHighlightChange });
  console.log("OPTIONS", optionsWithExtraElements, highlightedOptionIndex);

  return (
    <MenuWrapper visible={menuVisible}>
      <Cluster justify="space-between">
        <Cluster autoWidth>
          <Box
            padding={
              activeView === "default"
                ? "base"
                : { top: "small", bottom: "small" }
            }
          >
            {activeView === "default" && (
              <Heading level={4}>{"My products & services"}</Heading>
            )}
            {activeView === "catalog" && (
              <button
                ref={backRef}
                type="button"
                className={styles.catalogItemButton}
                onMouseDown={e => {
                  e.preventDefault();
                  setActiveView("default");
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveView("default");
                  }
                }}
              >
                <Cluster>
                  <Icon name="arrowLeft" />
                  <HomeDepotIcon />
                  <Heading level={4}>{"The Home Depot"}</Heading>
                </Cluster>
              </button>
            )}
          </Box>
        </Cluster>
        <Cluster autoWidth>
          <button
            type="button"
            className={styles.catalogItemButton}
            ref={catalogRef}
            style={{
              display: activeView === "default" ? "block" : "none",
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                setActiveView("catalog");
              }
            }}
            onMouseDown={e => {
              e.preventDefault();
              setActiveView("catalog");
            }}
          >
            <Cluster gap="small">
              <Typography size="large">More</Typography>
              <HomeDepotIcon />
              <Icon name="arrowRight" />
            </Cluster>
          </button>
        </Cluster>
      </Cluster>

      {optionsWithExtraElements
        .filter(d => d.type === activeView)
        .map((option, index) => {
          if (isExtraElement(option)) {
            return undefined;
          }

          if (isOptionGroup(option)) {
            return (
              <Box
                key={option.label}
                padding={{ left: "base", bottom: "smaller" }}
              >
                <Flex template={["grow", "shrink"]}>
                  <Heading level={5}>{option.label}</Heading>
                </Flex>
              </Box>
            );
          }

          return (
            <SelectableOption
              isSelected={isOptionSelected(selectedOption, option)}
              key={option.label}
              option={option}
              index={index}
              highlightedOptionIndex={highlightedOptionIndex}
              onOptionSelect={onOptionSelect}
            />
          );
        })}
    </MenuWrapper>
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
  const isHighlighted = index === highlightedOptionIndex;

  return (
    <button
      role="option"
      type="button"
      className={[
        styles.catalogItemButton,
        isHighlighted && styles.highlighted,
      ].join(" ")}
      onMouseDown={onOptionSelect.bind(undefined, option)}
    >
      <Box width="100%">
        <Cluster justify="space-between">
          <Cluster>
            {isSelected && <Icon name="checkmark" size="small" />}
            <Stack gap="small" autoWidth>
              <Text>{option.label}</Text>
              <Text>{option.description}</Text>
            </Stack>
          </Cluster>
          <Cluster>
            <Text size="large">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(option.cost))}
            </Text>
          </Cluster>
        </Cluster>
      </Box>
    </button>
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
type OptionsWithExtraElements =
  | CustomGroupOption
  | CustomOptionForGroup
  | CustomElementOption;

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
