import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import { Icon } from "../Icon";
import { LinkProps } from "./Link.types";
import styles from "./Link.module.css";

export function Link({
  url,
  children,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  ariaHaspopup,
  external = false,
  variation = "work",
  type = "primary",
  size = "base",
  fullWidth = false,
  icon,
  iconOnRight = false,
  disabled = false,
  loading = false,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: PropsWithChildren<LinkProps>) {
  const linkClassNames = classnames(
    styles.link,
    styles[size],
    styles[variation],
    styles[type],
    {
      [styles.disabled]: disabled,
      [styles.fullWidth]: fullWidth,
      [styles.loading]: loading,
      [styles.withIcon]: !!icon,
      [styles.iconOnly]: !!icon && !children,
    },
    UNSAFE_className.container
  );

  const content = (
    <>
      {icon && !iconOnRight && (
        <Icon name={icon} size={size === "small" ? "small" : "base"} />
      )}
      {children && <span className={styles.label}>{children}</span>}
      {icon && iconOnRight && (
        <Icon name={icon} size={size === "small" ? "small" : "base"} />
      )}
    </>
  );

  if (disabled) {
    return (
      <span
        className={linkClassNames}
        style={UNSAFE_style.container}
        aria-label={ariaLabel}
        aria-disabled="true"
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={url}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...(ariaLabel && { "aria-label": ariaLabel })}
      {...(ariaExpanded && { "aria-expanded": ariaExpanded })}
      {...(ariaControls && { "aria-controls": ariaControls })}
      {...(ariaHaspopup && { "aria-haspopup": ariaHaspopup })}
      className={linkClassNames}
      style={UNSAFE_style.container}
    >
      {content}
    </a>
  );
}
