import type { Ref } from "react";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  useTransitionStyles,
} from "@floating-ui/react";
import classNames from "classnames";
import { tokens } from "@jobber/design";
import type {
  AutocompleteRebuiltProps,
  OptionLike,
} from "./Autocomplete.types";
import styles from "./AutocompleteRebuilt.module.css";
import { useAutocomplete } from "./useAutocomplete";
import { useChipNavigation } from "./hooks/useChipNavigation";
import { preventDefaultPointerDown } from "./utils/interactionUtils";
import { MenuList } from "./components/MenuList";
import { PersistentRegion } from "./components/PersistentRegion";
import { InputText } from "../InputText";
import type { InputTextRebuiltProps } from "../InputText/InputText.types";
import { FormFieldWrapper } from "../FormField";
import { Glimmer } from "../Glimmer";
import { mergeRefs } from "../utils/mergeRefs";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export const AutocompleteRebuilt = forwardRef(AutocompleteRebuiltInternal) as <
  Value extends OptionLike = OptionLike,
  Multiple extends boolean = false,
>(
  props: AutocompleteRebuiltProps<Value, Multiple> & {
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  },
) => ReturnType<typeof AutocompleteRebuiltInternal>;

// eslint-disable-next-line max-statements
function AutocompleteRebuiltInternal<
  Value extends OptionLike,
  Multiple extends boolean = false,
>(
  props: AutocompleteRebuiltProps<Value, Multiple>,
  forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const {
    inputValue,
    placeholder,
    disabled,
    error,
    invalid,
    description,
    size: sizeProp,
    loading = false,
  } = props;

  const {
    renderable,
    optionCount,
    persistentsHeaders,
    persistentsFooters,
    headerInteractiveCount,
    middleNavigableCount,
    getOptionLabel,
    isOptionSelected,
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    activeIndex,
    open,
    listRef,
    onSelection,
    onAction,
    onInteractionPointerDown,
    removeSelection,
    onInputChangeFromUser,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    setReferenceElement,
  } = useAutocomplete<Value, Multiple>(props);
  const listboxId = React.useId();

  // Provides mount/unmount-aware transition styles for the floating element
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    initial: { opacity: 0 },
    open: { opacity: 1 },
    close: { opacity: 0 },
    duration: { open: tokens["timing-base"], close: tokens["timing-base"] },
  });

  const [menuWidth, setMenuWidth] = React.useState<number | undefined>(
    undefined,
  );
  const [positionRefEl, setPositionRefEl] = React.useState<Element | null>(
    null,
  );

  const formFieldRef = useRef<HTMLDivElement>(null);
  const internalInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inputId = React.useId();
  const descriptionId = `descriptionUUID--${inputId}`;

  const selectedValues: Value[] = props.multiple
    ? ((props.value ?? []) as Value[])
    : [];

  const {
    activeChipIndex,
    onKeyDown: chipKeyDown,
    onBlur: chipBlur,
  } = useChipNavigation<Value>({
    selectedValues,
    inputValue,
    readOnly: props.readOnly,
    removeSelection,
    onInputKeyDown,
    onInputBlur,
  });

  const focusInputOnPointerDown = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest("input, button")) return;

    e.preventDefault();
    internalInputRef.current?.focus();
  }, []);

  const composedReferenceProps = getReferenceProps({
    onKeyDown: props.multiple ? chipKeyDown : onInputKeyDown,
    onFocus: onInputFocus,
    onBlur: props.multiple ? chipBlur : onInputBlur,
    ...(props.multiple ? { onPointerDown: focusInputOnPointerDown } : {}),
  });

  const dataAttrs = filterDataAttributes(props);

  const ariaProps = {
    role: "combobox" as const,
    "aria-autocomplete": "list" as const,
    "aria-expanded": open ? true : false,
    "aria-controls": listboxId,
    "aria-activedescendant":
      activeChipIndex === null && open && activeIndex != null
        ? `${listboxId}-item-${activeIndex}`
        : undefined,
  };

  const inputProps: InputTextRebuiltProps = {
    version: 2 as const,
    value: inputValue,
    onChange: props.readOnly ? undefined : onInputChangeFromUser,
    // Ensure focus/blur callbacks still fire in readOnly mode where we don't spread getReferenceProps
    ...(props.readOnly ? { onFocus: onInputFocus, onBlur: onInputBlur } : {}),
    placeholder,
    disabled,
    readOnly: props.readOnly,
    error: error ?? undefined,
    name: props.name,
    invalid,
    clearable: props.clearable,
    autoComplete: "off",
    autoFocus: props.autoFocus,
    description,
    size: sizeProp ? sizeProp : undefined,
    prefix: props.prefix,
    suffix: props.suffix,
    ...(props.readOnly ? {} : composedReferenceProps),
    ...ariaProps,
    ...dataAttrs,
  };

  const chipAreaRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      setReferenceElement(node);

      const multiContainer = node.closest(
        "[data-testid='ATL-AutocompleteRebuilt-multiSelectContainer']",
      );

      if (multiContainer) {
        setMenuWidth(multiContainer.clientWidth);
        setPositionRefEl(multiContainer);
      }
    },
    [setReferenceElement],
  );

  const referenceInputRef = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      // In multiple mode, the chipArea is the reference element for floating-ui
      if (!props.multiple) {
        setReferenceElement(node);
      }

      // Workaround to get the width of the visual InputText element, which is not the same as
      // the literal input reference element when props like suffix/prefix/clearable are present.
      const visualInputTextElement = node?.closest(
        "[data-testid='Form-Field-Wrapper']",
      );

      if (!props.multiple && visualInputTextElement) {
        setMenuWidth(visualInputTextElement.clientWidth);
        setPositionRefEl(visualInputTextElement);
      }
    },
    [setReferenceElement, props.multiple],
  );

  const mergedInputRef = useMemo(
    () =>
      mergeRefs<HTMLInputElement | HTMLTextAreaElement>([
        referenceInputRef,
        internalInputRef,
        forwardedRef,
      ]),
    [referenceInputRef, forwardedRef],
  );

  useEffect(() => {
    if (!positionRefEl) return;
    // Set the reference element to the visual InputText element so the menu aligns with the input.
    refs.setPositionReference(positionRefEl);
  }, [positionRefEl, refs]);

  const menuClassName = classNames(styles.list, props.UNSAFE_className?.menu);

  const showEmptyStateMessage =
    optionCount === 0 && props.emptyStateMessage !== false;

  const activeIndexForMiddle =
    activeIndex != null ? activeIndex - headerInteractiveCount : null;

  let inputElement: React.ReactNode;

  if (props.customRenderInput) {
    inputElement = props.customRenderInput({
      inputRef: mergedInputRef,
      inputProps,
    });
  } else if (props.multiple) {
    inputElement = (
      <input
        ref={mergedInputRef}
        className={styles.inlineInput}
        id={inputId}
        value={inputValue}
        onChange={
          props.readOnly
            ? undefined
            : e => onInputChangeFromUser(e.target.value)
        }
        disabled={disabled}
        readOnly={props.readOnly}
        name={props.name}
        autoComplete="off"
        autoFocus={props.autoFocus}
        {...ariaProps}
        {...dataAttrs}
      />
    );
  } else {
    inputElement = <InputText ref={mergedInputRef} {...inputProps} />;
  }

  const handleClear = useCallback(() => {
    if (props.multiple) {
      (props.onChange as (v: Value[]) => void)([]);
    } else {
      (props.onChange as (v: Value | undefined) => void)(undefined);
    }

    onInputChangeFromUser("");
    internalInputRef.current?.focus();
  }, [props.multiple, props.onChange, onInputChangeFromUser]);

  const canDismissChip = !disabled && !props.readOnly;

  const chips = selectedValues.map((v, i) => (
    <span
      key={v.key ?? getOptionLabel(v)}
      className={classNames(
        styles.selectionChip,
        {
          [styles.selectionChipActive]: activeChipIndex === i,
          [styles.selectionChipDisabled]: disabled,
        },
        props.UNSAFE_className?.selection,
      )}
      style={props.UNSAFE_styles?.selection}
      data-testid="ATL-AutocompleteRebuilt-chip"
      onPointerDown={preventDefaultPointerDown}
    >
      {props.customRenderValue ? (
        props.customRenderValue({ value: v, getOptionLabel })
      ) : (
        <Typography size="small">{getOptionLabel(v)}</Typography>
      )}
      {canDismissChip && (
        <button
          type="button"
          className={styles.chipDismiss}
          onClick={() => removeSelection(v)}
          onPointerDown={preventDefaultPointerDown}
          // TODO avoid hardcoding english
          aria-label={`Remove ${getOptionLabel(v)}`}
          tabIndex={-1}
        >
          <Icon size="small" name="remove" />
        </button>
      )}
    </span>
  ));

  let fieldContent: React.ReactNode;

  if (props.multiple) {
    const hasValue = selectedValues.length > 0 || inputValue;

    fieldContent = (
      <div
        className={styles.multiSelectField}
        data-testid="ATL-AutocompleteRebuilt-multiSelectContainer"
      >
        <FormFieldWrapper
          disabled={disabled}
          size={sizeProp ? sizeProp : undefined}
          error={error ?? ""}
          invalid={Boolean(error || invalid)}
          identifier={inputId}
          descriptionIdentifier={descriptionId}
          description={description}
          clearable={props.clearable ?? "never"}
          onClear={handleClear}
          type="text"
          placeholder={placeholder}
          value={hasValue ? "has-value" : ""}
          prefix={props.prefix}
          suffix={props.suffix}
          wrapperRef={formFieldRef}
        >
          <div
            ref={chipAreaRef}
            className={styles.chipArea}
            {...(props.readOnly
              ? { onFocus: onInputFocus, onBlur: chipBlur }
              : composedReferenceProps)}
          >
            {chips}
            {inputElement}
          </div>
        </FormFieldWrapper>
      </div>
    );
  } else {
    fieldContent = inputElement;
  }

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      {fieldContent}
      {isMounted && !props.readOnly && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            closeOnFocusOut
            returnFocus={false}
          >
            <div
              {...getFloatingProps({
                ref(node: HTMLElement | null) {
                  if (node) refs.setFloating(node);
                },
                id: listboxId,
                role: "listbox",
                className: menuClassName,
                style: {
                  ...floatingStyles,
                  ...transitionStyles,
                  ...props.UNSAFE_styles?.menu,
                  ...(menuWidth
                    ? { width: menuWidth, maxWidth: menuWidth }
                    : {}),
                },
              })}
            >
              {/* Header persistents */}
              <PersistentRegion<Value>
                items={persistentsHeaders}
                position="header"
                activeIndex={activeIndex}
                indexOffset={0}
                listboxId={listboxId}
                getItemProps={getItemProps}
                listRef={listRef}
                customRenderHeader={props.customRenderHeader}
                customRenderFooter={props.customRenderFooter}
                onAction={onAction}
                onInteractionPointerDown={onInteractionPointerDown}
                className={classNames(
                  styles.persistentHeader,
                  props.UNSAFE_className?.header,
                )}
                style={props.UNSAFE_styles?.header}
              />

              {/* Scrollable middle region */}
              <div className={styles.scrollRegion}>
                {loading ? (
                  props.customRenderLoading ?? <LoadingContent />
                ) : (
                  <>
                    {showEmptyStateMessage && (
                      <EmptyStateMessage emptyState={props.emptyStateMessage} />
                    )}
                    {renderable.length > 0 && (
                      <MenuList<Value>
                        items={renderable}
                        activeIndex={activeIndexForMiddle}
                        indexOffset={headerInteractiveCount}
                        listboxId={listboxId}
                        getItemProps={getItemProps}
                        listRef={listRef}
                        customRenderOption={props.customRenderOption}
                        customRenderSection={props.customRenderSection}
                        customRenderAction={props.customRenderAction}
                        getOptionLabel={getOptionLabel}
                        onSelect={onSelection}
                        onAction={onAction}
                        onInteractionPointerDown={onInteractionPointerDown}
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
                  </>
                )}
              </div>

              {/* Footer persistents */}
              <PersistentRegion<Value>
                items={persistentsFooters}
                position={"footer"}
                activeIndex={activeIndex}
                indexOffset={headerInteractiveCount + middleNavigableCount}
                listboxId={listboxId}
                getItemProps={getItemProps}
                listRef={listRef}
                customRenderHeader={props.customRenderHeader}
                customRenderFooter={props.customRenderFooter}
                onAction={onAction}
                onInteractionPointerDown={onInteractionPointerDown}
                className={classNames(
                  styles.persistentFooter,
                  props.UNSAFE_className?.footer,
                )}
                style={props.UNSAFE_styles?.footer}
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}

function LoadingContent() {
  return (
    <div
      className={styles.loadingList}
      onPointerDown={preventDefaultPointerDown}
    >
      <Glimmer shape="rectangle" size="base" />
      <Glimmer shape="rectangle" size="base" />
      <Glimmer shape="rectangle" size="base" />
    </div>
  );
}

function EmptyStateMessage({
  emptyState,
}: {
  readonly emptyState: React.ReactNode;
}) {
  const emptyStateDefault = "No options";
  const emptyStateContent = emptyState ?? emptyStateDefault;

  return (
    <div
      className={styles.emptyStateMessage}
      onPointerDown={preventDefaultPointerDown}
    >
      {emptyStateContent}
    </div>
  );
}
