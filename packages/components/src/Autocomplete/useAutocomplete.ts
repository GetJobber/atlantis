import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCallbackRef, useDebounce } from "@jobber/hooks";
import type {
  ActionConfig,
  ActionOrigin,
  AutocompleteRebuiltProps,
  AutocompleteValue,
  MenuAction,
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
    isOptionEqualToValue,
    inputValue,
    onInputChange,
    value,
    onChange,
    multiple,
    openOnFocus = true,
    readOnly = false,
    debounce: debounceMs = 300,
  } = props;

  const isHandlingMenuInteractionRef = useRef(false);

  // TODO: Clean up the types in these refs by enhancing the type system in useCallbackRef
  const getOptionLabelPropRef = useCallbackRef((opt: unknown) =>
    (getOptionLabelProp as ((o: Value) => string) | undefined)?.(opt as Value),
  );

  const getOptionLabel = useCallback(
    (opt: Value): string => {
      const maybe = getOptionLabelPropRef(opt) as string | undefined;

      return maybe ?? opt.label;
    },
    [getOptionLabelPropRef],
  );

  const isOptionEqualToValueRef = useCallbackRef((a: unknown, b: unknown) =>
    (isOptionEqualToValue as ((x: Value, y: Value) => boolean) | undefined)?.(
      a as Value,
      b as Value,
    ),
  );

  const equals = useCallback(
    (a: Value, b: Value): boolean => {
      const custom = isOptionEqualToValueRef(a, b) as boolean | undefined;

      return custom != null ? custom : getOptionLabel(a) === getOptionLabel(b);
    },
    [isOptionEqualToValueRef, getOptionLabel],
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

  // Stable wrappers for function props
  const inputEqualsOptionRef = useCallbackRef((text: unknown, o: unknown) => {
    const fn = props.inputEqualsOption as
      | ((t: string, v: Value) => boolean)
      | undefined;

    return fn ? fn(text as string, o as Value) : undefined;
  });

  const inputEquals = useCallback(
    (text: string, o: Value): boolean => {
      const custom = inputEqualsOptionRef(text, o) as boolean | undefined;

      return custom != null ? custom : getOptionLabel(o) === text;
    },
    [inputEqualsOptionRef, getOptionLabel],
  );

  // inputValue changes very often, is this worth memoizing?
  const exactLabelMatch = useMemo(() => {
    return optionItems.some(o => inputEquals(inputValue, o));
  }, [optionItems, inputEquals, inputValue]);

  const lastInputWasUser = useRef(false);

  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);
  const debouncedSetter = useDebounce(setDebouncedInputValue, debounceMs);

  useEffect(() => {
    // Skip debounce when clearing input for immediate feedback, preventing flickering of last selected item
    if (debounceMs === 0 || inputValue === "") {
      setDebouncedInputValue(inputValue);

      return;
    }
    debouncedSetter(inputValue);
  }, [inputValue, debounceMs, debouncedSetter]);

  const filterOptionsRef = useCallbackRef((opts: unknown, term: unknown) => {
    const fn =
      (typeof props.filterOptions === "function"
        ? (props.filterOptions as (opts: Value[], term: string) => Value[])
        : undefined) || undefined;

    return fn ? fn(opts as Value[], term as string) : undefined;
  });

  const applyFilter = useCallback(
    (opts: Value[], term: string): Value[] => {
      if (props.filterOptions === false) return opts;

      const override = filterOptionsRef(opts, term) as Value[] | undefined;
      if (override) return override;

      const lowered = term.toLowerCase();

      return opts.filter(opt =>
        getOptionLabel(opt).toLowerCase().includes(lowered),
      );
    },
    [props.filterOptions, filterOptionsRef, getOptionLabel],
  );

  const renderable = useMemo(() => {
    const filter = (opts: Value[]): Value[] => {
      if (exactLabelMatch && !lastInputWasUser.current) return opts;

      return applyFilter(opts, debouncedInputValue);
    };

    const items = buildRenderableList<Value, SectionExtra, ActionExtra>(
      sections,
      filter,
    );

    const hasAnyOptions = items.some(i => i.kind === "option");

    if (!hasAnyOptions) {
      if (emptyActions) {
        const derived: MenuAction<ActionExtra>[] =
          typeof emptyActions === "function"
            ? emptyActions({ inputValue })
            : emptyActions;

        return derived.map<RenderItem<Value, SectionExtra, ActionExtra>>(
          act => ({
            kind: "action",
            action: act,
            origin: "empty",
          }),
        );
      }

      // No options and no emptyActions: render empty state
      return [];
    }

    return items;
  }, [
    sections,
    applyFilter,
    debouncedInputValue,
    exactLabelMatch,
    emptyActions,
    inputValue,
  ]);

  // This is only options
  const optionCount = renderable.reduce(
    (count, item) => count + (item.kind === "option" ? 1 : 0),
    0,
  );

  const hasSelection = useMemo(() => {
    if (multiple) {
      const current = (value as AutocompleteValue<Value, true>) ?? [];

      return Array.isArray(current) && current.length > 0;
    }

    return (value as Value | undefined) != null;
  }, [multiple, value]);

  const headerInteractivePersistents = persistentsHeaders.filter(p =>
    Boolean(p.onClick),
  );
  const footerInteractivePersistents = persistentsFooters.filter(p =>
    Boolean(p.onClick),
  );

  const mainNavigableCount = renderable.reduce(
    (c, i) => c + (i.kind === "section" ? 0 : 1),
    0,
  );

  const totalNavigableCount =
    headerInteractivePersistents.length +
    mainNavigableCount +
    footerInteractivePersistents.length;

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

    return headerInteractivePersistents.length + middleIndex;
  }, [
    multiple,
    value,
    renderable,
    equals,
    headerInteractivePersistents.length,
  ]);

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
    navigableCount: totalNavigableCount,
    shouldResetActiveIndexOnClose: () => !hasSelection,
    selectedIndex,
    readOnly,
    onMenuClose: () => {
      if (props.allowFreeForm !== true) {
        const hasText = inputValue.trim().length > 0;

        if (hasText && !hasSelection) {
          lastInputWasUser.current = false;

          onInputChange?.("");
          setActiveIndex(null);
        }
      }
    },
  });

  // Handles activeIndex reset and, in single-select mode only, clearing selection when input is empty
  useEffect(() => {
    const hasText = inputValue.trim().length > 0;

    if (hasText) return;

    // Always reset highlight when input is empty
    setActiveIndex(null);

    // In multiple mode, clearing the input should NOT clear the selection
    if (multiple) return;

    // For single-select, treat clearing input as clearing the selection
    if (hasSelection) {
      onChange?.(undefined as AutocompleteValue<Value, Multiple>);
    }
  }, [inputValue, multiple, hasSelection, setActiveIndex, onChange, open]);

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

      (refs.domReference.current as HTMLElement | null)?.focus();
    },
    [selectOption, setOpen, refs.domReference],
  );

  const onAction = useCallback(
    (action: ActionConfig) => {
      action.run();

      setActiveIndex(null);

      if (action.closeOnRun !== false) setOpen(false);

      (refs.domReference.current as HTMLElement | null)?.focus();
    },
    [setOpen, setActiveIndex, refs.domReference],
  );

  /**
   * Handler for mousedown on interactive menu items (options/actions)
   * Prevents default to avoid blur and sets flag for focus management
   */
  const onInteractionPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    // Set flag to prevent blur/focus handlers from interfering
    isHandlingMenuInteractionRef.current = true;
  }, []);

  function commitFromInputText(inputText: string): boolean {
    if (inputText.length === 0) return false;

    const match = optionItems.find(o => inputEquals(inputText, o));

    if (match) {
      onSelection(match);

      return true;
    }

    setOpen(false);

    if (props.allowFreeForm !== true) return false;

    const freeFormCreated = props.createFreeFormValue?.(inputText);

    if (!freeFormCreated) return false;

    props.onChange(freeFormCreated as AutocompleteValue<Value, Multiple>);

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

  const onInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!readOnly && openOnFocus && !isHandlingMenuInteractionRef.current) {
        setOpen(true);
      }

      // Only call user's onFocus for genuine focus events, not programmatic restorations
      if (!isHandlingMenuInteractionRef.current) {
        props.onFocus?.(event);
      }

      isHandlingMenuInteractionRef.current = false;
    },
    [props.onFocus, readOnly, openOnFocus, setOpen],
  );

  const onInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isHandlingMenuInteractionRef.current) {
        return;
      }

      if (readOnly) {
        props.onBlur?.(event);

        return;
      }

      if (props.allowFreeForm === true) {
        const inputText = inputValue.trim();
        if (inputText.length > 0) commitFromInputText(inputText);
      } else {
        tryRestoreInputToSelectedLabel();
      }

      lastInputWasUser.current = false;

      props.onBlur?.(event);
    },
    [
      readOnly,
      props.allowFreeForm,
      inputValue,
      props.onBlur,
      tryRestoreInputToSelectedLabel,
      setOpen,
    ],
  );

  function getRegionByActiveIndex(index: number): {
    region: "header" | "middle" | "footer";
    regionIndex: number;
  } {
    const headerCount = headerInteractivePersistents.length;
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
    if (footerInteractivePersistents.length > 0) {
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
      return headerInteractivePersistents.length + lastOptionIdx;
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
        ? headerInteractivePersistents[regionIndex]
        : footerInteractivePersistents[regionIndex];

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

      // Important: update open state before propagating the change so that downstream effects
      // don't see an intermediate state where inputValue changed but open was stale
      if (!readOnly) {
        const hasText = val.trim().length > 0;
        const mustSelectFromOptions = hasText && !props.allowFreeForm;
        const keepOpenOnEmpty = openOnFocus;

        setOpen(mustSelectFromOptions || keepOpenOnEmpty);
      }

      onInputChange?.(val);
    },
    [
      onInputChange,
      inputValue,
      setActiveIndex,
      readOnly,
      props.allowFreeForm,
      openOnFocus,
      setOpen,
    ],
  );

  return {
    // rendering data
    renderable,
    optionCount,
    persistentsHeaders,
    persistentsFooters,
    headerInteractiveCount: headerInteractivePersistents.length,
    middleNavigableCount: mainNavigableCount,
    getOptionLabel,
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
    onInteractionPointerDown,
    // input handlers
    onInputChangeFromUser,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    // ref attachment
    setReferenceElement,
  };
}
