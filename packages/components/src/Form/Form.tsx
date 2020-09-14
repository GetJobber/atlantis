import React, { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  readonly children: ReactNode;
  /**
   * Callback for when the form has been sucessfully
   * submitted.
   */
  onSubmit?(): void;
}

export function Form({ onSubmit, children }: FormProps) {
  const methods = useForm({ mode: "onTouched" });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );

  async function submitHandler() {
    onSubmit && onSubmit();
  }
}
