import { useState } from "react";

export function useFormState() {
  const [formState, setFormState] = useState({
    isDirty: false,
    isValid: false,
  });

  return [formState, setFormState] as const;
}
