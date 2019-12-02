import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

// TODO: area label (accessibility)
export function Spinner() {
  const className = classnames(styles.spinner);

  return <div className={className}></div>;
}
