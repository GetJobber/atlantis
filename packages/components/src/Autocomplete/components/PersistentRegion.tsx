import React from "react";
import classNames from "classnames";
import { DefaultActionContent } from "./MenuList";
import type {
  ActionConfig,
  AutocompleteRebuiltProps,
  MenuPersistent,
  OptionLike,
} from "../Autocomplete.types";
import styles from "../AutocompleteRebuilt.module.css";

interface PersistentRegionProps<T extends OptionLike> {
  readonly items: Array<
    MenuPersistent<Record<string, unknown>> & { position: "header" | "footer" }
  >;
  readonly position: "header" | "footer";
  readonly activeIndex: number | null;
  readonly indexOffset: number;
  readonly listboxId?: string;
  readonly getItemProps: (
    args?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  readonly customRenderPersistent?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderPersistent"];
  // keys derived via persistent.key/label
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly onAction: (action: ActionConfig) => void;
}

export function PersistentRegion<T extends OptionLike>({
  items,
  position,
  activeIndex,
  indexOffset,
  getItemProps,
  listRef,
  customRenderPersistent,
  className,
  style,
  onAction,
}: PersistentRegionProps<T>) {
  if (!items || items.length === 0) return null;

  let navigableIndex = -1;

  return (
    <div
      className={className}
      style={style}
      data-region={position}
      data-testid={`ATL-AutocompleteRebuilt-Persistent-${position}`}
    >
      {items.map(persistent => {
        const result = handlePersistentRendering({
          persistent,
          position,
          activeIndex,
          indexOffset,
          getItemProps,
          customRenderPersistent,
          listRef,
          onAction,
          navigableIndex,
        });

        navigableIndex = result.nextNavigableIndex;

        return result.node;
      })}
    </div>
  );
}

interface HandlePersistentRenderingProps<T extends OptionLike> {
  readonly customRenderPersistent?: AutocompleteRebuiltProps<
    T,
    false
  >["customRenderPersistent"];
  readonly position: "header" | "footer";
  readonly activeIndex: number | null;
  readonly indexOffset: number;
  readonly getItemProps: (
    args?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly persistent: MenuPersistent<Record<string, unknown>>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  readonly onAction: (action: ActionConfig) => void;
  readonly navigableIndex: number;
}

function handlePersistentRendering<T extends OptionLike>({
  persistent,
  position,
  activeIndex,
  indexOffset,
  getItemProps,
  customRenderPersistent,
  listRef,
  onAction,
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
      customRenderPersistent,
    });

    return { node, nextNavigableIndex: navigableIndex };
  }

  return handleActionPersistentRendering({
    persistent,
    position,
    activeIndex,
    indexOffset,
    getItemProps,
    customRenderPersistent,
    listRef,
    onAction,
    navigableIndex,
  });
}

function handleTextPersistentRendering<T extends OptionLike>({
  persistent,
  position,
  customRenderPersistent,
}: Pick<
  HandlePersistentRenderingProps<T>,
  "persistent" | "position" | "customRenderPersistent"
>): React.ReactNode {
  const content = customRenderPersistent ? (
    customRenderPersistent({ value: persistent, position })
  ) : (
    <DefaultTextPersistentContent persistent={persistent} />
  );

  return (
    <div
      key={`persistent-${position}-${String(
        persistent.key ?? persistent.label,
      )}`}
      role="presentation"
      tabIndex={-1}
      className={styles.textPersistent}
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
  customRenderPersistent,
  listRef,
  onAction,
  navigableIndex,
}: HandlePersistentRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === indexOffset + nextNavigableIndex;
  const content = customRenderPersistent ? (
    customRenderPersistent({ value: persistent, position, isActive })
  ) : (
    <DefaultActionContent textContent={persistent.label} />
  );

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
          onClick: () =>
            onAction({
              run: () => {
                persistent.onClick?.();
              },
              closeOnRun: persistent.shouldClose,
            }),
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
  readonly persistent: MenuPersistent<Record<string, unknown>>;
}) {
  return <div className={styles.textPersistent}>{persistent.label}</div>;
}
