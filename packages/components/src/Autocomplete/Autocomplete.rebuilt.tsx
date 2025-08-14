import React, {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  UseFloatingReturn,
  UseInteractionsReturn,
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
import {
  AutocompleteProposedProps,
  AutocompleteValue,
  MenuAction,
  MenuItem,
  MenuOptions,
  MenuSection,
  OptionLike,
} from "./Autocomplete.types";
import styles from "./AutocompleteRebuilt.module.css";
import { InputText, InputTextRef } from "../InputText";
import { InputTextRebuiltProps } from "../InputText/InputText.types";
import { calculateMaxHeight } from "../utils/maxHeight";

type RenderItem<T extends OptionLike> =
  | { kind: "option"; value: T }
  | {
      kind: "action";
      content: React.ReactNode;
      onAction: () => void;
      disabled?: boolean;
      shouldClose?: boolean;
    }
  | {
      kind: "section";
      section: MenuSection<T, Record<string, unknown>, Record<string, unknown>>;
    };

const MENU_OFFSET = 8;
// Make this configurable?
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
}

interface UseAutocompleteListNavProps {
  openOnFocus: boolean;
  optionCount: number;
}

function useAutocompleteListNav({
  openOnFocus,
  optionCount,
}: UseAutocompleteListNavProps): UseAutocompleteListNavReturn {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: (nextOpen, event, reason) => {
      setOpen(nextOpen);

      if (reason === "outside-press" || reason === "escape-key") {
        // TODO: invoke onClose or onBlur callback or maybe onDismiss
      }
    },
    middleware: [
      offset(MENU_OFFSET),
      flip({ fallbackPlacements: ["top-start", "bottom-end", "top-end"] }),
      size({
        apply({ availableHeight, elements }) {
          const maxHeight = calculateMaxHeight(availableHeight, {
            maxHeight: AUTOCOMPLETE_MAX_HEIGHT,
          });

          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
          });
        },
      }),
    ],
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    scrollItemIntoView: true,
    onNavigate: setActiveIndex,
    // TODO: make it "real" via roles on actually focusable elements
    virtual: true,
    // Only handle keyboard navigation when the menu is open so the
    // first ArrowDown opens without moving the active index
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

  // When the rendered options change due to filtering, clamp or initialize the index
  useEffect(() => {
    listRef.current.length = optionCount;
    setActiveIndex(prev => {
      if (optionCount <= 0) return null;
      if (prev == null) return 0;

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
  };
}

function MenuList<T extends OptionLike>({
  items,
  activeIndex,
  setNodeRef,
  getItemProps,
  floatingProps,
  renderOption,
  renderSection,
  getOptionLabel,
  getOptionKey,
  onSelect,
  onAction,
  style,
}: {
  readonly items: Array<RenderItem<T>>;
  readonly activeIndex: number | null;
  readonly setNodeRef: (el: HTMLDivElement | null) => void;
  readonly getItemProps: () => Record<string, unknown>;
  readonly floatingProps: Record<string, unknown>;
  readonly renderOption?: (option: T) => React.ReactNode;
  readonly renderSection?: (
    section: MenuSection<T, Record<string, unknown>, Record<string, unknown>>,
  ) => React.ReactNode;
  readonly getOptionLabel: (option: T) => string;
  readonly getOptionKey: (option: T) => React.Key;
  readonly onSelect: (option: T) => void;
  readonly onAction: (action: {
    onAction: () => void;
    disabled?: boolean;
    shouldClose?: boolean;
  }) => void;
  readonly style?: React.CSSProperties;
}) {
  let navigableIndex = -1;

  return (
    <div
      ref={setNodeRef}
      role="listbox"
      className={styles.list}
      style={style}
      {...floatingProps}
    >
      {items.map((item, index) => {
        if (item.kind === "section") {
          let headerNode: React.ReactNode;

          if (renderSection) {
            headerNode = renderSection(item.section);
          } else {
            headerNode = (
              <h4 className={styles.sectionHeader}>
                {String(item.section.label)}
              </h4>
            );
          }

          return (
            <div key={`sec-${index}`} role="presentation">
              {headerNode}
            </div>
          );
        }

        if (item.kind === "option") {
          const content = renderOption
            ? renderOption(item.value)
            : getOptionLabel(item.value);
          navigableIndex += 1;

          return (
            <div
              key={`opt-${getOptionKey(item.value)}`}
              role="option"
              tabIndex={-1}
              className={
                activeIndex === navigableIndex
                  ? styles.optionActive
                  : styles.option
              }
              data-index={navigableIndex}
              data-active={activeIndex === navigableIndex ? true : undefined}
              {...getItemProps()}
              onClick={() => onSelect(item.value)}
            >
              {content}
            </div>
          );
        }

        // action counts as navigable entry
        navigableIndex += 1;

        return (
          <div
            key={`act-${index}`}
            tabIndex={-1}
            role="presentation"
            className={
              activeIndex === navigableIndex
                ? styles.optionActive
                : styles.action
            }
            data-index={navigableIndex}
            data-active={activeIndex === navigableIndex ? true : undefined}
            {...getItemProps()}
            onClick={() => {
              onAction({
                onAction: item.onAction,
                disabled: item.disabled,
                shouldClose: item.shouldClose,
              });
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}

function flattenMenu<Value extends OptionLike>(menu: MenuItem<Value>[]) {
  const optionItems: Value[] = [];
  const sections: Array<MenuSection<Value> | MenuOptions<Value>> = [];

  for (const item of menu) {
    sections.push(item);

    const opts = item.type === "section" ? item.options : item.options;

    optionItems.push(...opts);
  }

  return { optionItems, sections };
}

function buildRenderableList<Value extends OptionLike>(
  sections: Array<MenuSection<Value> | MenuOptions<Value>>,
  renderAction?: (action: MenuAction) => React.ReactNode,
  optionFilter?: (opt: Value) => boolean,
) {
  const items: Array<RenderItem<Value>> = [];

  for (const group of sections) {
    if ((group as MenuSection<Value>).type === "section") {
      items.push({ kind: "section", section: group as MenuSection<Value> });
    }

    // TODO: default + opt-out
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
        items.push({
          kind: "action",
          content: renderAction ? renderAction(action) : action.label,
          onAction: action.onClick,
          disabled: action.disabled,
          shouldClose: action.shouldClose,
        });
      }
    }
  }

  return items;
}

function getNavigableItemAtIndex<Value extends OptionLike>(
  activeIndex: number | null,
  renderable: Array<RenderItem<Value>>,
): RenderItem<Value> | null {
  if (activeIndex == null) return null;
  let navigableIndex = -1;

  for (const item of renderable) {
    if (item.kind === "section") continue;
    navigableIndex += 1;
    if (navigableIndex === activeIndex) return item;
  }

  return null;
}

function findNavigableIndexForValue<Value extends OptionLike>(
  renderable: Array<RenderItem<Value>>,
  equals: (a: Value, b: Value) => boolean,
  selectedValue: Value,
): number | null {
  let navigableIndex = -1;

  for (const item of renderable) {
    if (item.kind === "section") continue;
    navigableIndex += 1;

    if (item.kind === "option" && equals(item.value, selectedValue)) {
      return navigableIndex;
    }
  }

  return null;
}

function selectActiveOptionOnEnter<Value extends OptionLike>(
  event: React.KeyboardEvent,
  activeIndex: number | null,
  renderable: Array<RenderItem<Value>>,
  onSelect: (option: Value) => void,
  onAction: (action: {
    onAction: () => void;
    disabled?: boolean;
    shouldClose?: boolean;
  }) => void,
): void {
  const selected = getNavigableItemAtIndex<Value>(activeIndex, renderable);
  if (!selected) return;
  event.preventDefault();

  if (selected.kind === "option") {
    onSelect(selected.value);
  } else if (selected.kind === "action") {
    onAction({
      onAction: selected.onAction,
      disabled: selected.disabled,
      shouldClose: selected.shouldClose,
    });
  }
}

// eslint-disable-next-line max-statements
function AutocompleteRebuiltInternal<
  Value extends OptionLike,
  Multiple extends boolean = false,
>(props: AutocompleteProposedProps<Value, Multiple>, _ref: Ref<InputTextRef>) {
  void _ref;
  const {
    menu,
    getOptionLabel: getOptionLabelProp,
    getOptionKey: getOptionKeyProp,
    isOptionEqualToValue,
    renderOption,
    renderAction,
    renderSection,
    inputValue,
    onInputChange,
    value,
    onChange,
    multiple,
    placeholder,
    disabled,
    error,
    invalid,
    description,
    size: sizeProp,
    clearable,
    loading,
    renderInput,
    openOnFocus = false,
  } = props;

  const getOptionLabel = useCallback(
    (o: Value) => (getOptionLabelProp ? getOptionLabelProp(o) : o.label),
    [getOptionLabelProp],
  );

  const getOptionKey = useCallback(
    (o: Value) => (getOptionKeyProp ? getOptionKeyProp(o) : getOptionLabel(o)),
    [getOptionKeyProp, getOptionLabel],
  );

  // Flatten for navigation and typeahead
  const { sections, optionItems } = useMemo(() => flattenMenu(menu), [menu]);

  const exactLabelMatch = useMemo(() => {
    const inputEqualsOption = props.inputEqualsOption;
    const equalsInput = inputEqualsOption
      ? (o: Value) => inputEqualsOption(inputValue, o)
      : (o: Value) => getOptionLabel(o) === inputValue;

    return optionItems.some(equalsInput as (o: Value) => boolean);
  }, [optionItems, getOptionLabel, inputValue, props.inputEqualsOption]);

  // Track if the most recent input change was from the user typing
  const lastInputWasUserRef = useRef(false);

  const renderable = useMemo(() => {
    // TODO: add default filter method
    // TODO: add opt-out filter method for consumer to use with async
    const filterMethod = (opt: Value) =>
      // Unfilter only for programmatic matches (selection/prepopulation).
      // If the user typed to get an exact match, still treat it as a search.
      exactLabelMatch && !lastInputWasUserRef.current
        ? true
        : props.filterOptions
        ? props.filterOptions(opt, inputValue)
        : getOptionLabel(opt).toLowerCase().includes(inputValue.toLowerCase());

    return buildRenderableList(sections, renderAction, filterMethod);
  }, [
    sections,
    renderAction,
    props.filterOptions,
    inputValue,
    exactLabelMatch,
  ]);

  const optionCount = useMemo(
    () =>
      renderable.reduce(
        (count, item) => count + (item.kind === "option" ? 1 : 0),
        0,
      ),
    [renderable],
  );

  // Floating UI wiring (keep input focus; use virtual list navigation)
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
  } = useAutocompleteListNav({ openOnFocus, optionCount });

  // const hasMatch = useMemo(
  //   () => renderable.some(item => item.kind === "option"),
  //   [renderable],
  // );

  // Prevent auto-open when we change input programmatically on selection
  const suppressOpenOnInputChangeRef = useRef(false);

  // Open on user typing; close when cleared. Do not auto-open for programmatic
  // input (prepopulation/selection) when openOnFocus is false.
  useEffect(() => {
    if (suppressOpenOnInputChangeRef.current) {
      suppressOpenOnInputChangeRef.current = false;

      return;
    }

    const hasText = inputValue.trim().length > 0;

    if (lastInputWasUserRef.current) {
      setOpen(hasText);
    }
  }, [inputValue, setOpen]);

  function selectOption(option: Value) {
    // TODO: if we have time, implement multiple selection
    if (multiple) {
      const current = (value as AutocompleteValue<Value, true>) ?? [];
      const equals =
        isOptionEqualToValue ??
        ((a: Value, b: Value) => getOptionLabel(a) === getOptionLabel(b));
      const exists = (current as Value[]).some(v => equals(v, option));
      const next = exists
        ? (current as Value[]).filter(v => !equals(v, option))
        : [...(current as Value[]), option];
      onChange(next as AutocompleteValue<Value, Multiple>);
    } else {
      onChange(option as AutocompleteValue<Value, Multiple>);
      // Set flags to prevent auto-open on next input change
      suppressOpenOnInputChangeRef.current = true;
      lastInputWasUserRef.current = false;
      // Always reflect explicit selection in the input text for single-select
      onInputChange?.(getOptionLabel(option));
    }
  }

  // TODO: refactor this to be smaller
  // eslint-disable-next-line max-statements
  function tryCommitFreeFormOnEnter(): boolean {
    if (props.allowFreeForm !== true) return false;
    if (open && activeIndex != null) return false;

    const inputText = inputValue.trim();

    if (inputText.length === 0) return false;

    const inputEqualsOption = props.inputEqualsOption;
    const match = optionItems.find(o =>
      inputEqualsOption
        ? inputEqualsOption(inputText, o)
        : getOptionLabel(o) === inputText,
    );

    if (match) {
      onSelection(match);
    } else {
      setOpen(false);

      // Commit free-form via factory
      const created = props.allowFreeForm
        ? props.createFreeFormValue?.(inputText)
        : undefined;

      if (created) {
        props.onChange(created as AutocompleteValue<Value, Multiple>);
      }
    }

    return true;
  }

  // When opening and the input text exactly matches an option label,
  // move the activeIndex to that selected value
  useEffect(() => {
    if (!open) return;
    if (!exactLabelMatch) return;
    // Do not override navigation if the exact match came from user typing
    if (lastInputWasUserRef.current) return;
    // Only consider single-select's primary value for now
    const selectedValue = multiple
      ? ((value as AutocompleteValue<Value, true>)?.[0] as Value | undefined)
      : (value as Value | undefined);

    if (!selectedValue) return;

    const equals =
      isOptionEqualToValue ??
      ((a: Value, b: Value) => getOptionLabel(a) === getOptionLabel(b));

    const selectedNavigableIndex = findNavigableIndexForValue(
      renderable,
      equals,
      selectedValue,
    );

    if (selectedNavigableIndex != null) {
      setActiveIndex(selectedNavigableIndex);
    }

    // No flag to reset here; behavior is purely derived
  }, [
    open,
    exactLabelMatch,
    multiple,
    value,
    renderable,
    isOptionEqualToValue,
    getOptionLabel,
    setActiveIndex,
  ]);

  const onSelection = useCallback(
    (option: Value) => {
      selectOption(option);
      setOpen(false);
    },
    [selectOption, setOpen],
  );

  const onAction = useCallback(
    (action: {
      onAction: () => void;
      disabled?: boolean;
      shouldClose?: boolean;
    }) => {
      if (action.disabled) return;

      action.onAction();

      if (action.shouldClose !== false) setOpen(false);
    },
    [setOpen],
  );

  const inputProps: InputTextRebuiltProps = {
    version: 2 as const,
    value: inputValue,
    onChange: val => {
      lastInputWasUserRef.current = true;
      onInputChange?.(val);
    },
    // TODO: refactor this to be smaller
    // eslint-disable-next-line max-statements
    onBlur: () => {
      const allowFree = props.allowFreeForm === true;

      if (allowFree) {
        const inputText = inputValue.trim();
        const hasText = inputText.length > 0;

        const inputEqualsOption = props.inputEqualsOption;
        const match = optionItems.find(o =>
          inputEqualsOption
            ? inputEqualsOption(inputText, o)
            : getOptionLabel(o) === inputText,
        );

        if (hasText) {
          if (match) {
            onSelection(match);
          } else {
            setOpen(false);
            const created = props.allowFreeForm
              ? props.createFreeFormValue?.(inputText)
              : undefined;

            if (created) {
              props.onChange(created as AutocompleteValue<Value, Multiple>);
            }
          }
        } else {
          // Empty input: commit only if there was an existing value previously
          // Otherwise, no-op
        }
      }

      props.onBlur?.();
    },
    onFocus: props.onFocus,
    placeholder,
    disabled,
    error: error ?? undefined,
    invalid,
    description,
    // Do we even need size if we allow custom input rendering?
    size: sizeProp === "base" ? undefined : sizeProp,
    clearable: clearable ? "while-editing" : undefined,
    loading,
    ...getReferenceProps({
      onKeyDown(event) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          if (!open) setOpen(true);

          return;
        }

        if (event.key === "Enter") {
          // If menu is closed or there is no active option, support free-form commit
          if (tryCommitFreeFormOnEnter()) {
            event.preventDefault();

            return;
          }

          selectActiveOptionOnEnter<Value>(
            event,
            activeIndex,
            renderable,
            onSelection,
            onAction,
          );
        }
      },
    }),
  };

  // Ref the consumer must attach to their input
  const referenceInputRef: React.Ref<HTMLInputElement | HTMLTextAreaElement> = (
    node: HTMLInputElement | HTMLTextAreaElement | null,
  ) => {
    refs.setReference((node as Element) ?? null);
  };

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      {renderInput ? (
        // Consumer-provided input must attach the ref to the underlying input element
        renderInput({ inputRef: referenceInputRef, inputProps })
      ) : (
        <InputText ref={referenceInputRef} {...inputProps} />
      )}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            // closeOnFocusOut defaults to true; keeping it explicit for clarity
            closeOnFocusOut
          >
            <MenuList<Value>
              items={renderable}
              activeIndex={activeIndex}
              setNodeRef={refs.setFloating}
              floatingProps={getFloatingProps()}
              getItemProps={() =>
                getItemProps({
                  ref(node: HTMLElement | null) {
                    const idx = Number(node?.getAttribute("data-index"));

                    if (!Number.isNaN(idx)) {
                      listRef.current[idx] = node;
                    }
                  },
                })
              }
              renderOption={renderOption}
              renderSection={renderSection}
              getOptionLabel={getOptionLabel}
              getOptionKey={getOptionKey}
              onSelect={onSelection}
              onAction={onAction}
              style={floatingStyles}
            />
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}

export const AutocompleteRebuilt = forwardRef(AutocompleteRebuiltInternal) as <
  Value extends OptionLike = OptionLike,
  Multiple extends boolean = false,
>(
  props: AutocompleteProposedProps<Value, Multiple> & {
    ref?: Ref<InputTextRef>;
  },
) => ReturnType<typeof AutocompleteRebuiltInternal>;
