import React from "react";
import classNames from "classnames";
import type {
  ActionConfig,
  ActionOrigin,
  AutocompleteRebuiltProps,
  MenuAction,
  MenuSection,
  OptionLike,
} from "../Autocomplete.types";
import styles from "../AutocompleteRebuilt.module.css";
import type { RenderItem } from "../useAutocomplete";
import { Heading } from "../../Heading";
import { Text } from "../../Text";
import { Typography } from "../../Typography";
import { Icon } from "../../Icon";

interface MenuListProps<T extends OptionLike> {
  readonly items: Array<RenderItem<T>>;
  readonly activeIndex: number | null;
  readonly indexOffset?: number;
  readonly getItemProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
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

export function MenuList<T extends OptionLike>({
  items,
  activeIndex,
  indexOffset = 0,
  getItemProps,
  listRef,
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
        listRef,
        isOptionSelected,
        renderOption,
        getOptionLabel,
        getOptionKey,
        onSelect,
        indexOffset,
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
      listRef,
      renderAction,
      getActionKey,
      onAction,
      indexOffset,
      actionClassName: slotOverrides?.action?.className,
      actionStyle: slotOverrides?.action?.style,
      origin: item.origin,
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
    <DefaultSectionContent section={section} />
  );

  return (
    <div
      key={`sec-${getSectionKey(section)}-${index}`}
      role="presentation"
      tabIndex={-1}
      data-testid="ATL-AutocompleteRebuilt-Section"
      className={classNames(styles.section, styles.stickyTop, sectionClassName)}
      style={sectionStyle}
    >
      {headerContent}
    </div>
  );
}

function DefaultSectionContent({
  section,
}: {
  readonly section: MenuSection<OptionLike>;
}) {
  return <Heading level={5}>{section.label}</Heading>;
}

interface HandleOptionRenderingProps<T extends OptionLike> {
  readonly option: T;
  readonly activeIndex: number | null;
  readonly navigableIndex: number;
  readonly getItemProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  readonly isOptionSelected: (option: T) => boolean;
  readonly renderOption?: AutocompleteRebuiltProps<T, false>["renderOption"];
  readonly getOptionLabel: (option: T) => string;
  readonly getOptionKey: (option: T) => React.Key;
  readonly onSelect: (option: T) => void;
  readonly indexOffset?: number;
  readonly optionClassName?: string;
  readonly optionStyle?: React.CSSProperties;
}

function handleOptionRendering<T extends OptionLike>({
  option,
  activeIndex,
  navigableIndex,
  getItemProps,
  listRef,
  isOptionSelected,
  renderOption,
  getOptionLabel,
  getOptionKey,
  onSelect,
  indexOffset = 0,
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
        {...getItemProps({
          ref(node: HTMLElement | null) {
            const idx = nextNavigableIndex + indexOffset;
            if (node) listRef.current[idx] = node;
          },
          onClick: () => onSelect(option),
          className: classNames(
            styles.option,
            isActive && styles.optionActive,
            optionClassName,
          ),
          style: optionStyle,
        })}
        role="option"
        tabIndex={-1}
        aria-selected={isSelected ? true : false}
        data-index={nextNavigableIndex + indexOffset}
        data-active={isActive ? true : undefined}
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
  readonly getItemProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  readonly listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  readonly renderAction?: AutocompleteRebuiltProps<T, false>["renderAction"];
  readonly getActionKey: (
    action: MenuAction<Record<string, unknown>>,
  ) => React.Key;
  readonly onAction: (action: ActionConfig) => void;
  readonly indexOffset?: number;
  readonly actionClassName?: string;
  readonly actionStyle?: React.CSSProperties;
  readonly origin?: ActionOrigin;
}

function handleActionRendering<T extends OptionLike>({
  action,
  index,
  activeIndex,
  navigableIndex,
  getItemProps,
  listRef,
  renderAction,
  getActionKey,
  onAction,
  indexOffset = 0,
  actionClassName,
  actionStyle,
  origin,
}: HandleActionRenderingProps<T>): {
  node: React.ReactNode;
  nextNavigableIndex: number;
} {
  const nextNavigableIndex = navigableIndex + 1;
  const isActive = activeIndex === nextNavigableIndex;
  const actionContent = renderAction ? (
    renderAction({ value: action, isActive, origin })
  ) : (
    <DefaultActionContent textContent={action.label} />
  );

  const computedIndex = nextNavigableIndex + indexOffset;
  const itemProps = getItemProps({
    ref(node: HTMLElement | null) {
      if (node) {
        listRef.current[computedIndex] = node;
      }
    },
    onClick: () => {
      onAction({
        run: action.onClick,
        closeOnRun: action.shouldClose,
      });
    },
    className: classNames(
      styles.action,
      isActive && styles.actionActive,
      actionClassName,
    ),
    style: actionStyle,
  });

  return {
    node: (
      <div
        key={`act-${getActionKey(action)}-${index}`}
        {...itemProps}
        role="button"
        tabIndex={-1}
        data-testid="ATL-AutocompleteRebuilt-Action"
        data-index={computedIndex}
        data-origin={origin}
        data-active={isActive ? true : undefined}
      >
        {actionContent}
      </div>
    ),
    nextNavigableIndex,
  };
}

export function DefaultActionContent({
  textContent,
}: {
  readonly textContent: string;
}) {
  return (
    <Typography
      textColor="interactive"
      fontWeight="semiBold"
      underline="solid color-interactive"
      UNSAFE_style={{
        textStyle: {
          textDecorationThickness: "var(--border-thick)",
          textUnderlineOffset: "var(--space-smallest)",
        },
      }}
    >
      {textContent}
    </Typography>
  );
}
