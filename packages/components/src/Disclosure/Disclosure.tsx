import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import classnames from "classnames";
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
   * If ReactElement[] is provided, it must be wrapped in a container element (not a Fragment).
   */
  readonly title: string | ReactElement | ReactElement[];

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
  const [titleRef, { exactWidth }] = useResizeObserver<HTMLDivElement>();
  const isBelowBreakpoint = exactWidth && exactWidth < Breakpoints.small;
  const isTitleString = typeof title === "string";

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <details open={isOpen} onToggle={onToggle} className={styles.details}>
      <summary className={styles.summary}>
        <div
          className={classnames(styles.summaryWrap, {
            [styles.customSummaryWrap]: !isTitleString,
          })}
          ref={titleRef}
        >
          <DisclosureTitle
            title={title}
            size={isBelowBreakpoint ? "base" : "large"}
            isTitleString={isTitleString}
          />
          <span className={styles.arrowIconWrapper}>
            <Icon name="arrowDown" color="interactive" />
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

interface DisclosureTitleProps {
  /**
   * Title for the disclosure pane.
   */
  readonly title: string | ReactNode | ReactNode[];
  /**
   * Size when the title is a string.
   */
  readonly size: "base" | "large";
  /**
   * Whether the title is a string.
   */
  readonly isTitleString: boolean;
}

function DisclosureTitle({ title, size, isTitleString }: DisclosureTitleProps) {
  if (!isTitleString) return <>{title}</>;

  return (
    <Typography element="h4" size={size} fontWeight="bold" textColor="heading">
      {title}
    </Typography>
  );
}
