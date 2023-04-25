import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { v1 as uuidV1 } from "uuid";
import { debounce } from "lodash";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";
import {
  ChipDismissibleInputOptionProps,
  ChipDismissibleInputProps,
} from "../InternalChipDismissibleTypes";
import { Icon } from "../../../Icon";
import { ChipProps } from "../../Chip";

const menuId = uuidV1();

// eslint-disable-next-line max-statements
export function useInternalChipDismissibleInput({
  options,
  isLoadingMore = false,
  onCustomOptionSelect,
  onOptionSelect,
  onSearch,
}: ChipDismissibleInputProps) {
  const [allOptions, setAllOptions] = useState<
    ChipDismissibleInputOptionProps[]
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldCancelBlur, setShouldCancelBlur] = useState(false);
  const [shouldCancelEnter, setShouldCancelEnter] = useState(false);
  const canAddCustomOption =
    onCustomOptionSelect !== undefined && !isLoadingMore;
  const maxOptionIndex = allOptions.length - 1;

  const { liveAnnounce } = useLiveAnnounce();

  useEffect(() => {
    setAllOptions(generateOptions(options, searchValue, canAddCustomOption));
  }, [options]);

  const computed = {
    menuId,
    inputRef: useRef<HTMLInputElement>(null),
    activeOption: allOptions[activeIndex],
    hasAvailableOptions: allOptions.length > 0,
    nextOptionIndex: activeIndex < maxOptionIndex ? activeIndex + 1 : 0,
    previousOptionIndex: activeIndex > 0 ? activeIndex - 1 : maxOptionIndex,
  };

  const actions = {
    generateDescendantId: (index: number) => `${computed.menuId}-${index}`,

    handleReset: () => {
      setActiveIndex(activeIndex === 0 ? activeIndex : activeIndex - 1);
      setSearchValue("");
    },

    handleOpenMenu: () => setMenuOpen(true),

    handleCloseMenu: () => {
      setMenuOpen(false);
      setActiveIndex(0);
    },

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
      setShouldCancelEnter(true);
    },

    handleSetActiveOnMouseOver: (index: number) => {
      return () => setActiveIndex(index);
    },

    handleSelectOption: (selected: typeof computed.activeOption) => {
      if (allOptions.length === 0) return;
      const setValue = selected.custom ? onCustomOptionSelect : onOptionSelect;
      if (setValue) {
        setValue(selected.value);
        liveAnnounce(`${selected.label} Added`);
        actions.handleReset();
        computed.inputRef.current?.focus();
      }
    },

    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      const callbacks: KeyDownCallBacks = {
        Enter: () => {
          if (shouldCancelEnter) return;
          actions.handleSelectOption(computed.activeOption);
        },
        Tab: () => actions.handleSelectOption(computed.activeOption),
        ",": () => {
          if (searchValue.length === 0) return;
          actions.handleSelectOption(generateCustomOptionObject(searchValue));
        },
        ArrowDown: () => {
          if (isLoadingMore && activeIndex === maxOptionIndex) return;
          setActiveIndex(computed.nextOptionIndex);
        },
        ArrowUp: () => setActiveIndex(computed.previousOptionIndex),
      };

      if (searchValue.length === 0) {
        callbacks.Backspace = () => {
          // If there's no text left to delete,
          // and delete is pressed again, focus on a chip instead.
          const target = computed.inputRef.current?.previousElementSibling;
          if (target instanceof HTMLElement) {
            target.focus();
          }
        };
      }

      handleKeydownEvents(callbacks, event);
    },

    handleDebouncedSearch: debounce(() => {
      onSearch && onSearch(searchValue);
      setAllOptions(generateOptions(options, searchValue, canAddCustomOption));
      setShouldCancelEnter(false);
    }, 300),
  };

  return {
    ...actions,
    activeIndex,
    allOptions,
    ...computed,
    menuOpen,
    searchValue,
    shouldCancelBlur,
  };
}

function generateOptions(
  options: ChipProps[],
  searchValue: string,
  canAddCustomOption: boolean,
) {
  const allOptions: ChipDismissibleInputOptionProps[] = options
    .filter(option =>
      option.label.toLowerCase().match(searchValue.trim().toLowerCase()),
    )
    .map(opt => ({ ...opt, custom: false }));

  const { shouldAddCustomOption, customOption } = generateCustomOption(
    allOptions,
    searchValue,
    canAddCustomOption,
  );
  shouldAddCustomOption && allOptions.push(customOption);

  return allOptions;
}

function generateCustomOption(
  options: ChipDismissibleInputOptionProps[],
  searchValue: string,
  canAddCustomOption: boolean,
) {
  function shouldAddCustomOption() {
    const isMatchingOption = options.some(
      option => option.label.toLowerCase() === searchValue.trim().toLowerCase(),
    );

    return !!searchValue && !isMatchingOption;
  }

  return {
    shouldAddCustomOption: canAddCustomOption && shouldAddCustomOption(),
    customOption: generateCustomOptionObject(searchValue),
  };
}

function generateCustomOptionObject(searchValue: string) {
  return {
    value: searchValue,
    label: searchValue,
    prefix: <Icon name="add" />,
    custom: true,
  };
}

interface KeyDownCallBacks {
  [key: string]: (event: KeyboardEvent<HTMLInputElement>) => void;
}

function handleKeydownEvents(
  callbacks: KeyDownCallBacks,
  event: React.KeyboardEvent<HTMLInputElement>,
) {
  if (event.shiftKey) return;
  Object.entries(callbacks).forEach(([key, callback]) => {
    if (event.key === key) {
      event.preventDefault();
      callback(event);
    }
  });
}
