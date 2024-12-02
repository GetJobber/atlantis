import React from "react";
import styles from "./FormField.module.css";
import { Text } from "../Text";

interface FormFieldDescriptionProps {
  readonly id: string;
  readonly description?: string;
  readonly visible?: boolean;
}

export function FormFieldDescription({
  id,
  description,
  visible = true,
}: FormFieldDescriptionProps) {
  if (!visible) return null;

  return (
    <div id={id} className={styles.description}>
      <Text size="small" variation="subdued">
        {description}
      </Text>
    </div>
  );
}
