import React, { ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  readonly children: ReactNode;
  /**
   * Callback for when the form has been sucessfully
   * submitted.
   */
  onSubmit?(): void;

  onStateChange?(formState: { isDirty: boolean; isValid: boolean }): void;
}

export function Form({ onSubmit, children, onStateChange }: FormProps) {
  const methods = useForm({ mode: "onTouched" });
  const { handleSubmit, formState } = methods;
  const { isDirty, isValid } = formState;

  useEffect(() => {
    onStateChange && onStateChange({ isDirty, isValid });
  }, [isDirty, isValid]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );

  async function submitHandler() {
    onSubmit && onSubmit();
  }
}
