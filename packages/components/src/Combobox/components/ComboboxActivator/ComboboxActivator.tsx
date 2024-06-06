import React from "react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxActivatorProps } from "../../Combobox.types";

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { handleClose, open, setOpen } = React.useContext(ComboboxContext);

  if (props.children?.type === Button || props.children?.type === Chip) {
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
  } else if (props.customActivator) {
    return (
      <div role="combobox" aria-expanded={open}>
        {props.customActivator({ setOpen, open, handleClose })}
      </div>
    );
  }

  return null;
}

export interface ComboboxCustomActivatorProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  handleClose: () => void;
}
