import { KeyboardEvent, MouseEvent, useRef } from "react";
import { sortBy } from "lodash";
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

  const actions = {
    handleChipRemove: (value: string) => {
      return () => onChange(selected.filter(val => val !== value));
    },

    handleChipAdd: (value: string) => onChange([...selected, value]),
    handleCustomAdd: onCustomAdd,

    handleChipClick: (value: string) => {
      if (onClick === undefined) return;
      return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
    },

    handleEmptyBackspace: () => {
      actions.handleChipRemove(selected[selected.length - 1])();
    },

    handleWrapperKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target instanceof HTMLInputElement && target.value) return;
      if (
        event.key === "ArrowLeft" &&
        target.previousElementSibling instanceof HTMLElement
      ) {
        target.previousElementSibling.focus();
      }
      if (
        event.key === "ArrowRight" &&
        target.nextElementSibling instanceof HTMLElement
      ) {
        target.nextElementSibling.focus();
      }
    },

    handleChipKeyDown: (value: string) => {
      return (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Backspace") {
          const target = event.target;
          if (
            target instanceof HTMLElement &&
            target.nextElementSibling instanceof HTMLElement
          ) {
            target.nextElementSibling.focus();
          }
          actions.handleChipRemove(value)();
        }
      };
    },
  };

  return {
    ...actions,
    ref,
    sortedVisibleChipOptions,
    availableChipOptions,
  };
}
