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
  readonly getItemProps: (
    args?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  readonly renderPersistent?: AutocompleteRebuiltProps<
    T,
    false
  >["renderPersistent"];
  readonly getPersistentKey: (
    item: MenuPersistent<Record<string, unknown>>,
  ) => React.Key;
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
  renderPersistent,
  getPersistentKey,
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
      {items.map((persistent, index) => {
        const result = handlePersistentRendering({
          persistent,
          position,
          activeIndex,
          indexOffset,
          getItemProps,
          renderPersistent,
          getPersistentKey,
          listRef,
          onAction,
          index,
          navigableIndex,
        });

        navigableIndex = result.nextNavigableIndex;

        return result.node;
      })}
    </div>
  );
}

interface HandlePersistentRenderingProps<T extends OptionLike> {
  readonly renderPersistent?: AutocompleteRebuiltProps<
    T,
    false
  >["renderPersistent"];
  readonly getPersistentKey: (
    item: MenuPersistent<Record<string, unknown>>,
  ) => React.Key;
  readonly position: "header" | "footer";
  readonly activeIndex: number | null;
  readonly indexOffset: number;
  readonly getItemProps: (
    args?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly persistent: MenuPersistent<Record<string, unknown>>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  readonly onAction: (action: ActionConfig) => void;
  readonly index: number;
  readonly navigableIndex: number;
}

function handlePersistentRendering<T extends OptionLike>({
  persistent,
  position,
  activeIndex,
  indexOffset,
  getItemProps,
  renderPersistent,
  getPersistentKey,
  listRef,
  onAction,
  index,
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
      renderPersistent,
      getPersistentKey,
      index,
    });

    return { node, nextNavigableIndex: navigableIndex };
  }

  return handleActionPersistentRendering({
    persistent,
    position,
    activeIndex,
    indexOffset,
    getItemProps,
    renderPersistent,
    getPersistentKey,
    listRef,
    onAction,
    index,
    navigableIndex,
  });
}

function handleTextPersistentRendering<T extends OptionLike>({
  persistent,
  position,
  renderPersistent,
  getPersistentKey,
  index,
}: Pick<
  HandlePersistentRenderingProps<T>,
  "persistent" | "position" | "renderPersistent" | "getPersistentKey" | "index"
>): React.ReactNode {
  const content = renderPersistent ? (
    renderPersistent({ value: persistent, position })
  ) : (
    <DefaultTextPersistentContent persistent={persistent} />
  );

  return (
    <div
      key={`per-${String(getPersistentKey(persistent))}-${index}`}
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
  renderPersistent,
  getPersistentKey,
  listRef,
  onAction,
  index,
  navigableIndex,
}: HandlePersistentRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === indexOffset + nextNavigableIndex;
  const content = renderPersistent ? (
    renderPersistent({ value: persistent, position, isActive })
  ) : (
    <DefaultActionContent textContent={persistent.label} />
  );

  return {
    node: (
      <div
        key={`per-${String(getPersistentKey(persistent))}-${index}`}
        data-index={indexOffset + nextNavigableIndex}
        data-active={isActive ? true : undefined}
        {...getItemProps({
          ref(persistNode: HTMLElement | null) {
            const idx = indexOffset + nextNavigableIndex;
            if (persistNode) listRef.current[idx] = persistNode;
          },
          onClick: () =>
            onAction({
              run: persistent.onClick as () => void,
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
