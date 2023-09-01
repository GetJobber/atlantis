import React from "react";
import { TriggerProps } from "./types";
import { Button } from "../../../Button";
import { ComboboxContext } from "../../ComboboxProvider";

export function TriggerButton(props: TriggerProps): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <Button
      label={props.label}
      variation={props.variation}
      type={props.type}
      onClick={() => setOpen(!open)}
    />
  );
}
