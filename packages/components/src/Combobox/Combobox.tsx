import React from "react";
import { ComboboxProps } from "./Combobox.types";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "./components/ComboboxTrigger";
import { useComboboxValidation } from "./hooks/useComboboxValidation";

export function Combobox(props: ComboboxProps): JSX.Element {
  const { contentElement, triggerElement } = useComboboxValidation(
    props.children,
  );

  return (
    <ComboboxContextProvider multiselect={props.multiSelect}>
      {triggerElement}
      {contentElement}
    </ComboboxContextProvider>
  );
}

Combobox.TriggerButton = ComboboxTriggerButton;
Combobox.TriggerChip = ComboboxTriggerChip;
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
