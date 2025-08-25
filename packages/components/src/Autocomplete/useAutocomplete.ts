import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ActionConfig,
  ActionOrigin,
  AutocompleteRebuiltProps,
  AutocompleteValue,
  MenuAction,
  MenuPersistent,
  MenuSection,
  OptionLike,
} from "./Autocomplete.types";
import {
  buildRenderableList,
  findNavigableIndexForValue,
  flattenMenu,
  invokeActiveItemOnEnter,
} from "./utils/menuModel";
import { useAutocompleteListNav } from "./hooks/useAutocompleteListNav";

export type RenderItem<
  T extends OptionLike,
  S extends object = Record<string, unknown>,
  A extends object = Record<string, unknown>,
> =
  | { kind: "option"; value: T }
  | { kind: "action"; action: MenuAction<A>; origin?: ActionOrigin }
  | { kind: "section"; section: MenuSection<T, S, A> };

// Keeping this hook cohesive improves readability by centralizing related
// interactions and state transitions.
// eslint-disable-next-line max-statements
export function useAutocomplete<
  Value extends OptionLike,
  Multiple extends boolean = false,
  SectionExtra extends object = Record<string, unknown>,
  ActionExtra extends object = Record<string, unknown>,
>(props: AutocompleteRebuiltProps<Value, Multiple, SectionExtra, ActionExtra>) {
  const {
    menu,
    emptyActions,
    getOptionLabel: getOptionLabelProp,
    getOptionKey: getOptionKeyProp,
    getActionKey: getActionKeyProp,
    getSectionKey: getSectionKeyProp,
    isOptionEqualToValue,
    inputValue,
    onInputChange,
    value,
    onChange,
    multiple,
    openOnFocus = true,
    readOnly = false,
  } = props;

  const getOptionLabel = useCallback(
    (opt: Value) => (getOptionLabelProp ? getOptionLabelProp(opt) : opt.label),
    [getOptionLabelProp],
  );

  const getOptionKey = useCallback(
    (opt: Value) =>
      getOptionKeyProp ? getOptionKeyProp(opt) : getOptionLabel(opt),
    [getOptionKeyProp, getOptionLabel],
  );

  const equals = useCallback(
    (a: Value, b: Value) =>
      isOptionEqualToValue
        ? isOptionEqualToValue(a, b)
        : getOptionLabel(a) === getOptionLabel(b),
    [isOptionEqualToValue, getOptionLabel],
  );

  const getActionKey = useCallback(
    (action: MenuAction<ActionExtra>) =>
      getActionKeyProp ? getActionKeyProp(action) : action.label,
    [getActionKeyProp],
  );

  const getSectionKey = useCallback(
    (section: MenuSection<Value, SectionExtra, ActionExtra>) =>
      getSectionKeyProp ? getSectionKeyProp(section) : section.label,
    [getSectionKeyProp],
  );

  const isOptionSelected = useCallback(
    (opt: Value) => {
      if (multiple) {
        const current = (value as AutocompleteValue<Value, true>) ?? [];

        return (current as Value[]).some(v => equals(v, opt));
      }
      const current = value as Value | undefined;

      return current != null ? equals(current, opt) : false;
    },
    [multiple, value, equals],
  );

  const flatInitial = useMemo(
    () => flattenMenu<Value, SectionExtra, ActionExtra>(menu),
    [menu],
  );
  const sections = flatInitial.sections;
  const optionItems = flatInitial.optionItems;
  const persistentsHeaders = flatInitial.persistentsHeaders;
  const persistentsFooters = flatInitial.persistentsFooters;
  // inputValue changes very often, is this worth memoizing?
  const exactLabelMatch = useMemo(() => {
    const inputEqualsOption = props.inputEqualsOption;
    const equalsInput = inputEqualsOption
      ? (o: Value) => inputEqualsOption(inputValue, o)
      : (o: Value) => getOptionLabel(o) === inputValue;

    return optionItems.some(equalsInput);
  }, [optionItems, getOptionLabel, inputValue, props.inputEqualsOption]);

  const lastInputWasUser = useRef(false);

  const renderable = useMemo(() => {
    const transform = (opts: Value[]): Value[] => {
      if (exactLabelMatch && !lastInputWasUser.current) return opts;
      if (props.filterOptions === false) return opts;

      if (typeof props.filterOptions === "function") {
        return props.filterOptions(opts, inputValue);
      }

      // Default to case-insensitive includes
      const term = inputValue.toLowerCase();

      return opts.filter(opt =>
        getOptionLabel(opt).toLowerCase().includes(term),
      );
    };

    const items = buildRenderableList<Value, SectionExtra, ActionExtra>(
      sections,
      transform,
    );

    const hasAnyOptions = items.some(i => i.kind === "option");

    if (!hasAnyOptions) {
      if (emptyActions) {
        const derived =
          typeof emptyActions === "function"
            ? emptyActions({ inputValue })
            : emptyActions;

        return derived.map(act => ({
          kind: "action" as const,
          action: act as MenuAction<ActionExtra>,
          origin: "empty" as ActionOrigin,
        }));
      }

      // No options and no emptyActions: render empty state
      return [];
    }

    return items;
  }, [
    sections,
    props.filterOptions,
    inputValue,
    exactLabelMatch,
    getOptionLabel,
    emptyActions,
  ]);

  // This is only options
  const optionCount = useMemo(
    () =>
      renderable.reduce(
        (count, item) => count + (item.kind === "option" ? 1 : 0),
        0,
      ),
    [renderable],
  );

  const hasSelection = useMemo(() => {
    if (multiple) {
      const current = (value as AutocompleteValue<Value, true>) ?? [];

      return Array.isArray(current) && current.length > 0;
    }

    return (value as Value | undefined) != null;
  }, [multiple, value]);

  const getPersistentKey = useCallback(
    (p: MenuPersistent<ActionExtra>) =>
      props.getPersistentKey ? props.getPersistentKey(p) : p.label,
    [props.getPersistentKey],
  );

  const headerInteractiveCount = useMemo(
    () => persistentsHeaders.filter(p => Boolean(p.onClick)),
    [persistentsHeaders],
  );
  const footerInteractiveCount = useMemo(
    () => persistentsFooters.filter(p => Boolean(p.onClick)),
    [persistentsFooters],
  );

  const mainNavigableCount = useMemo(
    () => renderable.reduce((c, i) => c + (i.kind === "section" ? 0 : 1), 0),
    [renderable],
  );

  const totalNavigableCount =
    headerInteractiveCount.length +
    mainNavigableCount +
    footerInteractiveCount.length;

  // Compute the currently selected index in the global navigable list (header -> middle -> footer)
  const selectedIndex: number | null = useMemo(() => {
    const selectedValue = multiple
      ? ((value as AutocompleteValue<Value, true>)?.[0] as Value | undefined)
      : (value as Value | undefined);

    if (!selectedValue) return null;

    const middleIndex = findNavigableIndexForValue(
      renderable,
      equals,
      selectedValue,
    );

    if (middleIndex == null) return null;

    return headerInteractiveCount.length + middleIndex;
  }, [multiple, value, renderable, equals, headerInteractiveCount.length]);

  const {
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    activeIndex,
    setActiveIndex,
    listRef,
    open,
    setOpen,
    setReferenceElement,
  } = useAutocompleteListNav({
    openOnFocus: openOnFocus && !readOnly,
    navigableCount: totalNavigableCount,
    shouldResetActiveIndexOnClose: () => !hasSelection,
    selectedIndex,
    onMenuClose: () => {
      if (props.allowFreeForm !== true) {
        const hasText = inputValue.trim().length > 0;

        if (hasText && !hasSelection) {
          suppressOpenOnInputChange.current = true;
          lastInputWasUser.current = false;

          onInputChange?.("");
          setActiveIndex(null);
        }
      }
    },
  });

  const suppressOpenOnInputChange = useRef(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Open/close behavior driven by input changes
  useEffect(() => {
    if (suppressOpenOnInputChange.current) {
      suppressOpenOnInputChange.current = false;

      return;
    }

    if (readOnly) return;

    const hasText = inputValue.trim().length > 0;

    if (lastInputWasUser.current) {
      const keepOpenOnEmpty = openOnFocus && inputFocused;

      setOpen(hasText || keepOpenOnEmpty);
    }
  }, [inputValue, readOnly, openOnFocus, inputFocused, setOpen]);

  // Handles activeIndex reset and change propagation when input is empty
  useEffect(() => {
    const hasText = inputValue.trim().length > 0;

    if (hasText) return;

    // If we started with a selection, we treat clearing it as a commit signal
    if (hasSelection) {
      onChange?.(undefined as AutocompleteValue<Value, Multiple>);
      setActiveIndex(null);
    } else {
      // this happens before render, can we optimize this?
      setActiveIndex(null);
    }
  }, [inputValue, hasSelection, setActiveIndex, onChange, open]);

  function selectOption(option: Value) {
    if (multiple) {
      const current = (value as AutocompleteValue<Value, true>) ?? [];
      const exists = (current as Value[]).some(v => equals(v, option));
      const next = exists
        ? (current as Value[]).filter(v => !equals(v, option))
        : [...(current as Value[]), option];

      onChange(next as AutocompleteValue<Value, Multiple>);
    } else {
      onChange(option as AutocompleteValue<Value, Multiple>);

      suppressOpenOnInputChange.current = true;
      lastInputWasUser.current = false;

      onInputChange?.(getOptionLabel(option));
    }
  }

  function tryCommitFreeFormOnEnter(): boolean {
    if (props.allowFreeForm !== true) return false;
    if (open && activeIndex != null) return false;

    const inputText = inputValue.trim();

    if (inputText.length === 0) return false;

    commitFromInputText(inputText);

    return true;
  }

  // Keep the selected item highlighted when deleting characters from the input
  const prevInputLengthRef = useRef(inputValue.length);
  useEffect(() => {
    const previousLength = prevInputLengthRef.current;
    prevInputLengthRef.current = inputValue.length;

    if (!open) return;
    if (!lastInputWasUser.current) return;
    if (previousLength <= inputValue.length) return; // only on deletion
    if (!hasSelection) return;

    const selectedValue = multiple
      ? ((value as AutocompleteValue<Value, true>)?.[0] as Value | undefined)
      : (value as Value | undefined);

    if (!selectedValue) return;

    const idx = findNavigableIndexForValue(renderable, equals, selectedValue);
    if (idx != null) setActiveIndex(idx);
  }, [
    inputValue,
    renderable,
    equals,
    value,
    open,
    hasSelection,
    multiple,
    setActiveIndex,
  ]);

  useEffect(() => {
    if (!open) return;

    // When opening the menu, initialize the highlight consistently:
    // - If there is a current selection, highlight that option
    // - Otherwise, leave the highlight unset (null)
    const selectedValue = multiple
      ? ((value as AutocompleteValue<Value, true>)?.[0] as Value | undefined)
      : (value as Value | undefined);

    if (selectedValue) {
      const selectedNavigableIndex = findNavigableIndexForValue(
        renderable,
        equals,
        selectedValue,
      );

      if (selectedNavigableIndex != null) {
        setActiveIndex(selectedNavigableIndex);

        return;
      }
    }

    setActiveIndex(null);
  }, [open, multiple, value, renderable, equals, setActiveIndex]);

  const onSelection = useCallback(
    (option: Value) => {
      selectOption(option);
      // Might not always want to close on selection. Multi for example.
      setOpen(false);
    },
    [selectOption, setOpen],
  );

  const onAction = useCallback(
    (action: ActionConfig) => {
      action.run();

      setActiveIndex(null);

      if (action.closeOnRun !== false) setOpen(false);
    },
    [setOpen, setActiveIndex],
  );

  function commitFromInputText(inputText: string): boolean {
    if (inputText.length === 0) return false;

    const inputEqualsOption = props.inputEqualsOption;
    const match = optionItems.find(o =>
      inputEqualsOption
        ? inputEqualsOption(inputText, o)
        : getOptionLabel(o) === inputText,
    );

    if (match) {
      onSelection(match);

      return true;
    }

    setOpen(false);

    if (props.allowFreeForm !== true) return false;

    const created = props.createFreeFormValue?.(inputText);

    if (!created) return false;

    props.onChange(created as AutocompleteValue<Value, Multiple>);

    return true;
  }

  const tryRestoreInputToSelectedLabel = useCallback(() => {
    if (props.allowFreeForm === true) return;

    const selectedValue = multiple
      ? ((value as AutocompleteValue<Value, true>)?.[0] as Value | undefined)
      : (value as Value | undefined);
    if (!selectedValue) return;

    const selectedLabel = getOptionLabel(selectedValue);

    if (inputValue === selectedLabel) return;

    suppressOpenOnInputChange.current = true;
    lastInputWasUser.current = false;

    onInputChange?.(selectedLabel);
  }, [
    props.allowFreeForm,
    getOptionLabel,
    inputValue,
    onInputChange,
    multiple,
    value,
  ]);

  const onInputFocus = useCallback(() => {
    setInputFocused(true);
    props.onFocus?.();
  }, [props.onFocus]);

  const onInputBlur = useCallback(() => {
    setInputFocused(false);

    if (readOnly) {
      props.onBlur?.();

      return;
    }

    if (props.allowFreeForm === true) {
      const inputText = inputValue.trim();
      if (inputText.length > 0) commitFromInputText(inputText);
    } else {
      tryRestoreInputToSelectedLabel();
    }

    props.onBlur?.();
  }, [
    readOnly,
    props.allowFreeForm,
    inputValue,
    props.onBlur,
    tryRestoreInputToSelectedLabel,
  ]);

  function getRegionByActiveIndex(index: number): {
    region: "header" | "middle" | "footer";
    regionIndex: number;
  } {
    const headerCount = headerInteractiveCount.length;
    const mainCount = mainNavigableCount;

    if (index < headerCount) return { region: "header", regionIndex: index };

    const middleIndex = index - headerCount;

    if (middleIndex < mainCount) {
      return { region: "middle", regionIndex: middleIndex };
    }

    return {
      region: "footer",
      regionIndex: middleIndex - mainCount,
    };
  }

  function computeInitialIndexForArrowUp(): number | null {
    // If there are interactive footers, prefer the very last navigable item
    if (footerInteractiveCount.length > 0) {
      return totalNavigableCount > 0 ? totalNavigableCount - 1 : null;
    }

    // Otherwise, prefer the last OPTION (not action), matching legacy behavior
    let navigable = -1;
    let lastOptionIdx = -1;

    for (const item of renderable) {
      if (item.kind === "section") continue;
      navigable += 1;
      if (item.kind === "option") lastOptionIdx = navigable;
    }

    if (lastOptionIdx >= 0) {
      return headerInteractiveCount.length + lastOptionIdx;
    }

    return totalNavigableCount > 0 ? totalNavigableCount - 1 : null;
  }

  function handleArrowNavigation(key: string, event: React.KeyboardEvent) {
    if (!open) {
      setOpen(true);

      return;
    }

    if (activeIndex == null) {
      setActiveIndex(key === "ArrowDown" ? 0 : computeInitialIndexForArrowUp());
      event.preventDefault();
    }
  }

  function handleEnterKey(event: React.KeyboardEvent) {
    if (tryCommitFreeFormOnEnter()) {
      event.preventDefault();

      return;
    }

    if (!open || activeIndex == null) return;

    const { region, regionIndex } = getRegionByActiveIndex(activeIndex);

    if (region === "middle") {
      invokeActiveItemOnEnter<Value, SectionExtra, ActionExtra>(
        event,
        regionIndex,
        renderable,
        onSelection,
        onAction,
      );

      return;
    }

    const persistent =
      region === "header"
        ? headerInteractiveCount[regionIndex]
        : footerInteractiveCount[regionIndex];

    if (persistent?.onClick) {
      onAction({
        run: persistent.onClick,
        closeOnRun: persistent.shouldClose,
      });
    }
  }

  const onInputKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;
      if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Enter") return;

      if (key === "ArrowDown" || key === "ArrowUp") {
        handleArrowNavigation(key, event);

        return;
      }
      handleEnterKey(event);
    },
    [open, onSelection, onAction],
  );

  const onInputChangeFromUser = useCallback(
    (val: string) => {
      lastInputWasUser.current = true;

      // Reset highlight (activeIndex) on additions to the search term
      if (val.length > inputValue.length) {
        setActiveIndex(null);
      }

      onInputChange?.(val);
    },
    [onInputChange, inputValue, setActiveIndex],
  );

  return {
    // rendering data
    renderable,
    optionCount,
    persistentsHeaders,
    persistentsFooters,
    headerInteractiveCount: headerInteractiveCount.length,
    middleNavigableCount: mainNavigableCount,
    getOptionLabel,
    getOptionKey,
    getActionKey,
    getSectionKey,
    getPersistentKey,
    isOptionSelected,
    // floating-ui
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    // state
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    listRef,
    // actions
    onSelection,
    onAction,
    // input handlers
    onInputChangeFromUser,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    // ref attachment
    setReferenceElement,
  };
}
