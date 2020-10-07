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
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  useEffect(() => onStateChange && onStateChange({ isDirty, isValid }), [
    isDirty,
    isValid,
  ]);

  /**
   * If an onSubmit is not passed into a form, it will only be used
   * for validation. For that, we do not need to wrap it in a <form>
   * tag. This allows the <Form> component to be used in legacy code.
   */
  const Wrapper = onSubmit ? "form" : "div";

  const formProps = {
    onSubmit: onSubmit && handleSubmit(submitHandler),
  };

  return (
    <FormProvider {...methods}>
      <Wrapper {...formProps} data-testid="atlantis-form">
        {children}
      </Wrapper>
    </FormProvider>
  );

  function submitHandler() {
    onSubmit && onSubmit();
  }
}
