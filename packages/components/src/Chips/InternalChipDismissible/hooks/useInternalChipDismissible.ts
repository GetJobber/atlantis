import { MouseEvent } from "react";
import { sortBy } from "lodash";
import { ChipDismissibleProps } from "../../ChipsTypes";

export function useInternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: ChipDismissibleProps) {
  const chipOptions = children.map(chip => chip.props);
  const visibleChipOptions = chipOptions.filter(chip =>
    selected.includes(chip.value),
  );
  const sortedVisibleChipOptions = sortBy(visibleChipOptions, chip =>
    selected.indexOf(chip.value),
  );
  const availableChipOptions = chipOptions.filter(
    chip => !selected.includes(chip.value),
  );

  const actions = {
    handleChipRemove: (value: string) => {
      return () => onChange(selected.filter(val => val !== value));
    },
    handleChipAdd: (value: string) => onChange([...selected, value]),
    handleCustomAdd: (value: string) => onCustomAdd(value),
    handleChipClick: (value: string) => {
      if (onClick === undefined) return;
      return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
    },
    handleEmptyBackspace: () => {
      actions.handleChipRemove(selected[selected.length - 1])();
    },
  };

  return { ...actions, sortedVisibleChipOptions, availableChipOptions };
}
