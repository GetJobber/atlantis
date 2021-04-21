import React, { ReactNode, useEffect, useState } from "react";
import classnames from "classnames";
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
  const [isOpen, setOpen] = useState(defaultOpen);
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const arrowIconWrapperClassName = classnames(styles.arrowIconWrapper, {
    [styles.flippedVertical]: isOpen,
  });

  return (
    <details open={isOpen} onToggle={onToggle} className={styles.details}>
      <summary className={styles.summary}>
        <div className={styles.summaryWrap}>
          <Heading level={4}>{title}</Heading>
          <span className={arrowIconWrapperClassName}>
            <Icon size="large" name="arrowDown" color="green" />
          </span>
        </div>
      </summary>
      <span className={styles.content}>{children}</span>
    </details>
  );

  function onToggle(event: React.MouseEvent<HTMLDetailsElement>) {
    event.preventDefault();
    const { open: currentToggleState } = event.target as HTMLDetailsElement;

    if (!isMounted || currentToggleState === isOpen) {
      return;
    }

    setOpen(!currentToggleState);
  }
}
