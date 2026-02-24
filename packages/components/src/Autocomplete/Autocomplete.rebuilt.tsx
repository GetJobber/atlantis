import type { Ref } from "react";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useTransitionStyles } from "@floating-ui/react";
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
import { FloatingMenu } from "./components/FloatingMenu";
import { InputText } from "../InputText";
import type { InputTextRebuiltProps } from "../InputText/InputText.types";
import { FormFieldWrapper } from "../FormField";
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

  const formFieldRef = useRef<HTMLDivElement>(null);
  // Ref for the multi-select input element, where we cannot use refs.domReference
  // since it is not attached to the literal input element, whereas single + InputText only offers a
  // ref to the literal input element.
  const internalInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

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
    clearAll,
  } = useAutocomplete<Value, Multiple>(props, internalInputRef);
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

        // Workaround to get the width of the visual InputText element, which is not the same as
        // the literal input reference element.
        const visualInputTextElement = node?.closest(
          "[data-testid='Form-Field-Wrapper']",
        );

        if (visualInputTextElement) {
          setMenuWidth(visualInputTextElement.clientWidth);
          setPositionRefEl(visualInputTextElement);
        }
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
    refs.setPositionReference(positionRefEl);
  }, [positionRefEl, refs]);

  const menuClassName = classNames(styles.list, props.UNSAFE_className?.menu);
  const showEmptyStateMessage =
    optionCount === 0 && props.emptyStateMessage !== false;

  const floatingMenu = isMounted && !props.readOnly && (
    <FloatingMenu<Value>
      context={context}
      getFloatingProps={getFloatingProps}
      refs={refs}
      listboxId={listboxId}
      className={menuClassName}
      floatingStyles={floatingStyles}
      transitionStyles={transitionStyles}
      menuWidth={menuWidth}
      menuStyle={props.UNSAFE_styles?.menu}
      renderable={renderable}
      persistentsHeaders={persistentsHeaders}
      persistentsFooters={persistentsFooters}
      activeIndex={activeIndex}
      headerInteractiveCount={headerInteractiveCount}
      middleNavigableCount={middleNavigableCount}
      getItemProps={getItemProps}
      listRef={listRef}
      onSelection={onSelection}
      onAction={onAction}
      onInteractionPointerDown={onInteractionPointerDown}
      getOptionLabel={getOptionLabel}
      isOptionSelected={isOptionSelected}
      loading={loading}
      showEmptyStateMessage={showEmptyStateMessage}
      emptyStateMessage={props.emptyStateMessage}
      customRenderLoading={props.customRenderLoading}
      customRenderOption={props.customRenderOption}
      customRenderSection={props.customRenderSection}
      customRenderAction={props.customRenderAction}
      customRenderHeader={props.customRenderHeader}
      customRenderFooter={props.customRenderFooter}
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
        header: {
          className: props.UNSAFE_className?.header,
          style: props.UNSAFE_styles?.header,
        },
        footer: {
          className: props.UNSAFE_className?.footer,
          style: props.UNSAFE_styles?.footer,
        },
      }}
    />
  );

  if (props.customRenderInput) {
    return (
      <div data-testid="ATL-AutocompleteRebuilt">
        {props.customRenderInput({ inputRef: mergedInputRef, inputProps })}
        {floatingMenu}
      </div>
    );
  }

  if (props.multiple) {
    const hasValue = selectedValues.length > 0 || inputValue;
    const canDismissChip = !disabled && !props.readOnly;

    return (
      <div data-testid="ATL-AutocompleteRebuilt">
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
            onClear={() => {
              clearAll();
              internalInputRef.current?.focus();
            }}
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
              {selectedValues.map((v, i) => (
                <SelectionChip<Value>
                  key={v.key ?? getOptionLabel(v)}
                  value={v}
                  active={activeChipIndex === i}
                  disabled={disabled}
                  getOptionLabel={getOptionLabel}
                  customRenderValue={props.customRenderValue}
                  canDismiss={canDismissChip}
                  onDismiss={() => removeSelection(v)}
                  unsafeClassName={props.UNSAFE_className?.selection}
                  unsafeStyle={props.UNSAFE_styles?.selection}
                />
              ))}
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
            </div>
          </FormFieldWrapper>
        </div>
        {floatingMenu}
      </div>
    );
  }

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      <InputText ref={mergedInputRef} {...inputProps} />
      {floatingMenu}
    </div>
  );
}

function SelectionChip<Value extends OptionLike>({
  value,
  active,
  disabled,
  getOptionLabel,
  customRenderValue,
  canDismiss,
  onDismiss,
  unsafeClassName,
  unsafeStyle,
}: {
  readonly value: Value;
  readonly active: boolean;
  readonly disabled?: boolean;
  readonly getOptionLabel: (option: Value) => string;
  readonly customRenderValue?: AutocompleteRebuiltProps<
    Value,
    boolean
  >["customRenderValue"];
  readonly canDismiss: boolean;
  readonly onDismiss: () => void;
  readonly unsafeClassName?: string;
  readonly unsafeStyle?: React.CSSProperties;
}) {
  return (
    <span
      className={classNames(
        styles.selectionChip,
        {
          [styles.selectionChipActive]: active,
          [styles.selectionChipDisabled]: disabled,
        },
        unsafeClassName,
      )}
      style={unsafeStyle}
      data-testid="ATL-AutocompleteRebuilt-chip"
      onPointerDown={preventDefaultPointerDown}
    >
      {customRenderValue ? (
        customRenderValue({ value, getOptionLabel })
      ) : (
        <Typography size="small">{getOptionLabel(value)}</Typography>
      )}
      {canDismiss && (
        <button
          type="button"
          className={styles.chipDismiss}
          onClick={onDismiss}
          onPointerDown={preventDefaultPointerDown}
          aria-label={`Remove ${getOptionLabel(value)}`}
          tabIndex={-1}
        >
          <Icon size="small" name="remove" />
        </button>
      )}
    </span>
  );
}
