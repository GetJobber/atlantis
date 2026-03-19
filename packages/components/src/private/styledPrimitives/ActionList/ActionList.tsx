import React from "react";
import classnames from "classnames";
import type {
  ActionListHeaderLabelProps,
  ActionListHeaderProps,
  ActionListItemIconProps,
  ActionListItemLabelProps,
  ActionListItemProps,
  ActionListSectionProps,
  ActionListSeparatorProps,
} from "./ActionList.types";
import styles from "./ActionList.module.css";
import { Typography } from "../../../Typography";
import { Icon } from "../../../Icon";

export const actionListStyles = styles;

export function ActionListSection({
  children,
  style,
  className,
  ariaLabel,
}: ActionListSectionProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={classnames(styles.ariaSection, className)}
      style={style}
    >
      {children}
    </div>
  );
}

export function ActionListHeader({
  children,
  style,
  className,
}: ActionListHeaderProps) {
  return (
    <header
      className={classnames(
        styles.sectionHeader,
        styles.ariaSectionHeader,
        className,
      )}
      style={style}
    >
      {children}
    </header>
  );
}

export function ActionListHeaderLabel(props: ActionListHeaderLabelProps) {
  return (
    <Typography
      element="h6"
      fontWeight="regular"
      size="base"
      textCase="none"
      textColor="textSecondary"
    >
      {props.children}
    </Typography>
  );
}

export function ActionListItem({
  children,
  variation,
  style,
  className,
}: ActionListItemProps) {
  return (
    <div
      className={classnames(styles.action, styles.ariaItem, className)}
      data-variation={variation}
      style={style}
    >
      {children}
    </div>
  );
}

export function ActionListItemIcon(props: ActionListItemIconProps) {
  return (
    <div data-menu-slot="icon">
      <Icon {...props} />
    </div>
  );
}

export function ActionListItemLabel(props: ActionListItemLabelProps) {
  return (
    <div data-menu-slot="label">
      <Typography element="span" fontWeight="semiBold" textColor="text">
        {props.children}
      </Typography>
    </div>
  );
}

export function ActionListSeparator({
  style,
  className,
}: ActionListSeparatorProps) {
  return (
    <div
      aria-orientation="horizontal"
      className={classnames(styles.separator, className)}
      data-testid="ATL-Menu-Separator"
      role="separator"
      style={style}
    />
  );
}
