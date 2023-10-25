import React from "react";
import { ComboboxProps } from "./Combobox.types";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import {
  ComboboxTrigger,
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "./components/ComboboxTrigger";
import { useComboboxValidation } from "./hooks/useComboboxValidation";
import { ComboboxActivator } from "./components/ComboboxActivator";

export function Combobox(props: ComboboxProps): JSX.Element {
  const { contentElement, triggerElement } = useComboboxValidation(
    props.children,
  );

  return (
    <ComboboxContextProvider multiselect={props.multiSelect}>
      {triggerElement || <ComboboxTrigger heading={props.heading} />}
      {contentElement}
    </ComboboxContextProvider>
  );
}

/**
 * @deprecated Use Combobox.Activator instead
 */
Combobox.TriggerButton = ComboboxTriggerButton;
/**
 * @deprecated Use Combobox.Activator instead
 */
Combobox.TriggerChip = ComboboxTriggerChip;
Combobox.Activator = ComboboxActivator;
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
