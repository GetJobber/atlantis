import React from "react";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxActivatorProps } from "../../Combobox.types";
import { useComboboxActivatorAccessibility } from "../../hooks/useComboboxActivatorAccessibility";

export function ComboboxActivator(props: ComboboxActivatorProps) {
  const { toggleOpen } = React.useContext(ComboboxContext);
  const { htmlAttributes } = useComboboxActivatorAccessibility();

  return React.cloneElement(props.children, {
    ...htmlAttributes,
    onClick: toggleOpen,
  });
}
