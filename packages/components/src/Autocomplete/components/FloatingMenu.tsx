import React from "react";
import type {
  UseFloatingReturn,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import classNames from "classnames";
import { MenuList } from "./MenuList";
import { PersistentRegion } from "./PersistentRegion";
import type {
  ActionConfig,
  AutocompleteRebuiltProps,
  MenuFooter,
  MenuHeader,
  OptionLike,
} from "../Autocomplete.types";
import type { RenderItem } from "../useAutocomplete";
import styles from "../AutocompleteRebuilt.module.css";
import { preventDefaultPointerDown } from "../utils/interactionUtils";
import { Glimmer } from "../../Glimmer";

interface FloatingMenuProps<Value extends OptionLike> {
  readonly context: UseFloatingReturn["context"];
  readonly getFloatingProps: UseInteractionsReturn["getFloatingProps"];
  readonly refs: UseFloatingReturn["refs"];
  readonly listboxId: string;
  readonly className: string;
  readonly floatingStyles: React.CSSProperties;
  readonly transitionStyles: React.CSSProperties;
  readonly menuStyle?: React.CSSProperties;

  readonly renderable: Array<RenderItem<Value>>;
  readonly persistentsHeaders: Array<MenuHeader<Record<string, unknown>>>;
  readonly persistentsFooters: Array<MenuFooter<Record<string, unknown>>>;

  readonly activeIndex: number | null;
  readonly headerInteractiveCount: number;
  readonly middleNavigableCount: number;

  readonly getItemProps: UseInteractionsReturn["getItemProps"];
  readonly listRef: React.RefObject<Array<HTMLElement | null>>;

  readonly onSelection: (option: Value) => void;
  readonly onAction: (action: ActionConfig) => void;
  readonly onInteractionPointerDown: (e: React.PointerEvent) => void;
  readonly getOptionLabel: (option: Value) => string;
  readonly isOptionSelected: (option: Value) => boolean;

  readonly loading: boolean;
  readonly showEmptyStateMessage: boolean;
  readonly emptyStateMessage?: React.ReactNode;
  readonly customRenderLoading?: React.ReactNode;
  readonly customRenderOption?: AutocompleteRebuiltProps<
    Value,
    false
  >["customRenderOption"];
  readonly customRenderSection?: AutocompleteRebuiltProps<
    Value,
    false
  >["customRenderSection"];
  readonly customRenderAction?: AutocompleteRebuiltProps<
    Value,
    false
  >["customRenderAction"];
  readonly customRenderHeader?: AutocompleteRebuiltProps<
    Value,
    false
  >["customRenderHeader"];
  readonly customRenderFooter?: AutocompleteRebuiltProps<
    Value,
    false
  >["customRenderFooter"];

  readonly slotOverrides?: {
    option?: { className?: string; style?: React.CSSProperties };
    action?: { className?: string; style?: React.CSSProperties };
    section?: { className?: string; style?: React.CSSProperties };
    header?: { className?: string; style?: React.CSSProperties };
    footer?: { className?: string; style?: React.CSSProperties };
  };
}

export function FloatingMenu<Value extends OptionLike>({
  context,
  getFloatingProps,
  refs,
  listboxId,
  className,
  floatingStyles,
  transitionStyles,
  menuStyle,
  renderable,
  persistentsHeaders,
  persistentsFooters,
  activeIndex,
  headerInteractiveCount,
  middleNavigableCount,
  getItemProps,
  listRef,
  onSelection,
  onAction,
  onInteractionPointerDown,
  getOptionLabel,
  isOptionSelected,
  loading,
  showEmptyStateMessage,
  emptyStateMessage,
  customRenderLoading,
  customRenderOption,
  customRenderSection,
  customRenderAction,
  customRenderHeader,
  customRenderFooter,
  slotOverrides,
}: FloatingMenuProps<Value>) {
  const activeIndexForMiddle =
    activeIndex != null ? activeIndex - headerInteractiveCount : null;

  return (
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
            className,
            style: {
              ...floatingStyles,
              ...transitionStyles,
              ...menuStyle,
            },
          })}
        >
          <PersistentRegion<Value>
            items={persistentsHeaders}
            position="header"
            activeIndex={activeIndex}
            indexOffset={0}
            listboxId={listboxId}
            getItemProps={getItemProps}
            listRef={listRef}
            customRenderHeader={customRenderHeader}
            customRenderFooter={customRenderFooter}
            onAction={onAction}
            onInteractionPointerDown={onInteractionPointerDown}
            className={classNames(
              styles.persistentHeader,
              slotOverrides?.header?.className,
            )}
            style={slotOverrides?.header?.style}
          />

          <div className={styles.scrollRegion}>
            {loading ? (
              customRenderLoading ?? <LoadingContent />
            ) : (
              <>
                {showEmptyStateMessage && (
                  <EmptyStateMessage emptyState={emptyStateMessage} />
                )}
                {renderable.length > 0 && (
                  <MenuList<Value>
                    items={renderable}
                    activeIndex={activeIndexForMiddle}
                    indexOffset={headerInteractiveCount}
                    listboxId={listboxId}
                    getItemProps={getItemProps}
                    listRef={listRef}
                    customRenderOption={customRenderOption}
                    customRenderSection={customRenderSection}
                    customRenderAction={customRenderAction}
                    getOptionLabel={getOptionLabel}
                    onSelect={onSelection}
                    onAction={onAction}
                    onInteractionPointerDown={onInteractionPointerDown}
                    isOptionSelected={isOptionSelected}
                    slotOverrides={slotOverrides}
                  />
                )}
              </>
            )}
          </div>

          <PersistentRegion<Value>
            items={persistentsFooters}
            position="footer"
            activeIndex={activeIndex}
            indexOffset={headerInteractiveCount + middleNavigableCount}
            listboxId={listboxId}
            getItemProps={getItemProps}
            listRef={listRef}
            customRenderHeader={customRenderHeader}
            customRenderFooter={customRenderFooter}
            onAction={onAction}
            onInteractionPointerDown={onInteractionPointerDown}
            className={classNames(
              styles.persistentFooter,
              slotOverrides?.footer?.className,
            )}
            style={slotOverrides?.footer?.style}
          />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
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
