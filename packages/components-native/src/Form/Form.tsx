import React from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import { FormProps, InternalFormProps } from "./types";
import { FormMask } from "./components/FormMask";
import { ErrorMessageProvider } from "../ErrorMessageWrapper";
import { InputAccessoriesProvider } from "../InputText";

export function Form({
  initialLoading,
  ...rest
}: FormProps<T, S>): JSX.Element {
  const child = initialLoading ? <FormMask /> : <InternalForm {...rest} />;
  return (
    <InputAccessoriesProvider>
      <ErrorMessageProvider>{child}</ErrorMessageProvider>
    </InputAccessoriesProvider>
  );
}

function InternalForm<T extends FieldValues, S>({
  children,
  onBeforeSubmit,
  onSubmit,
  onSubmitError,
  onSubmitSuccess,
  bannerErrors,
  bannerMessages,
  initialValues,
  mode = "onTouched",
  reValidateMode = "onChange",
  formRef,
  saveButtonLabel,
  renderStickySection,
  localCacheKey,
  localCacheExclude,
  localCacheId,
  secondaryActions,
  saveButtonOffset,
  showStickySaveButton,
  renderFooter,
}: InternalFormProps<T, S>) {
  return (
    <FormProvider>
      <></>
    </FormProvider>
  );
}
