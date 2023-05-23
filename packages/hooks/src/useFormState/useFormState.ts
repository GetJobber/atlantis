import { useState } from "react";

export function useFormState() {
  const [formState, setFormState] = useState({
    isDirty: false,
    isValid: true,
  });

  return [formState, setFormState] as const;
}
