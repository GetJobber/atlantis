import React, {
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface FormRef {
  validate(props: Array<string>): void;
}

interface FormProps {
  readonly children: ReactNode;
  /**
   * Callback for when the form has been sucessfully
   * submitted.
   */
  onSubmit?(): void;

  onStateChange?(formState: { isDirty: boolean; isValid: boolean }): void;
}

export const Form = forwardRef(function InternalForm(
  { onSubmit, children, onStateChange }: FormProps,
  ref: Ref<FormRef>,
) {
  const methods = useForm({ mode: "onTouched" });
  const {
    trigger,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  useEffect(() => onStateChange && onStateChange({ isDirty, isValid }), [
    isDirty,
    isValid,
  ]);

  useImperativeHandle(ref, () => ({
    validate: async props => {
      const valid = await trigger(props);

      if (valid) {
        submitHandler();
      } else {
        if (props) {
          trigger(props);
        } else {
          trigger();
        }
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
});
