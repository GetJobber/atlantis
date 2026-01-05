import React from "react";
import { Button, type ButtonProps } from "@jobber/components/Button";
import { Chip, type ChipProps } from "@jobber/components/Chip";
import { ComboboxContext } from "../../ComboboxProvider";
import type { ComboboxActivatorProps } from "../../Combobox.types";
import { useComboboxActivatorAccessibility } from "../../hooks/useComboboxActivatorAccessibility";

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { handleOpen } = React.useContext(ComboboxContext);
  const accessibilityAttributes = useComboboxActivatorAccessibility();

  if (
    React.isValidElement<ButtonProps | ChipProps>(props.children) &&
    (props.children.type === Button || props.children.type === Chip)
  ) {
    return React.cloneElement(props.children, {
      role: accessibilityAttributes.role,
      onClick: handleOpen,
    });
  } else if (typeof props.children === "function") {
    return props.children({ ...accessibilityAttributes, open: handleOpen });
  }

  return null;
}
