import React, { ReactNode, useEffect, useState } from "react";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import styles from "./Disclosure.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

interface DisclosureProps {
  /**
   * Child content that is managed by this component.
   */
  readonly children: ReactNode | ReactNode[];

  /**
   * Title for the disclosure pane.
   */
  readonly title: string;

  /**
   * Override the summary of the Disclosure with custom React content.
   */
  readonly customSummary?: ReactNode;

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
  customSummary,
  defaultOpen = false,
}: DisclosureProps) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const [isMounted, setMount] = useState(false);
  const [titleRef, { exactWidth }] = useResizeObserver<HTMLDivElement>();
  const isBelowBreakpoint = exactWidth && exactWidth < Breakpoints.small;

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <details open={isOpen} onToggle={onToggle} className={styles.details}>
      <summary className={styles.summary}>
        <div className={styles.summaryWrap} ref={titleRef}>
          {customSummary ? (
            customSummary
          ) : (
            <Typography
              element="h4"
              size={isBelowBreakpoint ? "base" : "large"}
              fontWeight="bold"
              textColor="heading"
            >
              {title}
            </Typography>
          )}
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
