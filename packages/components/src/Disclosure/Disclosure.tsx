import React, { ReactNode, useEffect, useState } from "react";
import { Breakpoints, useResizeObserver } from "@jobber/hooks";
import styles from "./Disclosure.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

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
  const [disclosureRef, { exactWidth }] = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <details open={isOpen} onToggle={onToggle} className={styles.details}>
      <summary className={styles.summary}>
        <div className={styles.summaryWrap} ref={disclosureRef}>
          <Typography
            element="h4"
            size={
              exactWidth && exactWidth < Breakpoints.small ? "base" : "large"
            }
            fontWeight="bold"
            textColor="heading"
          >
            {title}
          </Typography>
          <span className={styles.arrowIconWrapper}>
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
