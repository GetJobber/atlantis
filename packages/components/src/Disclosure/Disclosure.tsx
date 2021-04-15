import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./Disclosure.css";
import { Heading } from "../Heading";
import { Icon } from "../Icon";

export interface DisclosureProps {
  /**
   * Child content that is manged by this component.
   */
  readonly children: ReactNode | ReactNode[];

  /**
   * Title for the disclosure pane.
   */
  readonly title: string;

  /**
   * Control if the disclosure component is open or closed.
   */
  readonly open?: boolean;

  /**
   * This sets the default open state of the disclosure.
   * By default the disclosure is closed.
   * For use when the component is being used as an Uncontrolled Component.
   * @default false
   */
  readonly defaultOpen?: boolean;

  /**
   * This function would toggle the open state.
   * For use when the component is being used as a Controlled Component.
   */
  onRequestToggle?(isOpen: boolean): void;
}

export function Disclosure({
  children,
  title,
  open,
  defaultOpen = false,
  onRequestToggle,
}: DisclosureProps) {
  const [isOpen, setOpen] = useState(open || defaultOpen);

  const summaryClassName = classnames(styles.summary);
  const detailsClassName = classnames(styles.details);
  const contentClassName = classnames(styles.content);
  const summaryWrapClassName = classnames(styles.summaryWrap);
  const arrowIconWrapperClassName = classnames(styles.arrowIconWrapper, {
    [styles.flippedVertical]: isOpen,
  });

  return (
    <details open={isOpen} onToggle={onToggle} className={detailsClassName}>
      <summary className={summaryClassName}>
        <div className={summaryWrapClassName}>
          <Heading level={4}>{title}</Heading>
          <span className={arrowIconWrapperClassName}>
            <Icon size="large" name="arrowDown" color="green" />
          </span>
        </div>
      </summary>
      <span className={contentClassName}>{children}</span>
    </details>
  );

  function onToggle(event: React.MouseEvent<HTMLDetailsElement>) {
    event.preventDefault();

    setOpen(!isOpen);

    if (onRequestToggle) {
      onRequestToggle(!isOpen);
    }
  }
}
