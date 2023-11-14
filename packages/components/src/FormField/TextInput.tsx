import React from "react";
import styles from "./FormField.css";

export const TextInput = ({ className = "", ...rest }) => {
  return <input {...rest} className={`${styles.input} ${className}`} />;
};
