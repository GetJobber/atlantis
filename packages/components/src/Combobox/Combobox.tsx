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
  selected = [],
  ...props
}: ComboboxProps): JSX.Element {
  const { contentElement, triggerElement, optionElements, actionElements } =
    useComboboxValidation(props.children);

  const getOptions = optionElements.map(option => ({
    id: option.props.id,
    label: option.props.label,
  }));

  return (
    <ComboboxContextProvider multiselect={props.multiSelect}>
      {triggerElement}
      {contentElement}

      {Boolean(optionElements.length) && (
        // @ts-expect-error - XOR issue but since this will be refactored, we
        // can ignore this for now
        <ComboboxContent
          options={getOptions}
          onSelect={props.onSelect}
          onClose={props.onClose}
          selected={selected}
          subjectNoun={props.subjectNoun}
        >
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
