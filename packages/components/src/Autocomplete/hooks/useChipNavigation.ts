import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { OptionLike } from "../Autocomplete.types";

interface UseChipNavigationProps<Value extends OptionLike> {
  readonly selectedValues: Value[];
  readonly inputValue: string;
  readonly readOnly?: boolean;
  readonly removeSelection: (option: Value) => void;
  readonly onInputKeyDown: (event: React.KeyboardEvent) => void;
  readonly onInputBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

interface UseChipNavigationReturn {
  readonly activeChipIndex: number | null;
  readonly onKeyDown: (event: React.KeyboardEvent) => void;
  readonly onBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export function useChipNavigation<Value extends OptionLike>({
  selectedValues,
  inputValue,
  readOnly,
  removeSelection,
  onInputKeyDown,
  onInputBlur,
}: UseChipNavigationProps<Value>): UseChipNavigationReturn {
  const [activeChipIndex, setActiveChipIndex] = useState<number | null>(null);

  useEffect(() => {
    if (inputValue !== "") {
      setActiveChipIndex(null);
    }
  }, [inputValue]);

  useEffect(() => {
    setActiveChipIndex(prev => {
      if (prev === null) return null;
      if (selectedValues.length === 0) return null;
      if (prev >= selectedValues.length) return selectedValues.length - 1;

      return prev;
    });
  }, [selectedValues.length]);

  const handleActiveChipKey = useCallback(
    // eslint-disable-next-line max-statements
    (event: React.KeyboardEvent): boolean => {
      if (activeChipIndex === null) return false;

      const { key } = event;

      if (key === "ArrowLeft") {
        event.preventDefault();
        setActiveChipIndex(i => Math.max(0, (i ?? 0) - 1));

        return true;
      }

      if (key === "ArrowRight") {
        event.preventDefault();
        setActiveChipIndex(
          activeChipIndex + 1 >= selectedValues.length
            ? null
            : activeChipIndex + 1,
        );

        return true;
      }

      if (key === "Backspace" || key === "Delete") {
        event.preventDefault();
        const option = selectedValues[activeChipIndex];
        const newLen = selectedValues.length - 1;

        if (newLen === 0) {
          setActiveChipIndex(null);
        } else if (activeChipIndex >= newLen) {
          setActiveChipIndex(newLen - 1);
        }

        removeSelection(option);

        return true;
      }

      if (key === "Escape") {
        setActiveChipIndex(null);

        return true;
      }

      setActiveChipIndex(null);

      return false;
    },
    [activeChipIndex, selectedValues, removeSelection],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (handleActiveChipKey(event)) return;

      if (
        event.key === "ArrowLeft" &&
        !readOnly &&
        inputValue === "" &&
        selectedValues.length > 0
      ) {
        event.preventDefault();
        setActiveChipIndex(selectedValues.length - 1);

        return;
      }

      onInputKeyDown(event);
    },
    [handleActiveChipKey, selectedValues, inputValue, readOnly, onInputKeyDown],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setActiveChipIndex(null);
      onInputBlur(event);
    },
    [onInputBlur],
  );

  return { activeChipIndex, onKeyDown, onBlur };
}
