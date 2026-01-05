import type { Ref } from "react";
import React, { forwardRef } from "react";
import type { InputTextProps, InputTextRef } from "../InputText";
import { InputText } from "../InputText";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

export const InputEmail = forwardRef(InputEmailInternal);
type InputEmailProps = Omit<InputTextProps, "keyboard">;

function InputEmailInternal(props: InputEmailProps, ref: Ref<InputTextRef>) {
  const { t } = useAtlantisI18n();

  const defaultValidations = {
    pattern: {
      value:
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
      message: t("InputEmail.enterEmail"),
    },
  } as const;
  const mergedValidations = props.validations
    ? Object.assign({}, defaultValidations, props.validations)
    : defaultValidations;

  return (
    <InputText
      {...props}
      ref={ref}
      autoCapitalize="none"
      autoCorrect={false}
      keyboard={"email-address"}
      validations={mergedValidations}
    />
  );
}
