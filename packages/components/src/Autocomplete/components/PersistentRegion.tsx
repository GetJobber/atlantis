import React from "react";
import classNames from "classnames";
import { DefaultActionContent } from "./MenuList";
import type {
  ActionConfig,
  AutocompleteRebuiltProps,
  MenuFooter,
  MenuHeader,
  OptionLike,
} from "../Autocomplete.types";
import { preventDefaultPointerDown } from "../utils/interactionUtils";
import styles from "../AutocompleteRebuilt.module.css";

interface PersistentRegionProps<T extends OptionLike> {
  readonly items: Array<
    MenuHeader<Record<string, unknown>> | MenuFooter<Record<string, unknown>>
  >;
  readonly position: "header" | "footer";
  readonly activeIndex: number | null;
  readonly indexOffset: number;
  readonly listboxId?: string;
  readonly getItemProps: (
    args?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly listRef: React.RefObject<Array<HTMLElement | null>>;
  readonly customRenderHeader?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderHeader"];
  readonly customRenderFooter?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderFooter"];
  // keys derived via persistent.key/label
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly onAction: (action: ActionConfig) => void;
  readonly onInteractionPointerDown: (e: React.PointerEvent) => void;
}

export function PersistentRegion<T extends OptionLike>({
  items,
  position,
  activeIndex,
  indexOffset,
  getItemProps,
  listRef,
  customRenderHeader,
  customRenderFooter,
  className,
  style,
  onAction,
  onInteractionPointerDown,
}: PersistentRegionProps<T>) {
  if (!items || items.length === 0) return null;

  let navigableIndex = -1;

  return (
    <div
      className={className}
      style={style}
      data-region={position}
      data-testid={`ATL-AutocompleteRebuilt-${position}`}
    >
      {items.map(persistent => {
        const result = handlePersistentRendering({
          persistent,
          position,
          activeIndex,
          indexOffset,
          getItemProps,
          customRenderHeader,
          customRenderFooter,
          listRef,
          onAction,
          onInteractionPointerDown,
          navigableIndex,
        });

        navigableIndex = result.nextNavigableIndex;

        return result.node;
      })}
    </div>
  );
}

interface HandlePersistentRenderingProps<T extends OptionLike> {
  readonly customRenderHeader?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderHeader"];
  readonly customRenderFooter?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderFooter"];
  readonly position: "header" | "footer";
  readonly activeIndex: number | null;
  readonly indexOffset: number;
  readonly getItemProps: (
    args?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly persistent:
    | MenuHeader<Record<string, unknown>>
    | MenuFooter<Record<string, unknown>>;
  readonly listRef: React.RefObject<Array<HTMLElement | null>>;
  readonly onAction: (action: ActionConfig) => void;
  readonly onInteractionPointerDown: (e: React.PointerEvent) => void;
  readonly navigableIndex: number;
}

function handlePersistentRendering<T extends OptionLike>({
  persistent,
  position,
  activeIndex,
  indexOffset,
  getItemProps,
  customRenderHeader,
  customRenderFooter,
  listRef,
  onAction,
  onInteractionPointerDown,
  navigableIndex,
}: HandlePersistentRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const interactive = Boolean(persistent.onClick);

  if (!interactive) {
    const node = handleTextPersistentRendering({
      persistent,
      position,
      customRenderHeader,
      customRenderFooter,
    });

    return { node, nextNavigableIndex: navigableIndex };
  }

  return handleActionPersistentRendering({
    persistent,
    position,
    activeIndex,
    indexOffset,
    getItemProps,
    customRenderHeader,
    customRenderFooter,
    listRef,
    onAction,
    onInteractionPointerDown,
    navigableIndex,
  });
}

function handleTextPersistentRendering<T extends OptionLike>({
  persistent,
  position,
  customRenderHeader,
  customRenderFooter,
}: Pick<
  HandlePersistentRenderingProps<T>,
  "persistent" | "position" | "customRenderHeader" | "customRenderFooter"
>): React.ReactNode {
  let content: React.ReactNode;

  if (position === "header" && customRenderHeader) {
    content = customRenderHeader({ value: persistent as MenuHeader });
  } else if (position === "footer" && customRenderFooter) {
    content = customRenderFooter({ value: persistent as MenuFooter });
  } else {
    content = <DefaultTextPersistentContent persistent={persistent} />;
  }

  return (
    <div
      key={`persistent-${position}-${String(
        persistent.key ?? persistent.label,
      )}`}
      role="presentation"
      tabIndex={-1}
      className={styles.textPersistent}
      onPointerDown={preventDefaultPointerDown}
    >
      {content}
    </div>
  );
}

function handleActionPersistentRendering<T extends OptionLike>({
  persistent,
  position,
  activeIndex,
  indexOffset,
  getItemProps,
  customRenderHeader,
  customRenderFooter,
  listRef,
  onAction,
  onInteractionPointerDown,
  navigableIndex,
}: HandlePersistentRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === indexOffset + nextNavigableIndex;
  let content: React.ReactNode;

  if (position === "header" && customRenderHeader) {
    content = customRenderHeader({
      value: persistent as MenuHeader,
      isActive,
    });
  } else if (position === "footer" && customRenderFooter) {
    content = customRenderFooter({
      value: persistent as MenuFooter,
      isActive,
    });
  } else {
    content = <DefaultActionContent textContent={persistent.label} />;
  }

  return {
    node: (
      <div
        key={`persistent-${position}-${String(
          persistent.key ?? persistent.label,
        )}`}
        data-index={indexOffset + nextNavigableIndex}
        id={`${position}-persistent-${indexOffset + nextNavigableIndex}`}
        data-active={isActive ? true : undefined}
        {...getItemProps({
          ref(persistNode: HTMLElement | null) {
            const idx = indexOffset + nextNavigableIndex;
            if (persistNode) listRef.current[idx] = persistNode;
          },
          onClick: () => {
            onAction({
              run: () => {
                persistent.onClick?.();
              },
              closeOnRun: persistent.shouldClose,
            });
          },
          onPointerDown: onInteractionPointerDown,
          className: classNames(styles.action, isActive && styles.actionActive),
        })}
        role="button"
        tabIndex={-1}
      >
        {content}
      </div>
    ),
    nextNavigableIndex,
  };
}

function DefaultTextPersistentContent({
  persistent,
}: {
  readonly persistent:
    | MenuHeader<Record<string, unknown>>
    | MenuFooter<Record<string, unknown>>;
}) {
  return <div className={styles.textPersistent}>{persistent.label}</div>;
}
