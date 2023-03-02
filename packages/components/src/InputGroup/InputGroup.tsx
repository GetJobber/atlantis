import React, { ReactElement } from "react";
import classnames from "classnames";
import styles from "./InputGroup.css";

interface InputGroupProps {
  readonly children: ReactElement | ReactElement[];
  /**
   * Determine the direction the fields are laid out in.
   * @default "vertical"
   */
  readonly flowDirection?: "horizontal" | "vertical";
}

export function InputGroup({
  children,
  flowDirection = "vertical",
}: InputGroupProps) {
  if (isInvalidGroupNesting(children)) return <></>;

  const className = classnames(styles.inputGroup, styles[flowDirection]);
  return <div className={className}>{children}</div>;
}

function isInvalidGroupNesting(childs: ReactElement | ReactElement[]): boolean {
  return (React.Children.toArray(childs) as ReactElement[]).some(child => {
    if (
      child.type === InputGroup &&
      child.props.flowDirection != "horizontal"
    ) {
      console.error(
        `ERROR: InputGroup not rendered: nesting 'flowDirection="vertical"' columns not supported.`,
        `https://atlantis.getjobber.com/?path=/docs/components-inputgroup--input-group#nested-example`,
      );
      return true;
    }

    return false;
  });
}
