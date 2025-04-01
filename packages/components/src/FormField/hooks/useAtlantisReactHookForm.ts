import { useEffect, useImperativeHandle } from "react";
import { useController, useForm, useFormContext } from "react-hook-form";
import { mergeRefs } from "@jobber/components/utils/mergeRefs";
import { FormFieldProps } from "../FormFieldTypes";

interface useAtlantisReactHookFormProps
  extends Pick<
    FormFieldProps,
    "actionsRef" | "defaultValue" | "value" | "validations" | "inputRef"
  > {
  name: string;
}

/**
 * Hook used to manage the form state of a field through react-hook-form
 */
export function useAtlantisReactHookForm({
  actionsRef,
  name,
  defaultValue,
  value,
  validations,
  inputRef,
}: useAtlantisReactHookFormProps) {
  const formContext = useFormContext();
  // If there isn't a Form Context being provided, get a form for this field.
  const { control, setValue } = formContext ?? useForm({ mode: "onTouched" });
  useImperativeHandle(actionsRef, () => ({
    setValue: newValue => {
      setValue(name, newValue, { shouldValidate: true });
    },
  }));
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validations,
    defaultValue: value ?? defaultValue ?? "",
  });
  const { onChange, onBlur, ref: fieldRef, ...useControllerField } = field;

  useEffect(() => {
    if (value != undefined) {
      setValue(name, value);
    }
  }, [value, field.value]);

  const inputRefs = mergeRefs([inputRef, fieldRef]);

  return {
    inputRefs,
    useControllerField,
    setValue,
    errorMessage: error?.message || "",
    onControllerChange: onChange,
    onControllerBlur: onBlur,
  };
}
