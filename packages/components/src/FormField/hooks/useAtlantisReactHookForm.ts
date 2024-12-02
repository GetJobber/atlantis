import { useEffect, useImperativeHandle } from "react";
import {
  RegisterOptions,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { mergeRefs } from "@jobber/components/utils/mergeRefs";
import { FieldActionsRef } from "../FormFieldTypes";

/**
 * Hook used to manage the form state of a field through react-hook-form
 */
export function useAtlantisReactForm({
  actionsRef,
  name,
  defaultValue,
  value,
  validations,
  inputRef,
}: {
  actionsRef?: React.RefObject<FieldActionsRef>;
  name: string;
  defaultValue?: string | Date;
  value?: string | Date | number;
  validations?: RegisterOptions;
  inputRef?: React.RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}) {
  const formContext = useFormContext();
  // If there isn't a Form Context being provided, get a form for this field.
  const { control, setValue, watch } =
    formContext ?? useForm({ mode: "onTouched" });
  useImperativeHandle(actionsRef, () => ({
    setValue: newValue => {
      setValue(name, newValue, { shouldValidate: true });
    },
  }));
  const {
    field: { onChange, onBlur, ref: fieldRef, ...rest },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validations,
    defaultValue: value ?? defaultValue ?? "",
  });

  useEffect(() => {
    if (value != undefined) {
      setValue(name, value);
    }
  }, [value, watch(name)]);

  const inputRefs = mergeRefs([inputRef, fieldRef]);

  return {
    inputRefs,
    rest,
    setValue,
    errorMessage: error?.message || "",
    onControllerChange: onChange,
    onControllerBlur: onBlur,
  };
}
