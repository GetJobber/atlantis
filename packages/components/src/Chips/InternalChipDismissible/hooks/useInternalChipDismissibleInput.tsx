import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";
import { useDebounce } from "@jobber/components/utils/useDebounce";
import {
  ChipDismissibleInputOptionProps,
  ChipDismissibleInputProps,
} from "../InternalChipDismissibleTypes";
import { Icon } from "../../../Icon";
import { ChipProps } from "../../Chip";

const SEARCH_DEBOUNCE_TIME = 300;

// eslint-disable-next-line max-statements
export function useInternalChipDismissibleInput({
  options,
  isLoadingMore = false,
  onCustomOptionSelect,
  onOptionSelect,
  onSearch,
  onlyShowMenuOnSearch = false,
  autoSelectOnClickOutside = false,
  controlled = false,
}: ChipDismissibleInputProps) {
  const menuId = useId();
  const [allOptions, setAllOptions] = useState<
    ChipDismissibleInputOptionProps[]
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldCancelBlur, setShouldCancelBlur] = useState(false);
  const [shouldCancelEnter, setShouldCancelEnter] = useState(false);
  const canAddCustomOption =
    onCustomOptionSelect !== undefined && !isLoadingMore;
  const maxOptionIndex = allOptions.length - 1;

  const { liveAnnounce } = useLiveAnnounce();

  useEffect(() => {
    if (controlled) {
      // In controlled mode, just convert options to the expected format
      setAllOptions(options.map(opt => ({ ...opt, custom: false })));
    } else {
      // In uncontrolled mode, perform filtering based on searchValue
      setAllOptions(generateOptions(options, searchValue, canAddCustomOption));
    }
  }, [options, controlled, searchValue, canAddCustomOption]);

  const computed = {
    menuId,
    inputRef: useRef<HTMLInputElement>(null),
    activeOption: allOptions[activeIndex],
    hasAvailableOptions: allOptions.length > 0,
    nextOptionIndex: activeIndex < maxOptionIndex ? activeIndex + 1 : 0,
    previousOptionIndex: activeIndex > 0 ? activeIndex - 1 : maxOptionIndex,
  };

  function handleSearch(newSearchValue: string, newOptions: ChipProps[] = []) {
    onSearch && onSearch(newSearchValue);
    setAllOptions(
      generateOptions(newOptions, newSearchValue, canAddCustomOption),
    );
    setShouldCancelEnter(false);
  }

  const handleDebouncedSearch = useDebounce(handleSearch, SEARCH_DEBOUNCE_TIME);

  const actions = {
    generateDescendantId: (index: number) => `${computed.menuId}-${index}`,

    handleReset: () => {
      setActiveIndex(activeIndex === 0 ? activeIndex : activeIndex - 1);
      setSearchValue("");

      if (onlyShowMenuOnSearch) {
        actions.handleCloseMenu();
      }
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

      if (
        autoSelectOnClickOutside &&
        searchValue.length > 0 &&
        allOptions.length > 0
      ) {
        // If there's a custom option, select it. Otherwise select the best match
        const optionToSelect = canAddCustomOption
          ? generateCustomOptionObject(searchValue)
          : allOptions[0];
        actions.handleSelectOption(optionToSelect);
      }

      actions.handleReset();
      actions.handleCloseMenu();
      setShowInput(false);
    },

    handleFocus: () => {
      if (!onlyShowMenuOnSearch) {
        actions.handleOpenMenu();
      }
    },

    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
      setActiveIndex(0);
      const newSearchValue = event.currentTarget.value;
      setSearchValue(newSearchValue);

      if (controlled) {
        // In controlled mode, just call onSearch immediately without debouncing
        onSearch && onSearch(newSearchValue);
      } else {
        // In uncontrolled mode, use debouncing and handle menu state
        setShouldCancelEnter(true);

        if (onlyShowMenuOnSearch && newSearchValue.length > 0 && !menuOpen) {
          setTimeout(() => {
            actions.handleOpenMenu();
          }, SEARCH_DEBOUNCE_TIME);
        }

        if (onlyShowMenuOnSearch && newSearchValue.length === 0 && menuOpen) {
          actions.handleCloseMenu();
        }

        handleDebouncedSearch(newSearchValue, options);
      }
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

    handleShowInput: () => {
      setShowInput(true);

      if (!onlyShowMenuOnSearch) {
        actions.handleOpenMenu();
      }
    },

    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      const callbacks: KeyDownCallBacks = {};

      if (!onlyShowMenuOnSearch || searchValue.length > 0) {
        callbacks.Enter = () => {
          if (shouldCancelEnter && !controlled) return;
          actions.handleSelectOption(computed.activeOption);
        };
        callbacks.Tab = () => actions.handleSelectOption(computed.activeOption);

        callbacks[","] = () => {
          if (searchValue.length === 0) return;
          actions.handleSelectOption(generateCustomOptionObject(searchValue));
        };

        callbacks.ArrowDown = () => {
          if (isLoadingMore && activeIndex === maxOptionIndex) return;
          setActiveIndex(computed.nextOptionIndex);
        };
        callbacks.ArrowUp = () => setActiveIndex(computed.previousOptionIndex);
      }

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
  };

  return {
    ...actions,
    activeIndex,
    allOptions,
    ...computed,
    menuOpen,
    showInput,
    searchValue,
    shouldCancelBlur,
    controlled,
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
