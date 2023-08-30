import React from "react";
import { TriggerProps } from "./types";
import { Button } from "../../../Button";

export function TriggerButton(props: TriggerProps): JSX.Element {
  return (
    <Button
      label={props.label}
      onClick={() => {
        console.log("hi");
      }}
    />
  );
}
