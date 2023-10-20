import React from "react";
import { ComboboxTriggerButtonProps } from "@jobber/components/Combobox/Combobox.types";
import { Button } from "../../../../Button";
import { ComboboxContext } from "../../../ComboboxProvider";

export function ComboboxTriggerButton(
  props: ComboboxTriggerButtonProps,
): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <Button
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls="ATL-Combobox-Content"
      aria-autocomplete="list"
      label={props.label}
      variation={props.variation}
      type={props.type}
      onClick={() => setOpen(!open)}
      icon={props.icon}
      iconOnRight={props.iconOnRight}
    />
  );
}
