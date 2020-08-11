import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export function Form({ onSubmit, children }: any) {
  const methods = useForm({ mode: "onBlur" });
  const { handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      {JSON.stringify(formState)}
    </FormProvider>
  );
}
