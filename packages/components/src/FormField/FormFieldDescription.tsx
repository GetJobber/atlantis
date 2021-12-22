import React from "react";
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
    <div id={id}>
      <Text variation="subdued">{description}</Text>
    </div>
  );
}
