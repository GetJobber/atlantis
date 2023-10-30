import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxContentProps } from "../../Combobox.types";

interface ComboboxTriggerProps extends Pick<ComboboxContentProps, "selected"> {
  readonly heading: string;
}

export function ComboboxTrigger({ selected, ...props }: ComboboxTriggerProps) {
  const { open, setOpen, multiselect } = React.useContext(ComboboxContext);

  const hasSelection = selected.length;
  const selectedLabel = selected.map(option => option.label).join(", ");
  const renderHeading = multiselect || !hasSelection;

  return (
    <Chip
      variation={hasSelection ? "base" : "subtle"}
      label={hasSelection ? selectedLabel : ""}
      heading={renderHeading ? props.heading : ""}
      onClick={() => setOpen(!open)}
      role="combobox"
    >
      {!hasSelection && (
        <Chip.Suffix>
          <Icon name="add" size="small" />
        </Chip.Suffix>
      )}
    </Chip>
  );
}
