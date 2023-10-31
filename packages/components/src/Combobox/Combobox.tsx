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
import { ComboboxOption } from "./components/ComboboxOption";
import { ComboboxActivator } from "./components/ComboboxActivator";

export function Combobox({
  multiSelect = false,
  heading = "Select",
  selected = [],
  ...props
}: ComboboxProps): JSX.Element {
  const { contentElement, triggerElement, optionElements, actionElements } =
    useComboboxValidation(props.children);

  const buildOptions = optionElements.map(option => ({
    id: option.props.id,
    label: option.props.label,
  }));

  return (
    <ComboboxContextProvider multiselect={multiSelect}>
      {triggerElement || (
        <ComboboxTrigger heading={heading} selected={selected} />
      )}

      {contentElement || (
        // @ts-expect-error - Suppress the XOR error with onClose|onSelect until we finish the refactor on JOB-81416
        <ComboboxContent options={buildOptions} selected={selected} {...props}>
          {actionElements}
        </ComboboxContent>
      )}
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

/**
 * @deprecated Use individual Combobox.Option instead
 */
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOption;
