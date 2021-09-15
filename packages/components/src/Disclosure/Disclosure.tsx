import React, { ReactNode, useState } from "react";
import styles from "./Disclosure.css";
import { Heading } from "../Heading";
import { Icon } from "../Icon";

interface DisclosureProps {
  /**
   * Child content that is manged by this component.
   */
  readonly children: ReactNode | ReactNode[];

  /**
   * Title for the disclosure pane.
   */
  readonly title: string;

  /**
   * This sets the default open state of the disclosure.
   * By default the disclosure is closed.
   * For use when the component is being used as an Uncontrolled Component.
   * @default false
   */
  readonly defaultOpen?: boolean;
}

export function Disclosure({
  children,
  title,
  defaultOpen = false,
}: DisclosureProps) {
  const [isOpen] = useState(defaultOpen);

  return (
    <details open={isOpen} className={styles.details}>
      <summary className={styles.summary}>
        <div className={styles.summaryWrap}>
          <Heading level={4}>{title}</Heading>
          <span className={styles.arrowIconWrapper}>
            <Icon size="large" name="arrowDown" color="green" />
          </span>
        </div>
      </summary>
      <span className={styles.content}>{children}</span>
    </details>
  );
}
