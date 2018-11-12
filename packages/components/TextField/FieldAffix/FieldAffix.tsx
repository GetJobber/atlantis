import classnames from "classnames";
import React from "react";
import styles from "./FieldAffix.css";

export default function FieldAffix({ position, children }) {
  if (children === undefined) {
    return null;
  }

  const classes = classnames([styles[position], styles.fieldAffix]);

  return <div className={classes}>{children}</div>;
}
