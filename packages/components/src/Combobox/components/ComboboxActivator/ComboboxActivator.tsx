import React from "react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxActivatorProps } from "../../Combobox.types";

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { handleClose, open, setOpen } = React.useContext(ComboboxContext);

  if (props.children.type === Button || props.children.type === Chip) {
    return React.cloneElement(props.children, {
      role: "combobox",
      onClick: () => {
        if (open) {
          handleClose();
        } else {
          setOpen(true);
        }
      },
    });
  }

  return props.children;
}
