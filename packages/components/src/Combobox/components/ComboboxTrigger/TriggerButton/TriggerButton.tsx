import React from "react";
import { Button } from "../../../../Button";
import { TriggerButtonProps } from "../../../Combobox.types";
import { ComboboxContext } from "../../../ComboboxProvider";

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
