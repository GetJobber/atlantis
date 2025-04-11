import React from "react";
import { InputTimeProps, InputTimeRebuiltProps } from "./InputTime.Types";
import { InputTimeRebuilt } from "./InputTime.rebuilt";
import { InputTime as InputTimeLegacy } from "./InputTime";

export type InputTimeShimProps = InputTimeProps | InputTimeRebuiltProps;

function isNewInputTimeProps(
  props: InputTimeShimProps,
): props is InputTimeRebuiltProps {
  console.log("version", props.version);

  return props.version === 2;
}

export function InputTime(props: InputTimeShimProps) {
  if (isNewInputTimeProps(props)) {
    return <InputTimeRebuilt {...props} />;
  } else {
    return <InputTimeLegacy {...props} />;
  }
}
