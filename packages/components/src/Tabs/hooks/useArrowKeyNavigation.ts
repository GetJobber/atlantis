import { useCallback } from "react";

interface UseArrowKeyNavigationProps {
  elementsRef: React.RefObject<Map<number, HTMLElement>>;
  onActivate: (index: number) => void;
}

export const useArrowKeyNavigation = ({
  elementsRef,
  onActivate,
}: UseArrowKeyNavigationProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const elements = elementsRef.current;
      if (!elements) return;

      const currentIndex = getActiveTabIndex(elements);
      if (currentIndex === -1) return;

      const focusAndActivateTab = (index: number) => {
        const element = elements.get(index);

        if (element) {
          element.focus();
          onActivate(index);
        }
      };

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % elements.size;
        focusAndActivateTab(nextIndex);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + elements.size) % elements.size;
        focusAndActivateTab(prevIndex);
      }
    },
    [elementsRef, onActivate],
  );

  return handleKeyDown;
};

function getActiveTabIndex(elements: Map<number, HTMLElement>) {
  const currentTab = Array.from(elements).find(
    ([, element]) => element === document.activeElement,
  );

  if (!currentTab) {
    return -1;
  }

  const [currentIndex] = currentTab;

  return currentIndex;
}
