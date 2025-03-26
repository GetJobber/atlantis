import { KeyboardEvent, MouseEvent, useCallback, useRef } from "react";
import sortBy from "lodash/sortBy";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";
import { InternalChipDismissibleProps } from "../InternalChipDismissibleTypes";

// Helper function to find focusable element in chip
const getFocusableElement = (chipElement: HTMLElement): HTMLElement | null => {
  // Try different strategies to find the interactive element
  const focusableElement =
    // Buttons are always focusable
    chipElement.querySelector("button") ||
    // Look for the primary focusable element (usually the chip itself)
    chipElement.querySelector('[role="button"], [role="option"]') ||
    // Find any element with a non-negative tabIndex
    (Array.from(chipElement.querySelectorAll("[tabindex]")).find(el => {
      const tabIdx = parseInt(el.getAttribute("tabindex") || "-1", 10);

      return tabIdx >= 0;
    }) as HTMLElement) ||
    // Last resort: first child element
    chipElement.firstElementChild;

  return focusableElement instanceof HTMLElement ? focusableElement : null;
};

// Extract helper functions into a separate hook
const useChipFocusManagement = (
  sortedVisibleChipOptions: Array<{ value: string }>,
  chipRefsMap: React.MutableRefObject<Record<string, HTMLDivElement | null>>,
) => {
  // Helper function to find the next or previous chip index
  const findChipIndex = (currentValue: string, direction: "next" | "prev") => {
    const currentIndex = sortedVisibleChipOptions.findIndex(
      chip => chip.value === currentValue,
    );

    if (currentIndex === -1) return -1;

    if (direction === "next") {
      return currentIndex + 1 < sortedVisibleChipOptions.length
        ? currentIndex + 1
        : -1;
    } else {
      return currentIndex - 1 >= 0 ? currentIndex - 1 : -1;
    }
  };

  // Helper function to focus a chip by its value
  const focusChip = useCallback(
    (value: string) => {
      const chipElement = chipRefsMap.current[value];

      if (chipElement) {
        const focusableElement = getFocusableElement(chipElement);

        if (focusableElement) {
          focusableElement.focus();
        }
      }
    },
    [chipRefsMap],
  );

  // Helper function to handle arrow key navigation between chips
  const handleArrowKeyNavigation = useCallback(
    (currentValue: string, direction: "next" | "prev") => {
      const index = findChipIndex(currentValue, direction);

      if (index !== -1) {
        const chipValue = sortedVisibleChipOptions[index].value;
        focusChip(chipValue);

        return true;
      }

      return false;
    },
    [sortedVisibleChipOptions, focusChip],
  );

  return {
    focusChip,
    findChipIndex,
    handleArrowKeyNavigation,
  };
};

// Create navigation helper functions
const createNavigationHelpers = (
  ref: React.RefObject<HTMLDivElement>,
  focusChip: (value: string) => void,
  sortedVisibleChipOptions: Array<{ value: string }>,
) => {
  // Helper function to handle special case: navigating right from a chip to the Add button
  const handleChipToAddButton = (currentElement: HTMLElement): boolean => {
    if (currentElement.closest("[data-value]")) {
      // Try to find the Add button
      const addButton = ref.current?.querySelector(
        'button[aria-label="Add"]',
      ) as HTMLElement;

      if (addButton) {
        addButton.focus();

        return true;
      }
    }

    return false;
  };

  // Helper function to handle special case: navigating left from Add button to the last chip
  const handleAddButtonToChip = (currentElement: HTMLElement): boolean => {
    if (currentElement.getAttribute("aria-label") === "Add") {
      // Try to find the last chip
      if (sortedVisibleChipOptions.length > 0) {
        const lastChipValue =
          sortedVisibleChipOptions[sortedVisibleChipOptions.length - 1].value;
        focusChip(lastChipValue);

        return true;
      }
    }

    return false;
  };

  // Helper function to focus the last chip when pressing backspace in empty input
  const handleInputBackspace = (): boolean => {
    if (sortedVisibleChipOptions.length > 0) {
      const lastChipValue =
        sortedVisibleChipOptions[sortedVisibleChipOptions.length - 1].value;
      focusChip(lastChipValue);

      return true;
    }

    return false;
  };

  // Helper function to get all focusable elements in the wrapper
  const getAllFocusableElements = () => {
    if (!ref.current) return [];

    // First get the top-level elements that should be focusable in order
    const elements = ref.current.querySelectorAll(
      'button[aria-label="Add"], .chipWrapper > button, .chipWrapper > [role="button"], .chipWrapper > [role="option"], [tabindex]:not([tabindex="-1"])',
    );

    return Array.from(elements) as HTMLElement[];
  };

  return {
    handleChipToAddButton,
    handleAddButtonToChip,
    handleInputBackspace,
    getAllFocusableElements,
  };
};

export function useInternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: InternalChipDismissibleProps) {
  const ref = useRef<HTMLDivElement>(null);
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

  // Create a ref object to store refs for all chips
  const chipRefsMap = useRef<Record<string, HTMLDivElement | null>>({});
  const { liveAnnounce } = useLiveAnnounce();

  // Use the extracted focus management helpers
  const { focusChip, findChipIndex, handleArrowKeyNavigation } =
    useChipFocusManagement(sortedVisibleChipOptions, chipRefsMap);

  // Use navigation helpers
  const {
    handleChipToAddButton,
    handleAddButtonToChip,
    handleInputBackspace,
    getAllFocusableElements,
  } = createNavigationHelpers(ref, focusChip, sortedVisibleChipOptions);

  // Handle navigation between all focusable elements
  const handleFocusableElementNavigation = (
    currentElement: HTMLElement,
    direction: "next" | "prev",
  ) => {
    // Handle special cases first
    if (direction === "next" && handleChipToAddButton(currentElement)) {
      return true;
    }

    if (direction === "prev" && handleAddButtonToChip(currentElement)) {
      return true;
    }

    // Standard navigation between elements
    const allFocusableElements = getAllFocusableElements();
    const currentIndex = allFocusableElements.findIndex(
      el => el === currentElement || el === document.activeElement,
    );

    if (currentIndex >= 0) {
      const nextIndex =
        direction === "prev" ? currentIndex - 1 : currentIndex + 1;

      // Ensure we stay within bounds
      if (nextIndex >= 0 && nextIndex < allFocusableElements.length) {
        allFocusableElements[nextIndex].focus();

        return true;
      }
    }

    return false;
  };

  const actions = {
    handleChipRemove: (value: string) => {
      return () => {
        // Find the previous or next chip to focus after removal
        const prevIndex = findChipIndex(value, "prev");
        const nextIndex = findChipIndex(value, "next");

        // Store values before removing the chip
        const prevValue =
          prevIndex !== -1
            ? sortedVisibleChipOptions[prevIndex].value
            : undefined;
        const nextValue =
          nextIndex !== -1
            ? sortedVisibleChipOptions[nextIndex].value
            : undefined;

        // Update the selected values
        onChange(selected.filter(val => val !== value));
        liveAnnounce(`${value} Removed`);

        // Focus after state update
        setTimeout(() => {
          if (prevValue) {
            focusChip(prevValue);
          } else if (nextValue) {
            focusChip(nextValue);
          }
        }, 0);
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
      const isInput = target instanceof HTMLInputElement;
      const isInputAndHasValue = isInput && target.value;

      // Handle backspace on empty input - focus last chip
      if (isInput && !target.value && event.key === "Backspace") {
        if (handleInputBackspace()) {
          return;
        }
      }

      // Skip if input has value
      if (isInputAndHasValue) return;

      // Handle arrow key navigation
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const direction = event.key === "ArrowLeft" ? "prev" : "next";
        const currentValue =
          target.getAttribute("data-value") ||
          target.closest("[data-value]")?.getAttribute("data-value");

        // Try chip navigation first, then general element navigation
        if (
          !currentValue ||
          !handleArrowKeyNavigation(currentValue, direction)
        ) {
          handleFocusableElementNavigation(target, direction);
        }
      }
    },

    handleChipKeyDown: (value: string) => {
      return (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          // Removal and focus handling is done in handleChipRemove
          actions.handleChipRemove(value)();
        }
      };
    },

    // Function to set a reference to a chip element
    setChipRef: (value: string, element: HTMLDivElement | null) => {
      chipRefsMap.current[value] = element;
    },
  };

  return {
    ...actions,
    ref,
    sortedVisibleChipOptions,
    availableChipOptions,
  };
}
