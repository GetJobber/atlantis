import {
  Button,
  Content,
  Flex,
  Heading,
  Icon,
  IconNames,
  StatusIndicatorType,
  StatusLabel,
  Text,
} from "@jobber/components";
import {
  AnyOption,
  Autocomplete,
  BaseMenuGroupOption,
  BaseMenuOption,
  CustomOptionsMenuProp,
  KeyboardAction,
  MenuOption,
  Option,
  getRequestedIndexChange,
  isOptionGroup,
  isOptionSelected,
  useCustomKeyboardNavigation,
  useKeyboardNavigation,
} from "@jobber/components/Autocomplete";
import { useCallbackRef } from "@jobber/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

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

export const BasicCustomTemplate = () => {
  const [detailsValue, setDetailsValue] = useState<Option | undefined>();
  const planetSection = SectionHeadingOptions.find(
    ({ label }) => label === "Planets",
  )?.options;

  return (
    <Content>
      <Autocomplete
        placeholder="Search for an option with section headings"
        initialOptions={SectionHeadingOptions}
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

  // eslint-disable-next-line max-statements
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

  function getHeadingsOption(text: string) {
    if (text === "") {
      return SectionHeadingOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return SectionHeadingOptions.map(section => ({
      ...section,
      options: section.options.filter(option =>
        option.label.match(filterRegex),
      ),
    }));
  }
};

export const BasicCustomTemplateCode = `
export const BasicCustomTemplate = () => {
  const [detailsValue, setDetailsValue] = useState<Option | undefined>();
  const planetSection = SectionHeadingOptions.find(
    ({ label }) => label === "Planets",
  )?.options;

  return (
    <Content>
      <Autocomplete
        placeholder="Search for an option with section headings"
        initialOptions={SectionHeadingOptions}
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

  // eslint-disable-next-line max-statements
  function getOptionStyling({
    option,
    highlightedIndex,
    options,
  }: {
    option: AnyOption;
    highlightedIndex: number;
    options: AnyOption[];
  }) {
    const isSectionLabel = "options" in option;
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

  function getHeadingsOption(text: string) {
    if (text === "") {
      return SectionHeadingOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return SectionHeadingOptions.map(section => ({
      ...section,
      options: section.options.filter(option =>
        option.label.match(filterRegex),
      ),
    }));
  }
};
`;

interface CustomOption {
  value: number;
  label: string;
  address: string;
  contact: string;
  status: string;
}
const AdvancedOptions: CustomOption[] = [
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

export const AdvancedCustomTemplate = () => {
  const [value, setValue] = useState<CustomOption | undefined>();

  function getOptions(text: string) {
    if (text === "") {
      return AdvancedOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return AdvancedOptions.filter(
      option =>
        option.label.match(filterRegex) ||
        option.address.match(filterRegex) ||
        option.contact.match(filterRegex),
    );
  }

  return (
    <Autocomplete
      placeholder="Search for something"
      initialOptions={AdvancedOptions}
      value={value}
      onChange={newValue => setValue(newValue)}
      customRenderMenu={props => <CustomMenuContent {...props} />}
      getOptions={getOptions}
    />
  );
};

// eslint-disable-next-line max-statements
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
  const footerElement = document.querySelector("#footerElement") as HTMLElement;

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

  /* eslint-disable max-statements */
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

          if (highlightedOptionIndex === maxIndex) {
            footerElement?.click();
          }
          break;
      }
    },
    [highlightedOptionIndex, options, onOptionSelect],
  );
  useCustomKeyboardNavigation({ onRequestHighlightChange });

  function addNewClient() {
    window.alert("Add new client");
  }
  const footer = (
    <div style={{ position: "sticky", bottom: 0 }}>
      <Button
        label="+ Add new client"
        onClick={addNewClient}
        id="footerElement"
        size="small"
        fullWidth
        type="tertiary"
      />
    </div>
  );

  return (
    <MenuWrapper visible={menuVisible}>
      {options.map((option, index) => {
        const label = option.status;
        const status = option.status === "Active" ? "success" : "informative";

        return (
          <BaseMenuOption
            addSeparators={true}
            isHighlighted={index === highlightedOptionIndex}
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
      })}
      {footer}
    </MenuWrapper>
  );
}

export const AdvancedRenderMenuOptionCode = `
function addNewClient() {
  window.alert("Add new client");
}
const footer = (
  <div style={{ position: "sticky", bottom: 0 }}>
    <Button
      label="+ Add new client"
      onClick={addNewClient}
      id="footerElement"
      size="small"
      fullWidth
      type="tertiary"
    />
  </div>
);
<MenuWrapper visible={menuVisible}>
  {options.map((option, index) => {
    const label = option.status;
    const status = option.status === "Active" ? "success" : "informative";

    return (
      <BaseMenuOption
        addSeparators={true}
        isHighlighted={index === highlightedOptionIndex}
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
  })}
  {footer}
</MenuWrapper>
`;

export const AdvancedKeyboardNavigationSnippet = `
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
            if (highlightedOptionIndex === maxIndex) {
              footerElement?.click();
            }
            break;
        }
      },
      [highlightedOptionIndex, options, onOptionSelect],
    );
    useCustomKeyboardNavigation({ onRequestHighlightChange });
    `;

export const AdvancedCustomTemplateCode = `

interface CustomOption {
    value: number;
    label: string;
    address: string;
    contact: string;
    status: string;
  }
  const AdvancedOptions: CustomOption[] = [
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
  
  export const AdvancedCustomTemplate = () => {
    const [value, setValue] = useState<CustomOption | undefined>();
  
    function getOptions(text: string) {
      if (text === "") {
        return AdvancedOptions;
      }
      const filterRegex = new RegExp(text, "i");
  
      return AdvancedOptions.filter(
        option =>
          option.label.match(filterRegex) ||
          option.address.match(filterRegex) ||
          option.contact.match(filterRegex),
      );
    }
  
    return (
      <Autocomplete
        placeholder="Search for something"
        initialOptions={AdvancedOptions}
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
            if (highlightedOptionIndex === maxIndex) {
              footerElement?.click();
            }
            break;
        }
      },
      [highlightedOptionIndex, options, onOptionSelect],
    );
    useCustomKeyboardNavigation({ onRequestHighlightChange });
  
    return (
      <MenuWrapper visible={menuVisible}>
        {options.map((option, index) => {
          const label = option.status;
          const status = option.status === "Active" ? "success" : "informative";
          return (
            <BaseMenuOption
              addSeparators={true}
              isHighlighted={index === highlightedOptionIndex}
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
        })}
        {footer}
      </MenuWrapper>
    );
  }`;

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

export function AdvancedSectionHeadingTemplate() {
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
  const initialHighlight = 1;

  const [highlightedOptionIndex, setHighlightedOptionIndex] =
    useState(initialHighlight);

  // Max index is the length of the options with extra elements minus 1
  const maxIndex = optionsWithExtraElements.length - 1;

  const menuVisible = useMemo(
    () => extraElementFocused || inputFocused,
    [extraElementFocused, inputFocused],
  );
  const onRequestHighlightChange = useCallback(
    // eslint-disable-next-line max-statements
    (_event: KeyboardEvent, direction: KeyboardAction) => {
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

  return (
    <MenuWrapper visible={menuVisible}>
      {optionsWithExtraElements.map((option, index) => {
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
      })}
    </MenuWrapper>
  );
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

export const AdvancedSectionMenuRenderingCode = `
<MenuWrapper visible={menuVisible}>
  {optionsWithExtraElements.map((option, index) => {
    if (isExtraElement(option)) {
      return (
        <AdvancedSectionFooterButton
          label={option.sectionLabel}
          id={option.sectionLabel}
          key={\`\${option.sectionLabel}-create-new\`}
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
  })}
</MenuWrapper>`;

export const isExtraElementCode = `
/**
 * Checks if the option is an extra element
 * @param option - The option to check
 * @returns Whether the option is an extra element
 */
function isExtraElement(option: object): option is CustomElementOption {
  return option && "sectionLabel" in option && "indexToInsertAfter" in option;
}`;

export const useCustomSectionOptionsCode = `

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
}`;

export const AdvancedSectionSelectableOptionCode = `
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
}`;

export const CustomRenderingWithSectionHeadingsCode = `
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

export function AdvancedSectionHeadingTemplate() {
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
  const initialHighlight = 1

  const [highlightedOptionIndex, setHighlightedOptionIndex] =
    useState(initialHighlight);
  // Length of options -1 and the number of extra elements

  const maxIndex = optionsWithExtraElements.length - 1;

  const menuVisible = useMemo(
    () => extraElementFocused || inputFocused,
    [extraElementFocused, inputFocused],
  );
  const onRequestHighlightChange = useCallback(
    // eslint-disable-next-line max-statements
    (_event: KeyboardEvent, direction: KeyboardAction) => {
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

  ${AdvancedSectionMenuRenderingCode}
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
      label={\`+ Add new \${label}\`}
      onClick={() => alert(\`Add new \${label}\`)}
      size="small"
      id={id}
      fullWidth
      type="tertiary"
    />
  );
}

${AdvancedSectionSelectableOptionCode}
${useCustomSectionOptionsCode}
${isExtraElementCode}
`;

export const AdvancedSectionKeyboardNavigationSnippet = `
  ... 
  // Other code
  const { optionsWithExtraElements, extraElementFocused } =
    useCustomSectionOptions(options);
  // Set to 1 to account for the first option being the section heading
  const initialHighlight = 1

  const [highlightedOptionIndex, setHighlightedOptionIndex] =
    useState(initialHighlight);
  // Length of options -1 and the number of extra elements

  const maxIndex = optionsWithExtraElements.length - 1;

  const menuVisible = useMemo(
    () => extraElementFocused || inputFocused,
    [extraElementFocused, inputFocused],
  );
  const onRequestHighlightChange = useCallback(
    // eslint-disable-next-line max-statements
    (_event: KeyboardEvent, direction: KeyboardAction) => {
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
`;
