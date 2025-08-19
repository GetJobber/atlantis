import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  UseFloatingReturn,
  UseInteractionsReturn,
} from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
} from "@floating-ui/react";
import { tokens } from "@jobber/design";
import type {
  ActionConfig,
  AutocompleteRebuiltProps,
  AutocompleteValue,
  MenuAction,
  MenuItem,
  MenuOptions,
  MenuSection,
  OptionLike,
} from "./Autocomplete.types";
import { calculateMaxHeight } from "../utils/maxHeight";

export type RenderItem<
  T extends OptionLike,
  S extends object = Record<string, unknown>,
  A extends object = Record<string, unknown>,
> =
  | { kind: "option"; value: T }
  | { kind: "action"; action: MenuAction<A> }
  | { kind: "section"; section: MenuSection<T, S, A> };

const MENU_OFFSET = tokens["space-small"];
// Maybe make this configurable?
const AUTOCOMPLETE_MAX_HEIGHT = 300;

interface UseAutocompleteListNavReturn {
  refs: UseFloatingReturn["refs"];
  floatingStyles: UseFloatingReturn["context"]["floatingStyles"];
  context: UseFloatingReturn["context"];
  getReferenceProps: UseInteractionsReturn["getReferenceProps"];
  getFloatingProps: UseInteractionsReturn["getFloatingProps"];
  getItemProps: UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  open: boolean;
  setOpen: (open: boolean) => void;
  setReferenceElement: (el: HTMLElement | null) => void;
}

interface UseAutocompleteListNavProps {
  openOnFocus: boolean;
  optionCount: number;
  shouldResetActiveIndexOnClose?: () => boolean;
  onMenuClose?: (reason?: string) => void;
}

function useAutocompleteListNav({
  openOnFocus,
  optionCount,
  shouldResetActiveIndexOnClose,
  onMenuClose,
}: UseAutocompleteListNavProps): UseAutocompleteListNavReturn {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    open,
    elements: { reference: referenceEl },
    onOpenChange: (isOpen, _event, reason) => {
      setOpen(isOpen);

      if (isOpen === false) {
        if (shouldResetActiveIndexOnClose?.()) {
          setActiveIndex(null);
        }
        onMenuClose?.(String(reason ?? ""));
      }
    },
    middleware: [
      offset(MENU_OFFSET),
      flip({ fallbackPlacements: ["top-start", "bottom-end", "top-end"] }),
      size({
        apply({ availableHeight, elements, rects }) {
          const maxHeight = calculateMaxHeight(availableHeight, {
            maxHeight: AUTOCOMPLETE_MAX_HEIGHT,
          });

          const referenceWidth = rects.reference.width;

          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
            width: `${referenceWidth}px`,
            minWidth: `${referenceWidth}px`,
          });
        },
      }),
    ],
  });

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    scrollItemIntoView: true,
    loop: true,
    onNavigate: setActiveIndex,
    virtual: true,
    enabled: open,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
    outsidePressEvent: "click",
  });

  const focus = useFocus(context, {
    enabled: openOnFocus,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, dismiss, focus],
  );

  useEffect(() => {
    listRef.current.length = optionCount;

    setActiveIndex(prev => {
      if (optionCount <= 0) return null;
      if (prev == null) return null;

      return prev >= optionCount ? optionCount - 1 : prev;
    });
  }, [optionCount, setActiveIndex]);

  return {
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
    setReferenceElement: setReferenceEl,
  };
}

function flattenMenu<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(menu: MenuItem<Value, S, A>[]) {
  const optionItems: Value[] = [];
  const sections: Array<MenuSection<Value, S, A> | MenuOptions<Value, A>> = [];

  for (const item of menu) {
    sections.push(item);

    const opts = item.type === "section" ? item.options : item.options;

    optionItems.push(...opts);
  }

  return { optionItems, sections };
}

function buildRenderableList<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  sections: Array<MenuSection<Value, S, A> | MenuOptions<Value, A>>,
  optionFilter?: (opt: Value) => boolean,
) {
  const items: Array<RenderItem<Value, S, A>> = [];

  for (const group of sections) {
    if ((group as MenuSection<Value, S, A>).type === "section") {
      items.push({
        kind: "section",
        section: group as MenuSection<Value, S, A>,
      });
    }

    const filtered = optionFilter
      ? group.options.filter(optionFilter)
      : group.options;
    const options = filtered.map(o => ({
      kind: "option" as const,
      value: o,
    }));

    items.push(...options);

    if (group.actionsBottom?.length) {
      for (const action of group.actionsBottom) {
        items.push({ kind: "action", action: action as MenuAction<A> });
      }
    }
  }

  return items;
}

function getNavigableItemAtIndex<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  activeIndex: number | null,
  renderable: Array<RenderItem<Value, S, A>>,
): RenderItem<Value, S, A> | null {
  if (activeIndex == null) return null;

  let navigableIndex = -1;

  for (const item of renderable) {
    // Ignore sections
    if (item.kind === "section") continue;

    navigableIndex += 1;

    if (navigableIndex === activeIndex) return item;
  }

  return null;
}

function findNavigableIndexForValue<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  renderable: Array<RenderItem<Value, S, A>>,
  equals: (a: Value, b: Value) => boolean,
  selectedValue: Value,
): number | null {
  let navigableIndex = -1;

  for (const item of renderable) {
    // Ignore sections
    if (item.kind === "section") continue;

    navigableIndex += 1;

    if (item.kind === "option" && equals(item.value, selectedValue)) {
      return navigableIndex;
    }
  }

  return null;
}

function invokeActiveItemOnEnter<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  event: React.KeyboardEvent,
  activeIndex: number | null,
  renderable: Array<RenderItem<Value, S, A>>,
  onSelect: (option: Value) => void,
  onAction: (action: ActionConfig) => void,
): void {
  const activeItem = getNavigableItemAtIndex<Value, S, A>(
    activeIndex,
    renderable,
  );

  if (!activeItem) return;

  event.preventDefault();

  if (activeItem.kind === "option") {
    onSelect(activeItem.value);
  } else if (activeItem.kind === "action") {
    onAction({
      run: activeItem.action.onClick,
      closeOnRun: activeItem.action.shouldClose,
    });
  }
}

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
    openOnFocus = false,
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

  const { sections, optionItems } = useMemo(
    () => flattenMenu<Value, SectionExtra, ActionExtra>(menu),
    [menu],
  );
  // inputValue changes very often, is this worth memoizing?
  const exactLabelMatch = useMemo(() => {
    const inputEqualsOption = props.inputEqualsOption;
    const equalsInput = inputEqualsOption
      ? (o: Value) => inputEqualsOption(inputValue, o)
      : (o: Value) => getOptionLabel(o) === inputValue;

    return optionItems.some(equalsInput as (o: Value) => boolean);
  }, [optionItems, getOptionLabel, inputValue, props.inputEqualsOption]);

  const lastInputWasUser = useRef(false);

  // This includes options, actions, and sections
  const renderable = useMemo(() => {
    const filterMethod = (opt: Value) => {
      if (exactLabelMatch && !lastInputWasUser.current) return true;
      if (props.filterOptions === false) return true;

      if (typeof props.filterOptions === "function") {
        return props.filterOptions(opt, inputValue);
      }

      // Default to case-insensitive includes
      return getOptionLabel(opt)
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    };

    return buildRenderableList<Value, SectionExtra, ActionExtra>(
      sections,
      filterMethod,
    );
  }, [
    sections,
    props.filterOptions,
    inputValue,
    exactLabelMatch,
    getOptionLabel,
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

  // Very similar to isOptionSelected...
  const hasSelection = useMemo(() => {
    if (multiple) {
      const current = (value as AutocompleteValue<Value, true>) ?? [];

      return Array.isArray(current) && current.length > 0;
    }

    return (value as Value | undefined) != null;
  }, [multiple, value]);

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
    openOnFocus,
    optionCount,
    shouldResetActiveIndexOnClose: () => !hasSelection,
    onMenuClose: () => {
      if (props.allowFreeForm !== true) {
        const hasText = inputValue.trim().length > 0;

        if (hasText && !hasSelection) {
          // ~3/4 lines of this is repeated elsewhere
          // Maybe make a single close helpr function
          suppressOpenOnInputChange.current = true;
          lastInputWasUser.current = false;

          onInputChange?.("");
          setActiveIndex(null);
        }
      }
    },
  });

  const suppressOpenOnInputChange = useRef(false);

  useEffect(() => {
    if (suppressOpenOnInputChange.current) {
      suppressOpenOnInputChange.current = false;

      return;
    }

    const hasText = inputValue.trim().length > 0;

    if (lastInputWasUser.current) {
      setOpen(hasText);
    }

    if (!hasText) {
      if (hasSelection) {
        onChange?.(undefined as AutocompleteValue<Value, Multiple>);
        setActiveIndex(null);
      } else {
        setActiveIndex(null);
      }
    }
  }, [inputValue, setOpen, hasSelection, setActiveIndex, onChange]);

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

  useEffect(() => {
    if (!open) return;
    if (!exactLabelMatch) return;
    if (lastInputWasUser.current) return;

    const selectedValue = multiple
      ? ((value as AutocompleteValue<Value, true>)?.[0] as Value | undefined)
      : (value as Value | undefined);

    if (!selectedValue) return;

    const selectedNavigableIndex = findNavigableIndexForValue(
      renderable,
      equals,
      selectedValue,
    );

    if (selectedNavigableIndex != null) {
      setActiveIndex(selectedNavigableIndex);
    }
  }, [
    open,
    exactLabelMatch,
    multiple,
    value,
    renderable,
    equals,
    setActiveIndex,
  ]);

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

  const onInputBlur = useCallback(() => {
    const allowFreeForm = props.allowFreeForm === true;

    if (allowFreeForm) {
      const inputText = inputValue.trim();
      const hasText = inputText.length > 0;

      if (hasText) {
        commitFromInputText(inputText);
      }
    }
    props.onBlur?.();
  }, [props.allowFreeForm, inputValue, props.onBlur]);

  function handleArrowNavigation(key: string, event: React.KeyboardEvent) {
    if (!open) {
      setOpen(true);

      return;
    }

    if (activeIndex == null) {
      setActiveIndex(
        key === "ArrowDown" ? 0 : optionCount > 0 ? optionCount - 1 : null,
      );
      event.preventDefault();
    }
  }

  function handleEnterKey(event: React.KeyboardEvent) {
    if (tryCommitFreeFormOnEnter()) {
      event.preventDefault();

      return;
    }

    if (!open) return;

    invokeActiveItemOnEnter<Value, SectionExtra, ActionExtra>(
      event,
      activeIndex,
      renderable,
      onSelection,
      onAction,
    );
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
    [
      open,
      setOpen,
      activeIndex,
      setActiveIndex,
      optionCount,
      renderable,
      onSelection,
      onAction,
    ],
  );

  const onInputChangeFromUser = useCallback(
    (val: string) => {
      lastInputWasUser.current = true;
      // Reset highlight on additions to the search term

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
    getOptionLabel,
    getOptionKey,
    getActionKey,
    getSectionKey,
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
    onInputKeyDown,
    // ref attachment
    setReferenceElement,
  };
}
