import React, {
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  ErrorOption,
  FormProvider,
  NestedValue,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";

export interface FormRef {
  submit(): void;
}

interface FormProps {
  readonly children: ReactNode;
  /**
   * Callback for when the form has been sucessfully
   * submitted.
   */
  onSubmit?(data: UnpackNestedValue<NestedValue>): void;

  onStateChange?(formState: { isDirty: boolean; isValid: boolean }): void;
}

export const Form = forwardRef(function InternalForm(
  { onSubmit, children, onStateChange }: FormProps,
  ref: Ref<FormRef>,
) {
  const methods = useForm({ mode: "onTouched" });
  const {
    errors,
    trigger,
    handleSubmit,
    formState: { isDirty, isValid },
    getValues,
  } = methods;

  useEffect(
    () => onStateChange && onStateChange({ isDirty, isValid }),
    [isDirty, isValid],
  );

  useImperativeHandle(ref, () => ({
    /**
     * The `trigger()` method can also accept an array
     * of fields to validate. We may at some point want
     * to consider adding a `validate()` method to the
     * `Form` component.
     */
    submit: async () => {
      const valid = await trigger();

      if (valid) {
        submitHandler(getValues());
      } else {
        trigger();
        errorHandler(errors);
      }
    },
  }));

  /**
   * If an onSubmit is not passed into a form, it will only be used
   * for validation. For that, we do not need to wrap it in a <form>
   * tag. This allows the <Form> component to be used in legacy code.
   */
  const Wrapper = onSubmit ? "form" : "div";

  const formProps = {
    onSubmit: onSubmit && handleSubmit(submitHandler, errorHandler),
  };

  return (
    <FormProvider {...methods}>
      <Wrapper {...formProps} data-testid="atlantis-form">
        {children}
      </Wrapper>
    </FormProvider>
  );

  function submitHandler(data: UnpackNestedValue<NestedValue>) {
    onSubmit?.(data);
  }

  function errorHandler(errs: ErrorOption) {
    const firstErrName = Object.keys(errs)[0];
    const element = document.querySelector(
      `[name="${firstErrName}"]`,
    ) as HTMLElement;

    if (typeof element != undefined) {
      element?.focus();
    }
  }
});
