import type { ReactElement } from "react";
import React from "react";
import classnames from "classnames";
import { MENU_OFFSET } from "./constants";
import type {
  MenuComposableProps,
  MenuContentComposableProps,
  MenuHeaderComposableProps,
  MenuItemComposableProps,
  MenuSectionComposableProps,
  MenuSeparatorComposableProps,
  MenuTriggerComposableProps,
} from "./Menu.types";
import {
  ActionListHeaderLabel,
  ActionListItem,
  ActionListItemIcon,
  ActionListItemLabel,
  actionListStyles,
} from "../private/styledPrimitives/ActionList/ActionList";
import { MenuPrimitive } from "../private/primitives/Menu/Menu";

function MenuSectionSurface({
  children,
  style,
  className,
  ariaLabel,
}: MenuSectionComposableProps) {
  return (
    <MenuPrimitive.Group
      aria-label={ariaLabel}
      className={classnames(actionListStyles.ariaSection, className)}
      style={style}
    >
      {children}
    </MenuPrimitive.Group>
  );
}

function MenuHeaderSurface({
  children,
  style,
  className,
}: MenuHeaderComposableProps) {
  return (
    <MenuPrimitive.GroupLabel
      className={classnames(
        actionListStyles.sectionHeader,
        actionListStyles.ariaSectionHeader,
        className,
      )}
      render={<header />}
      style={style}
    >
      {children}
    </MenuPrimitive.GroupLabel>
  );
}

const MenuItemSurface = React.forwardRef<HTMLElement, MenuItemComposableProps>(
  function MenuItemSurface(props, ref) {
    const { style, className, variation, children } = props;
    const itemClassName = classnames(
      actionListStyles.action,
      actionListStyles.ariaItem,
      className,
    );

    if (props.href) {
      const { href, onClick, rel, target, textValue } = props;

      return (
        <MenuPrimitive.LinkItem
          ref={ref}
          className={itemClassName}
          closeOnClick={true}
          href={href}
          label={textValue}
          onClick={onClick as ((event: React.MouseEvent) => void) | undefined}
          rel={rel}
          style={style}
          target={target}
        >
          <ActionListItem variation={variation} textValue={textValue}>
            {children}
          </ActionListItem>
        </MenuPrimitive.LinkItem>
      );
    }

    return (
      <MenuPrimitive.Item
        ref={ref}
        className={itemClassName}
        label={props.textValue}
        onClick={() => {
          props.onClick?.();
        }}
        style={style}
      >
        <ActionListItem variation={variation} textValue={props.textValue}>
          {children}
        </ActionListItem>
      </MenuPrimitive.Item>
    );
  },
);

function MenuSeparatorSurface({
  style,
  className,
}: MenuSeparatorComposableProps) {
  return (
    <MenuPrimitive.Separator
      className={classnames(actionListStyles.separator, className)}
      data-testid="ATL-Menu-Separator"
      style={style}
    />
  );
}

const MenuTriggerSurface = React.forwardRef<
  HTMLDivElement,
  MenuTriggerComposableProps
>(function MenuTriggerSurface({ ariaLabel, children, style, className }, ref) {
  const render = (
    <div
      className={classnames(actionListStyles.triggerWrapper, className)}
      ref={ref}
      role="button"
      style={style}
    />
  );

  return (
    <MenuPrimitive.Trigger
      aria-label={ariaLabel}
      nativeButton={false}
      render={render}
    >
      {children}
    </MenuPrimitive.Trigger>
  );
});

function MenuContentSurface({
  children,
  style,
  className,
}: MenuContentComposableProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align="start"
        className={actionListStyles.positioner}
        collisionPadding={MENU_OFFSET}
        positionMethod="fixed"
        side="bottom"
        sideOffset={MENU_OFFSET}
      >
        <MenuPrimitive.Popup
          className={classnames(
            actionListStyles.menu,
            actionListStyles.ariaMenu,
            actionListStyles.popoverMenu,
            className,
          )}
          data-elevation="elevated"
          style={style}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export function MenuPopoverComposable({
  ariaLabel,
  children,
  onOpenChange,
  open,
  defaultOpen,
  trigger,
}: MenuComposableProps): ReactElement {
  return (
    <MenuPrimitive.Root
      defaultOpen={defaultOpen}
      modal={false}
      open={open}
      onOpenChange={isOpen => {
        onOpenChange?.(isOpen);
      }}
    >
      {trigger ? (
        <>
          <MenuTriggerComposable ariaLabel={ariaLabel}>
            {trigger}
          </MenuTriggerComposable>
          <MenuContentComposable>{children}</MenuContentComposable>
        </>
      ) : (
        children
      )}
    </MenuPrimitive.Root>
  );
}

export const MenuItemIconComposable = ActionListItemIcon;
export const MenuItemLabelComposable = ActionListItemLabel;
export const MenuHeaderLabel = ActionListHeaderLabel;
export const MenuTriggerComposable = MenuTriggerSurface;
export const MenuContentComposable = MenuContentSurface;
export const MenuSectionComposable = MenuSectionSurface;
export const MenuHeaderComposable = MenuHeaderSurface;
export const MenuItemComposable = MenuItemSurface;
export const MenuSeparatorComposable = MenuSeparatorSurface;
export const MenuPopover = Object.assign(MenuPopoverComposable, {
  Trigger: MenuTriggerComposable,
  Content: MenuContentComposable,
  Section: MenuSectionComposable,
  Header: MenuHeaderComposable,
  Item: MenuItemComposable,
  Separator: MenuSeparatorComposable,
  ItemIcon: MenuItemIconComposable,
  ItemLabel: MenuItemLabelComposable,
  HeaderLabel: MenuHeaderLabel,
});
