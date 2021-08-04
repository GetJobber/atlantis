import uuid from "uuid";
import { useState } from "react";
import {
  RegisterOptions,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

interface UseFormControllerProps<T> {
  name?: string;
  value?: T;
  validations?: RegisterOptions;
}
export function useFormController<T>({
  name,
  value,
  validations,
}: UseFormControllerProps<T>) {
  const fieldName = useControlName(name);

  const form = useForm<{ fieldName: T }>({
    mode: "onTouched",
    defaultValues: { [fieldName]: value },
  });
  const formContext = useFormContext();

  const {
    control,
    formState: { errors },
  } = formContext || form;

  const { field } = useController({
    name: fieldName,
    control,
    rules: validations,
    defaultValue: value ?? "",
  });

  return { error: errors[fieldName], field };
}

function useControlName(name: string | undefined) {
  const [identifier] = useState(uuid.v1());
  return name || `generatedName--${identifier}`;
}
