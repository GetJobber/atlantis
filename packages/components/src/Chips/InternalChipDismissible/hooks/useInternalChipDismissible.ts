import { KeyboardEvent, MouseEvent, useRef } from "react";
import sortBy from "lodash/sortBy";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";
import { InternalChipDismissibleProps } from "../InternalChipDismissibleTypes";

export function useInternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: InternalChipDismissibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const chipOptions = children?.map(chip => chip.props);
  const visibleChipOptions = chipOptions?.filter(chip =>
    selected.includes(chip.value),
  );
  const sortedVisibleChipOptions = sortBy(visibleChipOptions, chip =>
    selected.indexOf(chip.value),
  );
  const availableChipOptions = chipOptions?.filter(
    chip => !selected.includes(chip.value),
  );

  const { liveAnnounce } = useLiveAnnounce();

  const actions = {
    handleChipRemove: (value: string) => {
      return () => {
        liveAnnounce(`${value} Removed`);
        onChange(selected.filter(val => val !== value));
        onClick(value);
      };
    },

    handleChipAdd: (value: string) => onChange([...selected, value]),
    handleCustomAdd: onCustomAdd,

    handleChipClick: (value: string) => {
      if (onClick === undefined) return;

      return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
    },

    handleWrapperKeyDown: (
      event: KeyboardEvent<HTMLDivElement> & {
        target: HTMLElement;
      },
    ) => {
      const target = event.target;

      const isInputAndHasValue =
        target instanceof HTMLInputElement && target.value;
      if (isInputAndHasValue) return;

      const nextElementToFocus = target.nextElementSibling;
      const prevElementToFocus = target.previousElementSibling;

      if (
        event.key === "ArrowLeft" &&
        prevElementToFocus instanceof HTMLElement
      ) {
        prevElementToFocus.focus();
      }

      if (
        event.key === "ArrowRight" &&
        nextElementToFocus instanceof HTMLElement
      ) {
        nextElementToFocus.focus();
      }
    },

    handleChipKeyDown: (value: string) => {
      return (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          const target = event.target;

          if (target instanceof HTMLElement) {
            const prevElement = target.previousElementSibling;
            const nextElement = target.nextElementSibling;

            if (prevElement instanceof HTMLElement) {
              prevElement.focus();
            } else if (nextElement instanceof HTMLElement) {
              nextElement.focus();
            }
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
