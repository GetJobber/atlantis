import React from "react";
import { IconNames } from "@jobber/design";
import styles from "./FormField.css";
import { FormFieldProps } from "./FormFieldTypes";
import { Icon } from "../Icon";

export function Affix(props: FormFieldProps) {
  function getPrefixText(text: string | number) {
    if (text) {
      return <span className={styles.prefixText}>{text}</span>;
    }
    return;
  }

  function isPrefix() {
    return props.prefixIcon || props.prefixText ? true : false;
  }

  function isPostfix() {
    return props.postfixIcon || props.postfixText ? true : false;
  }

  function getPostfixIcon(icon: IconNames) {
    if (icon) {
      return (
        <span className={styles.postfixIcon}>
          <Icon size={props.size} name={icon}></Icon>
        </span>
      );
    }
    return;
  }

  function getPostfixText(text: string | number) {
    if (text) {
      return <span className={styles.postfixText}>{text}</span>;
    }
    return;
  }

  function getPrefixIcon(icon: IconNames) {
    if (icon) {
      return (
        <span className={styles.prefixIcon}>
          <Icon size={props.size} name={icon}></Icon>
        </span>
      );
    }
    return;
  }

  function prefix() {
    return (
      <div className={styles.prefixes}>
        {props.prefixIcon && getPrefixIcon(props.prefixIcon)}
        {props.prefixText && getPrefixText(props.prefixText)}
      </div>
    );
  }

  function postfix() {
    return (
      <div className={styles.postfixes}>
        {props.postfixText && getPostfixText(props.postfixText)}
        {props.postfixIcon && getPostfixIcon(props.postfixIcon)}
      </div>
    );
  }

  return (
    <>
      {isPrefix() ? prefix() : false}
      {isPostfix() ? postfix() : false}
    </>
  );
}
