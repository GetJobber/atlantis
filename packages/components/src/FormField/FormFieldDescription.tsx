import React from "react";
import styles from "./FormField.css";
import { Text } from "../Text";

interface FormFieldDescriptionProps {
  readonly id: string;
  readonly description: string;
}

export function FormFieldDescription({
  id,
  description,
}: FormFieldDescriptionProps) {
  return (
    <div id={id} className={styles.description}>
      <Text size="small" variation="subdued">
        {description}
      </Text>
    </div>
  );
}
