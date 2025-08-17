import type { Ref } from "react";
import React, { forwardRef } from "react";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import classNames from "classnames";
import type {
  AutocompleteRebuiltProps,
  MenuAction,
  MenuSection,
  OptionLike,
} from "./Autocomplete.types";
import styles from "./AutocompleteRebuilt.module.css";
import { useAutocomplete } from "./useAutocomplete";
import type { RenderItem } from "./useAutocomplete";
import { InputText } from "../InputText";
import type { InputTextRebuiltProps } from "../InputText/InputText.types";
import { Glimmer } from "../Glimmer";
import { mergeRefs } from "../utils/mergeRefs";

function handleSectionRendering<T extends OptionLike>({
  renderSection,
  section,
  index,
}: {
  readonly section: MenuSection<T>;
  readonly renderSection?: AutocompleteRebuiltProps<T, false>["renderSection"];
  readonly index: number;
}) {
  const headerContent = renderSection ? (
    renderSection(section)
  ) : (
    <h4 className={styles.sectionHeader}>{String(section.label)}</h4>
  );

  return (
    <div
      key={`sec-${index}`}
      role="presentation"
      data-testid="ATL-AutocompleteRebuilt-Section"
    >
      {headerContent}
    </div>
  );
}

interface HandleOptionRenderingProps<T extends OptionLike> {
  readonly option: T;
  readonly activeIndex: number | null;
  readonly navigableIndex: number;
  readonly getItemProps: () => Record<string, unknown>;
  readonly isOptionSelected: (option: T) => boolean;
  readonly renderOption?: AutocompleteRebuiltProps<T, false>["renderOption"];
  readonly getOptionLabel: (option: T) => string;
  readonly getOptionKey: (option: T) => React.Key;
  readonly onSelect: (option: T) => void;
}

function handleOptionRendering<T extends OptionLike>({
  option,
  activeIndex,
  navigableIndex,
  getItemProps,
  isOptionSelected,
  renderOption,
  getOptionLabel,
  getOptionKey,
  onSelect,
}: HandleOptionRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === nextNavigableIndex;
  const isSelected = isOptionSelected(option);
  const optionContent = renderOption
    ? renderOption({ value: option, isActive, isSelected })
    : getOptionLabel(option);

  return {
    node: (
      <div
        key={`opt-${getOptionKey(option)}`}
        role="option"
        tabIndex={-1}
        // TODO selected attrs
        className={isActive ? styles.optionActive : styles.option}
        data-index={nextNavigableIndex}
        data-active={isActive ? true : undefined}
        {...getItemProps()}
        onClick={() => onSelect(option)}
      >
        {optionContent}
      </div>
    ),
    nextNavigableIndex,
  };
}

interface HandleActionRenderingProps<T extends OptionLike> {
  readonly action: MenuAction<Record<string, unknown>>;
  readonly index: number;
  readonly activeIndex: number | null;
  readonly navigableIndex: number;
  readonly getItemProps: () => Record<string, unknown>;
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  // TODO: rename this onAction -> onAction is awkward
  readonly onAction: (action: {
    onAction: () => void;
    disabled?: boolean;
    shouldClose?: boolean;
  }) => void;
}

function handleActionRendering<T extends OptionLike>({
  action,
  index,
  activeIndex,
  navigableIndex,
  getItemProps,
  renderAction,
  onAction,
}: HandleActionRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === nextNavigableIndex;
  const actionContent = renderAction
    ? renderAction({ value: action, isActive })
    : action.label;

  // TODO: disabled style
  return {
    node: (
      <div
        key={`act-${index}`}
        tabIndex={-1}
        role="button"
        className={isActive ? styles.optionActive : styles.action}
        data-index={nextNavigableIndex}
        data-active={isActive ? true : undefined}
        {...getItemProps()}
        // TODO: rename this onAction -> onAction is awkward
        onClick={() => {
          onAction({
            onAction: action.onClick,
            disabled: action.disabled,
            shouldClose: action.shouldClose,
          });
        }}
      >
        {actionContent}
      </div>
    ),
    nextNavigableIndex,
  };
}

interface MenuListProps<T extends OptionLike> {
  readonly items: Array<RenderItem<T>>;
  readonly activeIndex: number | null;
  readonly setNodeRef: (el: HTMLDivElement | null) => void;
  readonly getItemProps: () => Record<string, unknown>;
  readonly floatingProps: Record<string, unknown>;
  readonly renderOption?: AutocompleteRebuiltProps<T, false>["renderOption"];
  readonly renderSection?: AutocompleteRebuiltProps<T, false>["renderSection"];
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  readonly getOptionLabel: (option: T) => string;
  readonly getOptionKey: (option: T) => React.Key;
  readonly onSelect: (option: T) => void;
  readonly onAction: (action: {
    onAction: () => void;
    disabled?: boolean;
    shouldClose?: boolean;
  }) => void;
  readonly isOptionSelected: (option: T) => boolean;
  readonly style?: React.CSSProperties;
}

function MenuList<T extends OptionLike>({
  items,
  activeIndex,
  setNodeRef,
  getItemProps,
  floatingProps,
  renderOption,
  renderSection,
  renderAction,
  getOptionLabel,
  getOptionKey,
  onSelect,
  onAction,
  isOptionSelected,
  style,
}: MenuListProps<T>) {
  let navigableIndex = -1;

  function renderItemNode(item: RenderItem<T>, index: number) {
    if (item.kind === "section") {
      return handleSectionRendering<T>({
        section: item.section,
        index,
        renderSection,
      });
    }

    if (item.kind === "option") {
      const result = handleOptionRendering<T>({
        option: item.value,
        activeIndex,
        navigableIndex,
        getItemProps,
        isOptionSelected,
        renderOption,
        getOptionLabel,
        getOptionKey,
        onSelect,
      });

      navigableIndex = result.nextNavigableIndex;

      return result.node;
    }

    const result = handleActionRendering<T>({
      action: item.action,
      index,
      activeIndex,
      navigableIndex,
      getItemProps,
      renderAction,
      onAction,
    });

    navigableIndex = result.nextNavigableIndex;

    return result.node;
  }

  return (
    <div
      ref={setNodeRef}
      role="listbox"
      // We have this elsewhere too
      className={styles.list}
      style={style}
      {...floatingProps}
    >
      {items.map(renderItemNode)}
    </div>
  );
}

function AutocompleteRebuiltInternal<
  Value extends OptionLike,
  Multiple extends boolean = false,
>(
  props: AutocompleteRebuiltProps<Value, Multiple>,
  forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const {
    renderOption,
    renderAction,
    renderSection,
    inputValue,
    placeholder,
    disabled,
    error,
    invalid,
    description,
    size: sizeProp,
    clearable,
    loading = false,
    renderInput,
  } = props;

  const {
    renderable,
    optionCount,
    getOptionLabel,
    getOptionKey,
    isOptionSelected,
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    open,
    activeIndex,
    listRef,
    onSelection,
    onAction,
    onInputChangeFromUser,
    onInputBlur,
    onInputKeyDown,
    setReferenceElement,
  } = useAutocomplete<Value, Multiple>(props);

  const inputProps: InputTextRebuiltProps = {
    version: 2 as const,
    value: inputValue,
    onChange: onInputChangeFromUser,
    onBlur: onInputBlur,
    onFocus: props.onFocus,
    placeholder,
    disabled,
    error: error ?? undefined,
    invalid,
    description,
    size: sizeProp === "base" ? undefined : sizeProp,
    clearable: clearable ? "while-editing" : undefined,
    ...getReferenceProps({ onKeyDown: onInputKeyDown }),
  };

  const referenceInputRef: React.Ref<HTMLInputElement | HTMLTextAreaElement> = (
    node: HTMLInputElement | HTMLTextAreaElement | null,
  ) => {
    setReferenceElement(node as HTMLElement | null);
  };

  const mergedInputRef = mergeRefs<HTMLInputElement | HTMLTextAreaElement>([
    referenceInputRef,
    forwardedRef,
  ]);

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      {renderInput ? (
        renderInput({ inputRef: mergedInputRef, inputProps })
      ) : (
        <InputText ref={mergedInputRef} {...inputProps} />
      )}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            closeOnFocusOut
          >
            {loading ? (
              // TODO: I don't love that we have 3x listbox/floatingStyles - consolidate them
              <div
                ref={refs.setFloating}
                role="listbox"
                className={classNames(styles.list, styles.loadingList)}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <Glimmer shape="rectangle" size="largest" />
                <Glimmer shape="rectangle" size="largest" />
                <Glimmer shape="rectangle" size="largest" />
              </div>
            ) : optionCount === 0 ? (
              <div
                ref={refs.setFloating}
                role="listbox"
                className={styles.list}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div className={styles.emptyStateMessage}>
                  {props.emptyState ?? "No options"}
                </div>
              </div>
            ) : (
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
                renderAction={renderAction}
                getOptionLabel={getOptionLabel}
                getOptionKey={getOptionKey}
                onSelect={onSelection}
                onAction={onAction}
                isOptionSelected={isOptionSelected}
                style={floatingStyles}
              />
            )}
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
  props: AutocompleteRebuiltProps<Value, Multiple> & {
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  },
) => ReturnType<typeof AutocompleteRebuiltInternal>;
