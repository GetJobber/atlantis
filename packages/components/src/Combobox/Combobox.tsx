import React from "react";
import { ComboboxProps } from "@jobber/components/Combobox/Combobox.types";
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

export const Combobox = (props: ComboboxProps): JSX.Element => {
  const { contentElement, triggerElement } = useComboboxValidation(
    props.children,
  );
  const activatorElement = React.Children.toArray(props.children).find(
    child => React.isValidElement(child) && child.type === ComboboxActivator,
  );

  return (
    <ComboboxContextProvider multiselect={props.multiSelect}>
      {activatorElement || <ComboboxTrigger label={props.label} />}
      {triggerElement}
      {contentElement}
    </ComboboxContextProvider>
  );
};

Combobox.TriggerButton = ComboboxTriggerButton;
Combobox.TriggerChip = ComboboxTriggerChip;
Combobox.Activator = ComboboxActivator;
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
