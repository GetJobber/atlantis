import React from "react";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxActivatorProps } from "../../Combobox.types";

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { handleClose, open, handleOpen } = React.useContext(ComboboxContext);

  return React.cloneElement(props.children, {
    role: "combobox",
    "aria-expanded": open,
    onClick: () => {
      if (open) {
        handleClose();
      } else {
        handleOpen();
      }
    },
  });
}
