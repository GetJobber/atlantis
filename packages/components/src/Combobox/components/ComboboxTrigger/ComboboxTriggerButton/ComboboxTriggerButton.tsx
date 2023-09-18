import React from "react";
import { Button } from "../../../../Button";
import { ComboboxTriggerButtonProps } from "../../../Combobox.types";
import { ComboboxContext } from "../../../ComboboxProvider";

export function ComboboxTriggerButton(
  props: ComboboxTriggerButtonProps,
): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <Button
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-controls="ATL-Combobox-Content"
      label={props.label}
      variation={props.variation}
      type={props.type}
      onClick={() => setOpen(!open)}
      icon={props.icon}
      iconOnRight={props.iconOnRight}
    />
  );
}
