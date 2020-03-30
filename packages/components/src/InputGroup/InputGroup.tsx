import React, { ReactElement } from "react";
import classnames from "classnames";
import styles from "./InputGroup.css";

interface InputGroupProps {
  readonly children: ReactElement | ReactElement[];
  readonly flowDirection?: "horizontal" | "vertical";
}

export function InputGroup({
  children,
  flowDirection = "vertical",
}: InputGroupProps) {
  if (checkChildren(children)) return <></>;

  const className = classnames(styles.inputGroup, styles[flowDirection]);
  return <div className={className}>{children}</div>;
}

function checkChildren(childs: ReactElement | ReactElement[]): boolean {
  return React.Children.toArray(childs).some(child => {
    if (
      child.type === InputGroup &&
      child.props.flowDirection != "horizontal"
    ) {
      console.error(
        "ERROR: InputGroup not rendered: nesting " +
          "flowDirection = vertical columns not supported.",
      );
      return true;
    }

    return false;
  });
}
