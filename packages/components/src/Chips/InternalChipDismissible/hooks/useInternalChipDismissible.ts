import { KeyboardEvent, MouseEvent, useRef } from "react";
import sortBy from "lodash/sortBy";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";
import { InternalChipDismissibleProps } from "../InternalChipDismissibleTypes";

// Helper function to prepare chip options
const prepareChipOptions = (
  children: InternalChipDismissibleProps["children"],
  selected: string[],
) => {
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

  return { chipOptions, sortedVisibleChipOptions, availableChipOptions };
};

// Helper function for keyboard navigation
const getNavigationData = (wrapper: HTMLElement, target: HTMLElement) => {
  // Find all focusable elements
  const chipElements = Array.from(
    wrapper.querySelectorAll('[role="option"]'),
  ) as HTMLElement[];
  const addButton = wrapper.querySelector(
    '[aria-label="Add"]',
  ) as HTMLElement | null;

  if (addButton) {
    chipElements.push(addButton);
  }

  // Find the current index
  const currentIndex = chipElements.findIndex(
    elem => elem === target || elem.contains(target),
  );

  return { chipElements, currentIndex };
};

export function useInternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: InternalChipDismissibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { sortedVisibleChipOptions, availableChipOptions } = prepareChipOptions(
    children,
    selected,
  );

  // Create a mutable array to store references to the chip elements
  const chipRefsRef = useRef<Array<HTMLElement | null>>(
    Array(sortedVisibleChipOptions.length).fill(null),
  );

  // Track current focus index
  const focusIndexRef = useRef<number>(-1);

  const { liveAnnounce } = useLiveAnnounce();

  const actions = {
    handleChipRemove: (value: string, index?: number) => {
      return () => {
        liveAnnounce(`${value} Removed`);

        // If index is provided, handle focus management
        if (index !== undefined) {
          // Store the new filtered list
          const newSelected = selected.filter(val => val !== value);

          // Calculate the index to focus after deletion
          let nextFocusIndex = -1;

          if (index > 0) {
            // If not the first chip, focus the previous one
            nextFocusIndex = index - 1;
          } else if (newSelected.length > 0) {
            // If it's the first chip and there are remaining chips, focus the new first chip
            nextFocusIndex = 0;
          }

          // First update the array (important to do this before focus)
          onChange(newSelected);

          // After the state update and component re-render, attempt to focus
          if (nextFocusIndex >= 0) {
            // Using a slightly longer timeout to ensure DOM has updated
            setTimeout(() => {
              // Get the elements after the chips have been re-rendered
              if (ref.current) {
                const chipElements =
                  ref.current.querySelectorAll('[role="option"]');
                const newElement = chipElements[nextFocusIndex] as
                  | HTMLElement
                  | undefined;

                if (newElement) {
                  newElement.focus();
                  focusIndexRef.current = nextFocusIndex;
                }
              }
            }, 10); // Slightly longer timeout to ensure DOM has updated
          }
        } else {
          // Default behavior without focus management
          onChange(selected.filter(val => val !== value));
        }
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

      // Handle left/right arrow navigation
      if (
        (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
        ref.current
      ) {
        const { chipElements, currentIndex } = getNavigationData(
          ref.current,
          target,
        );

        if (currentIndex !== -1) {
          const nextIndex =
            event.key === "ArrowLeft"
              ? Math.max(0, currentIndex - 1)
              : Math.min(chipElements.length - 1, currentIndex + 1);

          if (nextIndex !== currentIndex) {
            chipElements[nextIndex].focus();
          }
        }
      }
    },

    handleChipKeyDown: (value: string, index: number) => {
      return (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          // Use the same removal logic with focus management
          liveAnnounce(`${value} Removed`);

          // Store the new filtered list
          const newSelected = selected.filter(val => val !== value);

          // Calculate the index to focus after deletion
          let nextFocusIndex = -1;

          if (index > 0) {
            // If not the first chip, focus the previous one
            nextFocusIndex = index - 1;
          } else if (newSelected.length > 0) {
            // If it's the first chip and there are remaining chips, focus the new first chip
            nextFocusIndex = 0;
          }

          // First update the array (important to do this before focus)
          onChange(newSelected);

          // After the state update and component re-render, attempt to focus
          if (nextFocusIndex >= 0) {
            // Using a slightly longer timeout to ensure DOM has updated
            setTimeout(() => {
              // Get the elements after the chips have been re-rendered
              if (ref.current) {
                const chipElements =
                  ref.current.querySelectorAll('[role="option"]');
                const newElement = chipElements[nextFocusIndex] as
                  | HTMLElement
                  | undefined;

                if (newElement) {
                  newElement.focus();
                  focusIndexRef.current = nextFocusIndex;
                }
              }
            }, 10); // Slightly longer timeout to ensure DOM has updated
          }
        }
      };
    },

    // Function to set a chip reference
    setChipRef: (index: number, element: HTMLElement | null) => {
      chipRefsRef.current[index] = element;
    },
  };

  return {
    ...actions,
    ref,
    sortedVisibleChipOptions,
    availableChipOptions,
    chipRefsRef,
  };
}
