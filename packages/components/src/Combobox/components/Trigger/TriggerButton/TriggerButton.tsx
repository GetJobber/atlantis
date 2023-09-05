import React from "react";
import { Button } from "../../../../Button";
import { ComboboxContext } from "../../../ComboboxProvider";
import { TriggerButtonProps } from "../types";

export function TriggerButton(props: TriggerButtonProps): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <Button
      label={props.label}
      variation={props.variation}
      type={props.type}
      onClick={() => setOpen(!open)}
      icon={props.icon}
      iconOnRight={props.iconOnRight}
    />
  );
}
