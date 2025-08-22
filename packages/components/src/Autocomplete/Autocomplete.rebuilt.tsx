import type { Ref } from "react";
import React, { forwardRef, useEffect } from "react";
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
import { MenuList } from "./components/MenuList";
import { PersistentRegion } from "./components/PersistentRegion";
import { InputText } from "../InputText";
import type { InputTextRebuiltProps } from "../InputText/InputText.types";
import { Glimmer } from "../Glimmer";
import { mergeRefs } from "../utils/mergeRefs";

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
    persistentsHeaders,
    persistentsFooters,
    headerInteractiveCount,
    middleNavigableCount,
    getPersistentKey,
    getOptionLabel,
    getOptionKey,
    isOptionSelected,
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
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

  const composedReferenceProps = getReferenceProps({
    onKeyDown: onInputKeyDown,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
  });

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
    description,
    size: sizeProp ? sizeProp : undefined,
    prefix: props.prefix,
    suffix: props.suffix,
    clearable: clearable ? "while-editing" : undefined,
    ...(props.readOnly ? {} : composedReferenceProps),
  };

  const referenceInputRef: React.Ref<HTMLInputElement | HTMLTextAreaElement> = (
    node: HTMLInputElement | HTMLTextAreaElement | null,
  ) => {
    setReferenceElement(node);

    // Workaround to get the width of the visual InputText element, which is not the same as
    // the literal input reference element when props like suffix/prefix/clearable are present.
    const visualInputTextElement = node?.closest(
      "[data-testid='Form-Field-Wrapper']",
    );

    if (visualInputTextElement) {
      setMenuWidth(visualInputTextElement.clientWidth);
      setPositionRefEl(visualInputTextElement);
    }
  };

  const mergedInputRef = mergeRefs<HTMLInputElement | HTMLTextAreaElement>([
    referenceInputRef,
    forwardedRef,
  ]);

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

  return (
    <div data-testid="ATL-AutocompleteRebuilt">
      {renderInput ? (
        renderInput({ inputRef: mergedInputRef, inputProps })
      ) : (
        <InputText ref={mergedInputRef} {...inputProps} />
      )}
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
              ref={refs.setFloating}
              role="listbox"
              className={menuClassName}
              style={{
                ...floatingStyles,
                ...transitionStyles,
                ...props.UNSAFE_styles?.menu,
                ...(menuWidth ? { width: menuWidth, maxWidth: menuWidth } : {}),
              }}
              {...getFloatingProps()}
            >
              {/* Header persistents */}
              <PersistentRegion<Value>
                items={persistentsHeaders}
                position="header"
                activeIndex={activeIndex}
                indexOffset={0}
                getItemProps={getItemProps}
                listRef={listRef}
                renderPersistent={props.renderPersistent}
                getPersistentKey={getPersistentKey}
                onAction={onAction}
                className={classNames(
                  styles.persistentHeader,
                  props.UNSAFE_className?.persistentHeader,
                )}
                style={props.UNSAFE_styles?.persistentHeader}
              />

              {/* Scrollable middle region */}
              <div className={styles.scrollRegion}>
                {loading ? (
                  props.renderLoading ?? <LoadingContent />
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
                        getItemProps={() =>
                          getItemProps({
                            ref(node: HTMLElement | null) {
                              const idx = Number(
                                node?.getAttribute("data-index"),
                              );

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
                  </>
                )}
              </div>

              {/* Footer persistents */}
              <PersistentRegion<Value>
                items={persistentsFooters}
                position={"footer"}
                activeIndex={activeIndex}
                indexOffset={headerInteractiveCount + middleNavigableCount}
                getItemProps={getItemProps}
                listRef={listRef}
                renderPersistent={props.renderPersistent}
                getPersistentKey={getPersistentKey}
                onAction={onAction}
                className={classNames(
                  styles.persistentFooter,
                  props.UNSAFE_className?.persistentFooter,
                )}
                style={props.UNSAFE_styles?.persistentFooter}
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
    <div className={styles.loadingList}>
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

  return <div className={styles.emptyStateMessage}>{emptyStateContent}</div>;
}
