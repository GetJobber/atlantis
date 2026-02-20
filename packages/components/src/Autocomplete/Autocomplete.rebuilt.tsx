import type { Ref } from "react";
import React, {
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
import { preventDefaultPointerDown } from "./utils/interactionUtils";
import { MenuList } from "./components/MenuList";
import { PersistentRegion } from "./components/PersistentRegion";
import { InputText } from "../InputText";
import type { InputTextRebuiltProps } from "../InputText/InputText.types";
import { FormFieldWrapper } from "../FormField";
import { Glimmer } from "../Glimmer";
import { mergeRefs } from "../utils/mergeRefs";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";

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
  const inputId = React.useId();
  const descriptionId = `descriptionUUID--${inputId}`;

  const selectedValues: Value[] = props.multiple
    ? ((props.value ?? []) as Value[])
    : [];

  const [activeChipIndex, setActiveChipIndex] = useState<number | null>(null);

  useEffect(() => {
    if (inputValue !== "") {
      setActiveChipIndex(null);
    }
  }, [inputValue]);

  useEffect(() => {
    setActiveChipIndex(prev => {
      if (prev === null) return null;
      if (selectedValues.length === 0) return null;
      if (prev >= selectedValues.length) return selectedValues.length - 1;

      return prev;
    });
  }, [selectedValues.length]);

  const handleActiveChipKey = useCallback(
    // eslint-disable-next-line max-statements
    (event: React.KeyboardEvent): boolean => {
      if (activeChipIndex === null) return false;

      const { key } = event;

      if (key === "ArrowLeft") {
        event.preventDefault();
        setActiveChipIndex(i => Math.max(0, (i ?? 0) - 1));

        return true;
      }

      if (key === "ArrowRight") {
        event.preventDefault();
        setActiveChipIndex(
          activeChipIndex + 1 >= selectedValues.length
            ? null
            : activeChipIndex + 1,
        );

        return true;
      }

      if (key === "Backspace" || key === "Delete") {
        event.preventDefault();
        const option = selectedValues[activeChipIndex];
        const newLen = selectedValues.length - 1;

        if (newLen === 0) {
          setActiveChipIndex(null);
        } else if (activeChipIndex >= newLen) {
          setActiveChipIndex(newLen - 1);
        }

        removeSelection(option);

        return true;
      }

      if (key === "Escape") {
        setActiveChipIndex(null);

        return true;
      }

      setActiveChipIndex(null);

      return false;
    },
    [activeChipIndex, selectedValues, removeSelection],
  );

  const handleMultipleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (handleActiveChipKey(event)) return;

      if (
        event.key === "ArrowLeft" &&
        !props.readOnly &&
        inputValue === "" &&
        selectedValues.length > 0
      ) {
        event.preventDefault();
        setActiveChipIndex(selectedValues.length - 1);

        return;
      }

      onInputKeyDown(event);
    },
    [
      handleActiveChipKey,
      selectedValues,
      inputValue,
      props.readOnly,
      onInputKeyDown,
    ],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setActiveChipIndex(null);
      onInputBlur(event);
    },
    [onInputBlur],
  );

  const composedReferenceProps = getReferenceProps({
    onKeyDown: props.multiple ? handleMultipleKeyDown : onInputKeyDown,
    onFocus: onInputFocus,
    onBlur: props.multiple ? handleBlur : onInputBlur,
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

  const referenceInputRef = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      setReferenceElement(node);

      // In multiple mode, prefer the multi-select container for width/positioning
      // so the menu aligns with the full chip + input area.
      const multiContainer = node?.closest(
        "[data-testid='ATL-AutocompleteRebuilt-multiSelectContainer']",
      );

      // Workaround to get the width of the visual InputText element, which is not the same as
      // the literal input reference element when props like suffix/prefix/clearable are present.
      const visualInputTextElement =
        multiContainer ?? node?.closest("[data-testid='Form-Field-Wrapper']");

      if (visualInputTextElement) {
        setMenuWidth(visualInputTextElement.clientWidth);
        setPositionRefEl(visualInputTextElement);
      }
    },
    [setReferenceElement],
  );

  const mergedInputRef = useMemo(
    () =>
      mergeRefs<HTMLInputElement | HTMLTextAreaElement>([
        referenceInputRef,
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
        {...(props.readOnly
          ? { onFocus: onInputFocus, onBlur: onInputBlur }
          : composedReferenceProps)}
        {...ariaProps}
        {...dataAttrs}
      />
    );
  } else {
    inputElement = <InputText ref={mergedInputRef} {...inputProps} />;
  }

  const hasValueToRender = props.multiple
    ? selectedValues.length > 0
    : props.value != null;

  const customValueContent =
    props.customRenderValue && hasValueToRender
      ? props.customRenderValue({
          value: props.value,
          getOptionLabel,
          removeValue: removeSelection,
          preventBlur: preventDefaultPointerDown,
          disabled,
          readOnly: props.readOnly,
          activeValueIndex: activeChipIndex,
        })
      : undefined;

  const defaultChips =
    !props.customRenderValue &&
    selectedValues.map((v, i) => (
      <span
        key={v.key ?? getOptionLabel(v)}
        className={classNames(styles.selectionChip, {
          [styles.selectionChipActive]: activeChipIndex === i,
        })}
        data-testid="ATL-AutocompleteRebuilt-chip"
        onPointerDown={preventDefaultPointerDown}
      >
        {getOptionLabel(v)}
        <button
          type="button"
          className={styles.chipDismiss}
          onClick={() => removeSelection(v)}
          onPointerDown={preventDefaultPointerDown}
          aria-label={`Remove ${getOptionLabel(v)}`}
          tabIndex={-1}
        >
          {"\u00D7"}
        </button>
      </span>
    ));

  const needsSingleCustomContainer =
    !props.multiple && props.customRenderValue && props.value != null;

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
          clearable="never"
          type="text"
          placeholder={placeholder}
          value={hasValue ? "has-value" : ""}
          prefix={props.prefix}
          suffix={props.suffix}
          wrapperRef={formFieldRef}
        >
          <div className={styles.chipArea}>
            {customValueContent}
            {defaultChips}
            {inputElement}
          </div>
        </FormFieldWrapper>
      </div>
    );
  } else if (needsSingleCustomContainer) {
    fieldContent = (
      <div
        className={classNames(styles.multiSelectContainer, {
          [styles.multiSelectContainerInvalid]: invalid || error,
        })}
        data-testid="ATL-AutocompleteRebuilt-multiSelectContainer"
      >
        {customValueContent}
        {inputElement}
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
