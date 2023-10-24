import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";
import { ComboboxContext } from "../../ComboboxProvider";

interface ComboboxTriggerProps {
  readonly label: string;
}

export function ComboboxTrigger(props: ComboboxTriggerProps) {
  const { open, setOpen, selected } = React.useContext(ComboboxContext);

  const hasSelection = selected.length;
  const selectedLabel = selected.map(option => option.label).join(", ");

  return (
    <Chip
      variation={hasSelection ? "base" : "subtle"}
      label={hasSelection ? selectedLabel : props.label}
      onClick={() => setOpen(!open)}
    >
      {!hasSelection && (
        <Chip.Suffix>
          <Icon name="add" size="small" />
        </Chip.Suffix>
      )}
    </Chip>
  );
}
