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
import { ComboboxOption } from "./components/ComboboxOption";

export function Combobox({
  multiSelect = false,
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
      {triggerElement}
      {contentElement}

      {Boolean(optionElements.length) && (
        // @ts-expect-error - Suppress the XOR error with onClose|onSelect until we finish the refactor on JOB-81416
        <ComboboxContent options={buildOptions} {...props}>
          {actionElements}
        </ComboboxContent>
      )}
    </ComboboxContextProvider>
  );
}

Combobox.TriggerButton = ComboboxTriggerButton;
Combobox.TriggerChip = ComboboxTriggerChip;

/**
 * @deprecated Use individual Combobox.Option instead
 */
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
Combobox.Option = ComboboxOption;
