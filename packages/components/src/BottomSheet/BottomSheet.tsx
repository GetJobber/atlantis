import type { CSSProperties, ReactElement } from "react";
import React from "react";
import classnames from "classnames";
import {
  ActionListHeader,
  ActionListHeaderLabel,
  ActionListItem,
  ActionListItemIcon,
  ActionListItemLabel,
  ActionListSection,
  ActionListSeparator,
  actionListStyles,
} from "../private/styledPrimitives/ActionList/ActionList";
import {
  Drawer,
  useDrawerRequestClose,
} from "../private/styledPrimitives/Drawer/Drawer";
import type { ActionListItemProps } from "../private/styledPrimitives/ActionList/ActionList.types";
import type {
  DrawerContentProps,
  DrawerRootProps,
  DrawerTriggerProps,
} from "../private/styledPrimitives/Drawer/Drawer.types";

export interface BottomSheetProps extends DrawerRootProps {
  readonly ariaLabel?: string;
  readonly trigger?: React.ReactNode;
}

const BottomSheetItemSurface = React.forwardRef<
  HTMLElement,
  ActionListItemProps
>(function BottomSheetItemSurface(props, ref) {
  const requestClose = useDrawerRequestClose();
  const { style, className, children, variation, textValue } = props;
  const itemClassName = classnames(
    actionListStyles.action,
    actionListStyles.ariaItem,
    className,
  );

  if (props.href) {
    const { href, target, rel, onClick } = props;

    return (
      <a
        className={itemClassName}
        href={href}
        onClick={event => {
          onClick?.(event);
          requestClose?.();
        }}
        ref={ref as React.Ref<HTMLAnchorElement>}
        rel={rel}
        style={style as CSSProperties}
        target={target}
      >
        <ActionListItem textValue={textValue} variation={variation}>
          {children}
        </ActionListItem>
      </a>
    );
  }

  return (
    <button
      className={itemClassName}
      onClick={() => {
        props.onClick?.();
        requestClose?.();
      }}
      ref={ref as React.Ref<HTMLButtonElement>}
      style={style}
      type="button"
    >
      <ActionListItem textValue={textValue} variation={variation}>
        {children}
      </ActionListItem>
    </button>
  );
});

const BottomSheetTriggerSurface = React.forwardRef<
  HTMLDivElement,
  DrawerTriggerProps
>(function BottomSheetTriggerSurface(
  { ariaLabel, children, style, className },
  ref,
) {
  return (
    <Drawer.Trigger
      ariaLabel={ariaLabel}
      ref={ref}
      className={classnames(actionListStyles.triggerWrapper, className)}
      style={style}
    >
      {children}
    </Drawer.Trigger>
  );
});

function BottomSheetContent({
  children,
  style,
  className,
}: DrawerContentProps) {
  return (
    <Drawer.Portal>
      <Drawer.Backdrop className={actionListStyles.overlay} />
      <Drawer.Popup className={actionListStyles.popup}>
        <Drawer.Content
          className={classnames(
            actionListStyles.menu,
            actionListStyles.ariaMenu,
            actionListStyles.content,
            className,
          )}
          style={style}
        >
          {children}
        </Drawer.Content>
      </Drawer.Popup>
    </Drawer.Portal>
  );
}

function BottomSheetRoot({
  ariaLabel,
  children,
  onOpenChange,
  open,
  defaultOpen,
  trigger,
}: BottomSheetProps): ReactElement {
  return (
    <Drawer defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger ? (
        <>
          <BottomSheetTriggerSurface ariaLabel={ariaLabel}>
            {trigger}
          </BottomSheetTriggerSurface>
          <BottomSheetContent>{children}</BottomSheetContent>
        </>
      ) : (
        children
      )}
    </Drawer>
  );
}

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTriggerSurface,
  Content: BottomSheetContent,
  Section: ActionListSection,
  Header: ActionListHeader,
  HeaderLabel: ActionListHeaderLabel,
  Item: BottomSheetItemSurface,
  ItemIcon: ActionListItemIcon,
  ItemLabel: ActionListItemLabel,
  Separator: ActionListSeparator,
});
