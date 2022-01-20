import React, { ChangeEvent, useRef, useState } from "react";
import { v1 as uuidV1 } from "uuid";
import { ChipDismissibleInputOptionProps } from "../InternalChipDismissibleTypes";
import { Icon } from "../../../Icon";
import { ChipProps } from "../../Chip";

export function useDismissibleChipInput(options: ChipProps[]) {
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldCancelBlur, setShouldCancelBlur] = useState(false);
  const allOptions = generateOptions(options, searchValue);

  const computed = {
    inputRef: useRef<HTMLInputElement>(null), // eslint-disable-line no-null/no-null
    menuId: uuidV1(),
    activeOption: allOptions[activeIndex],
    hasAvailableOptions: allOptions.length > 0,
  };

  const actions = {
    generateDescendantId: (index: number) => `${computed.menuId}-${index}`,
    handleReset: () => {
      setActiveIndex(0);
      setSearchValue("");
    },
    handleOpenMenu: () => setMenuOpen(true),
    handleCloseMenu: () => setMenuOpen(false),
    handleCancelBlur: () => setShouldCancelBlur(true),
    handleEnableBlur: () => setShouldCancelBlur(false),
    handleBlur: () => {
      if (shouldCancelBlur) return;
      actions.handleReset();
      actions.handleCloseMenu();
    },
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
      setActiveIndex(0);
      setSearchValue(event.currentTarget.value);
    },
    handleSetActiveOnMouseOver: (index: number) => () => setActiveIndex(index),
  };

  return {
    ...actions,
    activeIndex,
    allOptions,
    ...computed,
    menuOpen,
    searchValue,
    setActiveIndex,
    setMenuOpen,
    setSearchValue,
    shouldCancelBlur,
  };
}

function generateOptions(options: ChipProps[], searchValue: string) {
  const allOptions: ChipDismissibleInputOptionProps[] = options
    .filter(option =>
      option.label.toLowerCase().match(searchValue.trim().toLowerCase()),
    )
    .map(opt => ({ ...opt, custom: false }));

  const { shouldAddCustomOption, customOption } = generateCustomOption(
    allOptions,
    searchValue,
  );
  shouldAddCustomOption && allOptions.push(customOption);

  return allOptions;
}

function generateCustomOption(
  options: ChipDismissibleInputOptionProps[],
  searchValue: string,
) {
  function shouldAddCustomOption() {
    const isMatchingOption = options.some(
      option => option.label.toLowerCase() === searchValue.trim().toLowerCase(),
    );

    return !!searchValue && !isMatchingOption;
  }

  return {
    shouldAddCustomOption: shouldAddCustomOption(),
    customOption: {
      value: searchValue,
      label: searchValue,
      prefix: <Icon name="add" />,
      custom: true,
    },
  };
}
