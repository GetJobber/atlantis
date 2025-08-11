import React, {
  Ref,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FloatingPortal,
  useDismiss,
  useFloating,
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

// Local subcomponents kept inside this file for cohesion
type RenderItem<T extends OptionLike> =
  | { kind: "option"; value: T }
  | { kind: "action"; action: React.ReactNode }
  | {
      kind: "section";
      section: MenuSection<T, Record<string, unknown>, Record<string, unknown>>;
    };

function useComboboxListNav() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, dismiss],
  );

  return {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    activeIndex,
    setActiveIndex,
    listRef,
    open,
    setOpen,
  } as const;
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
  onSelect,
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
  readonly onSelect: (option: T) => void;
  readonly style?: React.CSSProperties;
}) {
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
            <div key={`sec-${index}`} role="presentation" data-index={index}>
              {headerNode}
            </div>
          );
        }

        if (item.kind === "option") {
          const content = renderOption
            ? renderOption(item.value)
            : getOptionLabel(item.value);

          return (
            <div
              key={`opt-${index}`}
              role="option"
              tabIndex={activeIndex === index ? 0 : -1}
              className={
                activeIndex === index ? styles.optionActive : styles.option
              }
              data-index={index}
              {...getItemProps()}
              onClick={() => onSelect(item.value)}
            >
              {content}
            </div>
          );
        }

        return (
          <div
            key={`act-${index}`}
            tabIndex={-1}
            role="presentation"
            className={styles.action}
          >
            {item.action}
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
          action: renderAction ? renderAction(action) : action.label,
        });
      }
    }
  }

  return items;
}

function AutocompleteRebuiltInternal<
  Value extends OptionLike,
  Multiple extends boolean = false,
>(props: AutocompleteProposedProps<Value, Multiple>, _ref: Ref<InputTextRef>) {
  void _ref;
  const {
    menu,
    getOptionLabel,
    isOptionEqualToValue,
    renderOption,
    renderAction,
    renderSection,
    inputValue,
    onInputChange,
    value,
    onChange,
    multiple,
  } = props;

  // Flatten for navigation and typeahead
  const { sections } = useMemo(() => flattenMenu(menu), [menu]);

  // Floating UI wiring (keep input focus; use virtual list navigation)
  const {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    activeIndex,
    listRef,
    open,
    setOpen,
  } = useComboboxListNav();

  const renderable = useMemo(() => {
    const predicate = (opt: Value) =>
      props.filterOptions ? props.filterOptions(opt, inputValue) : true;

    return buildRenderableList(sections, renderAction, predicate);
  }, [sections, renderAction, props.filterOptions, inputValue]);

  // const hasMatch = useMemo(
  //   () => renderable.some(item => item.kind === "option"),
  //   [renderable],
  // );

  // Open on input text; close when cleared
  useEffect(() => {
    const hasText = inputValue.trim().length > 0;
    if (hasText) setOpen(true);
    else setOpen(false);
  }, [inputValue, setOpen]);

  // Selection handler respects single/multiple types
  function selectOption(option: Value) {
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
      // Always reflect explicit selection in the input text
      onInputChange?.(getOptionLabel(option));
    }
  }

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      <InputText
        ref={(node: HTMLInputElement | HTMLTextAreaElement | null) => {
          // Forward DOM element to Floating UI reference (no virtual element)
          refs.setReference((node as unknown as Element) ?? null);
        }}
        version={2}
        value={inputValue}
        onChange={val => onInputChange?.(val)}
        {...getReferenceProps({
          onKeyDown(event) {
            // Arrow keys can open the list per APG guidance
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              if (!open) setOpen(true);
            }
          },
        })}
      />
      {open ? (
        <FloatingPortal>
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
            onSelect={option => {
              selectOption(option);
              setOpen(false);
            }}
            style={floatingStyles}
          />
        </FloatingPortal>
      ) : null}
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
