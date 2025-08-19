import type { Ref } from "react";
import React, { forwardRef } from "react";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import classNames from "classnames";
import type {
  ActionConfig,
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
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

export const AutocompleteRebuilt = forwardRef(AutocompleteRebuiltInternal) as <
  Value extends OptionLike = OptionLike,
  Multiple extends boolean = false,
>(
  props: AutocompleteRebuiltProps<Value, Multiple> & {
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  },
) => ReturnType<typeof AutocompleteRebuiltInternal>;

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
    onInputFocus,
    onInputKeyDown,
    setReferenceElement,
  } = useAutocomplete<Value, Multiple>(props);

  const inputProps: InputTextRebuiltProps = {
    version: 2 as const,
    value: inputValue,
    onChange: props.readOnly ? undefined : onInputChangeFromUser,
    onBlur: onInputBlur,
    onFocus: onInputFocus,
    placeholder,
    disabled,
    readOnly: props.readOnly,
    error: error ?? undefined,
    name: props.name,
    invalid,
    description,
    size: sizeProp === "base" ? undefined : sizeProp,
    clearable: clearable ? "while-editing" : undefined,
    ...(!props.readOnly
      ? getReferenceProps({ onKeyDown: onInputKeyDown })
      : {}),
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

  const menuClassName = classNames(
    styles.list,
    loading && styles.loadingList,
    props.UNSAFE_className?.menu,
  );

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      {renderInput ? (
        renderInput({ inputRef: mergedInputRef, inputProps })
      ) : (
        <InputText ref={mergedInputRef} {...inputProps} />
      )}
      {open && !props.readOnly && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            closeOnFocusOut
          >
            <div
              ref={refs.setFloating}
              role="listbox"
              className={menuClassName}
              style={{
                ...floatingStyles,
                ...props.UNSAFE_styles?.menu,
              }}
              {...getFloatingProps()}
            >
              {loading ? (
                <AutocompleteLoadingContent />
              ) : optionCount === 0 ? (
                <AutocompleteEmptyStateContent emptyState={props.emptyState} />
              ) : (
                <MenuList<Value>
                  items={renderable}
                  activeIndex={activeIndex}
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
                  getActionKey={action => action.label}
                  getSectionKey={section => section.label}
                  onSelect={onSelection}
                  onAction={onAction}
                  isOptionSelected={isOptionSelected}
                  slotOverrides={{
                    option: {
                      className: props.UNSAFE_className?.option,
                      style: props.UNSAFE_styles?.option,
                    },
                    action: {
                      className: props.UNSAFE_className?.action,
                      style: props.UNSAFE_styles?.action,
                    },
                    section: {
                      className: props.UNSAFE_className?.section,
                      style: props.UNSAFE_styles?.section,
                    },
                  }}
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}

function AutocompleteLoadingContent() {
  return (
    <>
      <Glimmer shape="rectangle" size="largest" />
      <Glimmer shape="rectangle" size="largest" />
      <Glimmer shape="rectangle" size="largest" />
    </>
  );
}

function AutocompleteEmptyStateContent({
  emptyState,
}: {
  readonly emptyState: React.ReactNode;
}) {
  const emptyStateDefault = "No options";
  const emptyStateContent = emptyState ?? emptyStateDefault;

  return <div className={styles.emptyStateMessage}>{emptyStateContent}</div>;
}

interface MenuListProps<T extends OptionLike> {
  readonly items: Array<RenderItem<T>>;
  readonly activeIndex: number | null;
  readonly getItemProps: () => Record<string, unknown>;
  readonly renderOption?: AutocompleteRebuiltProps<T, false>["renderOption"];
  readonly renderSection?: AutocompleteRebuiltProps<T, false>["renderSection"];
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  readonly getOptionLabel: (option: T) => string;
  readonly getOptionKey: (option: T) => React.Key;
  readonly getActionKey: (
    action: MenuAction<Record<string, unknown>>,
  ) => React.Key;
  readonly getSectionKey: (
    section: MenuSection<T, Record<string, unknown>, Record<string, unknown>>,
  ) => React.Key;
  readonly onSelect: (option: T) => void;
  readonly onAction: (action: ActionConfig) => void;
  readonly isOptionSelected: (option: T) => boolean;
  readonly slotOverrides?: {
    option?: { className?: string; style?: React.CSSProperties };
    action?: { className?: string; style?: React.CSSProperties };
    section?: { className?: string; style?: React.CSSProperties };
  };
}

function MenuList<T extends OptionLike>({
  items,
  activeIndex,
  getItemProps,
  renderOption,
  renderSection,
  renderAction,
  getOptionLabel,
  getOptionKey,
  getActionKey,
  getSectionKey,
  onSelect,
  onAction,
  isOptionSelected,
  slotOverrides,
}: MenuListProps<T>) {
  let navigableIndex = -1;

  function renderItemNode(item: RenderItem<T>, index: number) {
    if (item.kind === "section") {
      return handleSectionRendering<T>({
        section: item.section,
        index,
        renderSection,
        getSectionKey,
        sectionClassName: slotOverrides?.section?.className,
        sectionStyle: slotOverrides?.section?.style,
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
        optionClassName: slotOverrides?.option?.className,
        optionStyle: slotOverrides?.option?.style,
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
      getActionKey,
      onAction,
      actionClassName: slotOverrides?.action?.className,
      actionStyle: slotOverrides?.action?.style,
    });

    navigableIndex = result.nextNavigableIndex;

    return result.node;
  }

  return <>{items.map(renderItemNode)}</>;
}

function handleSectionRendering<T extends OptionLike>({
  renderSection,
  section,
  index,
  getSectionKey,
  sectionClassName,
  sectionStyle,
}: {
  readonly section: MenuSection<T>;
  readonly renderSection?: AutocompleteRebuiltProps<T, false>["renderSection"];
  readonly index: number;
  readonly getSectionKey: (
    section: MenuSection<T, Record<string, unknown>, Record<string, unknown>>,
  ) => React.Key;
  readonly sectionClassName?: string;
  readonly sectionStyle?: React.CSSProperties;
}) {
  const headerContent = renderSection ? (
    renderSection(section)
  ) : (
    <Heading level={5}>{section.label}</Heading>
  );

  return (
    <div
      key={`sec-${getSectionKey(section)}-${index}`}
      role="presentation"
      data-testid="ATL-AutocompleteRebuilt-Section"
      className={classNames(styles.section, styles.stickyTop, sectionClassName)}
      style={sectionStyle}
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
  readonly optionClassName?: string;
  readonly optionStyle?: React.CSSProperties;
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
  optionClassName,
  optionStyle,
}: HandleOptionRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === nextNavigableIndex;
  const isSelected = isOptionSelected(option);
  const optionContent = renderOption ? (
    renderOption({ value: option, isActive, isSelected })
  ) : (
    <DefaultOptionContent
      isSelected={isSelected}
      text={getOptionLabel(option)}
    />
  );

  return {
    node: (
      <div
        key={`opt-${getOptionKey(option)}`}
        role="option"
        tabIndex={-1}
        className={classNames(
          styles.option,
          isActive && styles.optionActive,
          optionClassName,
        )}
        aria-selected={isSelected ? true : undefined}
        data-index={nextNavigableIndex}
        data-active={isActive ? true : undefined}
        {...getItemProps()}
        onClick={() => onSelect(option)}
        style={optionStyle}
      >
        {optionContent}
      </div>
    ),
    nextNavigableIndex,
  };
}

function DefaultOptionContent({
  isSelected,
  text,
}: {
  readonly isSelected: boolean;
  readonly text: string;
}) {
  return (
    <div className={styles.defaultOptionContent}>
      <div className={styles.icon}>
        {isSelected && <Icon name="checkmark" size="small" />}
      </div>
      <Text>{text}</Text>
    </div>
  );
}

interface HandleActionRenderingProps<T extends OptionLike> {
  readonly action: MenuAction<Record<string, unknown>>;
  readonly index: number;
  readonly activeIndex: number | null;
  readonly navigableIndex: number;
  readonly getItemProps: () => Record<string, unknown>;
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  readonly getActionKey: (
    action: MenuAction<Record<string, unknown>>,
  ) => React.Key;
  readonly onAction: (action: ActionConfig) => void;
  readonly actionClassName?: string;
  readonly actionStyle?: React.CSSProperties;
}

function handleActionRendering<T extends OptionLike>({
  action,
  index,
  activeIndex,
  navigableIndex,
  getItemProps,
  renderAction,
  getActionKey,
  onAction,
  actionClassName,
  actionStyle,
}: HandleActionRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === nextNavigableIndex;
  const actionContent = renderAction ? (
    renderAction({ value: action, isActive })
  ) : (
    <Typography textColor="interactive">{action.label}</Typography>
  );

  return {
    node: (
      <div
        key={`act-${getActionKey(action)}-${index}`}
        tabIndex={-1}
        role="button"
        data-testid="ATL-AutocompleteRebuilt-Action"
        className={classNames(
          styles.action,
          isActive && styles.actionActive,
          actionClassName,
        )}
        data-index={nextNavigableIndex}
        data-active={isActive ? true : undefined}
        {...getItemProps()}
        onClick={() => {
          onAction({
            run: action.onClick,
            closeOnRun: action.shouldClose,
          });
        }}
        style={actionStyle}
      >
        {actionContent}
      </div>
    ),
    nextNavigableIndex,
  };
}
