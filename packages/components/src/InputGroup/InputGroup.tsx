import type { ReactElement } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./InputGroup.module.css";

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

function isInputGroupElement(
  node: unknown,
): node is React.ReactElement<InputGroupProps, typeof InputGroup> {
  return React.isValidElement(node) && node.type === InputGroup;
}

function isInvalidGroupNesting(childs: ReactElement | ReactElement[]): boolean {
  return React.Children.toArray(childs).some(child => {
    if (
      isInputGroupElement(child) &&
      child.props.flowDirection !== "horizontal"
    ) {
      console.error(
        `ERROR: InputGroup not rendered: nesting 'flowDirection="vertical"' columns not supported.`,
        `https://atlantis.getjobber.com/?path=/story/components-forms-and-inputs-inputgroup-web--nested`,
      );

      return true;
    }

    return false;
  });
}
