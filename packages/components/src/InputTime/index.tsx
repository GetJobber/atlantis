import React from "react";
import { InputTimeLegacyProps, InputTimeRebuiltProps } from "./InputTime.types";
import { InputTimeRebuilt } from "./InputTime.rebuilt";
import { InputTime as InputTimeLegacy } from "./InputTime";

export type InputTimeShimProps = InputTimeLegacyProps | InputTimeRebuiltProps;

function isNewInputTimeProps(
  props: InputTimeShimProps,
): props is InputTimeRebuiltProps {
  return props.version === 2;
}

export function InputTime(props: InputTimeShimProps) {
  if (isNewInputTimeProps(props)) {
    return <InputTimeRebuilt {...props} />;
  } else {
    return <InputTimeLegacy {...props} />;
  }
}
