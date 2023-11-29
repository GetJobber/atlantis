import React, { Ref, forwardRef, useState } from "react";
import { IconNames } from "@jobber/design";
import { InputText, InputTextProps, InputTextRef } from "../InputText";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

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
  readonly usePrivacyEye?: boolean;
}

function InputPasswordInternal(
  { usePrivacyEye = true, ...props }: InputPasswordProps,
  ref: Ref<InputTextRef>,
): JSX.Element {
  const { t } = useAtlantisI18n();
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
          message: t("InputPassword.enterPassword"),
        },
        ...props.validations,
      }}
    />
  );
}
