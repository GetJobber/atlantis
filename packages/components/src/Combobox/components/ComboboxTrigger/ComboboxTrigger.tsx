import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";
import { ComboboxContext } from "../../ComboboxProvider";
import { ComboboxTriggerProps } from "../../Combobox.types";

export function ComboboxTrigger({
  label = "Select",
  selected,
}: ComboboxTriggerProps) {
  const { handleClose, open, setOpen } = React.useContext(ComboboxContext);

  const hasSelection = selected.length;
  const selectedLabel = selected.map(option => option.label).join(", ");

  return (
    <Chip
      variation={hasSelection ? "base" : "subtle"}
      label={hasSelection ? selectedLabel : ""}
      heading={label}
      onClick={() => {
        if (open) {
          handleClose();
        } else {
          setOpen(true);
        }
      }}
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
