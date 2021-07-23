import React from "react";
import classnames from "classnames";
import styles from "./AffixInput.css";
import { Icon } from "../Icon";
import { FormField, FormFieldProps } from "../FormField";

interface AffixInputProps {
  /**
   * Does component have a prefix field
   * @default false
   */
  prefix?: boolean;

  /**
   * Does component have a postfix field
   * @default false
   */
  postfix?: boolean;

  /**
   *  Prefix field text if any
   * @default null
   */
  prefixText?: string;

  /**
   * Postfix fext if any
   * @default null
   */
  postfixText?: string;

  /**
   * prefix icon name if any
   * @default null
   */
  prefixIcon?: string;

  /**
   * POstfix icon if any
   * @default null
   */
  postfixIcon?: string;

  /**
   * Tooltip text if any
   * @default null
   */
  tooltipText?: string;

  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * MouseOver handler.
   */
  onMouseOver?(): void;

  /**
   * Focus handler.
   */
  onFocus?(): void;

  formFieldProps: FormFieldProps;
}

export function AffixInput({
  prefix,
  postfix,
  prefixText,
  postfixText,
  prefixIcon,
  postfixIcon,
  onMouseOver,
  onFocus,
  formFieldProps,
}: AffixInputProps) {
  const className = classnames(styles.affixInput, { [styles.bold]: true });

  function isPrefix() {
    if (prefix) {
      return (
        <>
          <span>{prefixText}</span>
          <Icon name={prefixIcon} />
        </>
      );
    }
  }

  function isPostfix() {
    if (postfix) {
      return (
        <>
          <Icon
            name={postfixIcon}
            onMouseOver={onMouseOver}
            onFocus={onFocus}
          />
          <span>{postfixText}</span>
        </>
      );
    }
  }

  return (
    <div className={className}>
      {isPrefix}
      <FormField {...formFieldProps} />
      {isPostfix}
    </div>
  );
}
