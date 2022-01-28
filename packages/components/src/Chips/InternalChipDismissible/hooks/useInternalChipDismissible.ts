import { MouseEvent, useRef } from "react";
import { sortBy } from "lodash";
import { useLiveAnnounce } from "@jobber/hooks";
import { InternalChipDismissibleProps } from "../InternalChipDismissibleTypes";

export function useInternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: InternalChipDismissibleProps) {
  const ref = useRef<HTMLDivElement>(null); // eslint-disable-line no-null/no-null
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
  const { liveAnnounce } = useLiveAnnounce();

  const actions = {
    handleChipRemove: (chip: typeof chipOptions[number]) => {
      return () => {
        liveAnnounce(`${chip.label} Removed`);
        onChange(selected.filter(val => val !== chip.value));
      };
    },
    handleChipAdd: (value: string) => onChange([...selected, value]),
    handleCustomAdd: onCustomAdd,
    handleChipClick: (value: string) => {
      if (onClick === undefined) return;
      return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
    },
    handleEmptyBackspace: () => {
      actions.handleChipRemove(sortedVisibleChipOptions[selected.length - 1])();
    },
  };

  return {
    ...actions,
    ref,
    sortedVisibleChipOptions,
    availableChipOptions,
  };
}
