import React from "react";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxActivatorProps } from "../../Combobox.types";
import { useComboboxActivatorAccessibility } from "../../hooks/useComboboxActivatorAccessibility";

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { handleClose, open, setOpen } = React.useContext(ComboboxContext);
  const {
    ariaControls,
    ariaExpanded,
    ariaLabel = "",
  } = useComboboxActivatorAccessibility();

  if (
    typeof props.children !== "function" &&
    (props.children?.type === Button || props.children?.type === Chip)
  ) {
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
    // Custom Activator component
  } else if (typeof props.children === "function") {
    return (
      <div role="combobox">
        {props.children({
          setOpen,
          open,
          handleClose,
          ariaControls,
          ariaExpanded,
          ariaLabel,
        })}
      </div>
    );
  }

  return props.children || null;
}
