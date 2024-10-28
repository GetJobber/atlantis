import React, { ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";
import styles from "./Disclosure.module.css";
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

  /**
   * Callback that is called when the disclosure is toggled.
   */
  readonly onToggle?: (newOpened: boolean) => void;

  /**
   * Used to make the disclosure a Controlled Component.
   */
  readonly open?: boolean;
}

export function Disclosure({
  children,
  title,
  defaultOpen = false,
  onToggle,
  open,
}: DisclosureProps) {
  const [internalOpen, setInternalOpen] = useState(
    defaultOpen || open || false,
  );
  const isOpen = open !== undefined ? open : internalOpen;
  const { smallAndUp } = useBreakpoints();
  const isTitleString = typeof title === "string";

  return (
    <details open={isOpen} className={styles.details}>
      <summary className={styles.summary} onClick={handleToggle}>
        <div
          className={classnames(styles.summaryWrap, {
            [styles.customSummaryWrap]: !isTitleString,
          })}
        >
          <DisclosureTitle
            title={title}
            size={smallAndUp ? "large" : "base"}
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

  function handleToggle(event: React.MouseEvent<HTMLDetailsElement>) {
    event.preventDefault();

    setInternalOpen(!isOpen);
    onToggle?.(!isOpen);
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
