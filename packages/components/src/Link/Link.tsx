import React, { PropsWithChildren } from "react";
import styles from "./Link.css";

interface LinkProps {
  readonly ariaLabel?: string;
  readonly external?: boolean;
  readonly url: string;
}

export function Link({
  ariaLabel,
  external = false,
  url,
  children,
}: PropsWithChildren<LinkProps>) {
  const linkProps = {
    ...(external && { target: "_blank" }),
    href: url,
    ...(ariaLabel && { "aria-label": ariaLabel }),
  };

  return (
    <a className={styles.link} {...linkProps}>
      {children}
    </a>
  );
}
