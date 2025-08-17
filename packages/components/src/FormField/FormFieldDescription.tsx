import type { ReactNode } from "react";
import React from "react";
import styles from "./FormField.module.css";
import { Text } from "../Text";

interface FormFieldDescriptionProps {
  readonly id: string;
  readonly description?: ReactNode;
  readonly visible?: boolean;
}

export function FormFieldDescription({
  id,
  description,
  visible = true,
}: FormFieldDescriptionProps) {
  if (!visible) return null;

  const useStringFormat = !description || typeof description === "string";

  return (
    <div id={id} className={styles.description}>
      {useStringFormat ? (
        <Text size="small" variation="subdued">
          {description}
        </Text>
      ) : (
        description
      )}
    </div>
  );
}
