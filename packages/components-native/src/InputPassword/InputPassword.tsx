import React, { Ref, forwardRef, useState } from "react";
import { useIntl } from "react-intl";
import { IconNames } from "@jobber/design";
import { messages } from "./messages";
import { InputText, InputTextProps, InputTextRef } from "../InputText";

export const InputPassword = forwardRef(InputPasswordInternal);

export interface InputPasswordProps
  extends Omit<
    InputTextProps,
    "keyboard" | "secureTextEntry" | "textContentType" | "clearable"
  > {
  /**
   * Determines if InputPassword uses privacy eye suffix
   *
   * @default true
   */
  usePrivacyEye?: boolean;
}

function InputPasswordInternal(
  { usePrivacyEye = true, ...props }: InputPasswordProps,
  ref: Ref<InputTextRef>,
): JSX.Element {
  const { formatMessage } = useIntl();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [privacyEye, setPrivacyEye] = useState<IconNames>("eye");

  const handleOnPress = () => {
    if (privacyEye === "eye") {
      setPrivacyEye("eyeCrossed");
      setPasswordHidden(false);
    } else if (privacyEye === "eyeCrossed") {
      setPrivacyEye("eye");
      setPasswordHidden(true);
    }
  };

  const privacyEyeSuffix = () => {
    if (usePrivacyEye === true) {
      return {
        icon: privacyEye,
        onPress: handleOnPress,
      };
    }
    return undefined;
  };

  return (
    <InputText
      {...props}
      ref={ref}
      keyboard="default"
      secureTextEntry={passwordHidden}
      textContentType="password"
      clearable="never"
      suffix={privacyEyeSuffix()}
      validations={{
        required: {
          value: true,
          message: formatMessage(messages.passwordRequired),
        },
        ...props.validations,
      }}
    />
  );
}
