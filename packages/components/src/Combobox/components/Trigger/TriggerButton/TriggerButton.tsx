import React from "react";
import { TriggerButtonProps } from "../types";
import { Button } from "../../../../Button";
import { ComboboxContext } from "../../../ComboboxProvider";

export function TriggerButton(props: TriggerButtonProps): JSX.Element {
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
