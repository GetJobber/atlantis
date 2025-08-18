import type { Ref } from "react";
import React, { forwardRef } from "react";
import type { InputTextProps, InputTextRef } from "../InputText";
import { InputText } from "../InputText";

export const InputEmail = forwardRef(InputEmailInternal);
type InputEmailProps = Omit<InputTextProps, "keyboard">;

function InputEmailInternal(props: InputEmailProps, ref: Ref<InputTextRef>) {
  return (
    <InputText
      {...props}
      ref={ref}
      autoCapitalize="none"
      autoCorrect={false}
      keyboard={"email-address"}
      validations={{
        pattern: {
          value:
            /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
          message: "Enter a valid email address (email@example.com)",
        },
        ...props.validations,
      }}
    />
  );
}
