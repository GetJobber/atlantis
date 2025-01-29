import React, { RefObject, useRef } from "react";
import classnames from "classnames";
import { ActionProps } from "./types";
import styles from "./Action.module.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export function Action({
  label,
  sectionLabel,
  icon,
  destructive,
  onClick,
}: ActionProps) {
  const actionButtonRef = useRef() as RefObject<HTMLButtonElement>;
  const buttonClasses = classnames(styles.action, {
    [styles.destructive]: destructive,
  });

  return (
    <button
      role="menuitem"
      type="button"
      className={buttonClasses}
      key={label}
      onClick={onClick}
      ref={actionButtonRef}
    >
      {icon && (
        <div>
          <Icon color={destructive ? "destructive" : undefined} name={icon} />
        </div>
      )}
      <Typography element="span" fontWeight="semiBold" textColor="text">
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </button>
  );
}
