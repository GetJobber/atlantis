import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./Disclosure.css";
import { Content } from "../Content";
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
  const arrowIconWrapperClassName = classnames(styles.arrowIconWrapper, {
    [styles.flippedVertical]: isOpen,
  });

  return (
    <details open={isOpen} onClick={onToggle} className={detailsClassName}>
      <summary className={summaryClassName}>
        <Heading level={4}>
          <summary>{title}</summary>
        </Heading>
        <span className={arrowIconWrapperClassName}>
          <Icon size="large" name="arrowDown" color="green" />
        </span>
      </summary>
      <span className={contentClassName}>
        <Content>{children}</Content>
      </span>
    </details>
  );

  function onToggle(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    setOpen(!isOpen);

    if (onRequestToggle) {
      onRequestToggle(!isOpen);
    }
  }
}
