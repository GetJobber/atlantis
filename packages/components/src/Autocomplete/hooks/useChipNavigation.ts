import type React from "react";
import { useCallback, useMemo, useState } from "react";
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
  const [rawActiveChipIndex, setRawActiveChipIndex] = useState<number | null>(
    null,
  );
  const [previousInputValue, setPreviousInputValue] = useState(inputValue);

  const activeChipIndex = useMemo(
    () => clampActiveIndex(rawActiveChipIndex, selectedValues.length),
    [rawActiveChipIndex, selectedValues.length],
  );

  if (previousInputValue !== inputValue) {
    setPreviousInputValue(inputValue);

    if (inputValue !== "" && rawActiveChipIndex !== null) {
      setRawActiveChipIndex(null);
    }
  }

  const handleActiveChipKey = useCallback(
    // eslint-disable-next-line max-statements
    (event: React.KeyboardEvent): boolean => {
      if (activeChipIndex === null) return false;

      const { key } = event;

      if (key === "ArrowLeft") {
        event.preventDefault();
        setRawActiveChipIndex(i => Math.max(0, (i ?? 0) - 1));

        return true;
      }

      if (key === "ArrowRight") {
        event.preventDefault();
        setRawActiveChipIndex(
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
          setRawActiveChipIndex(null);
        } else if (activeChipIndex >= newLen) {
          setRawActiveChipIndex(newLen - 1);
        }

        removeSelection(option);

        return true;
      }

      if (key === "Escape") {
        setRawActiveChipIndex(null);

        return true;
      }

      setRawActiveChipIndex(null);

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
        setRawActiveChipIndex(selectedValues.length - 1);

        return;
      }

      onInputKeyDown(event);
    },
    [handleActiveChipKey, selectedValues, inputValue, readOnly, onInputKeyDown],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRawActiveChipIndex(null);
      onInputBlur(event);
    },
    [onInputBlur],
  );

  return { activeChipIndex, onKeyDown, onBlur };
}

function clampActiveIndex(index: number | null, length: number): number | null {
  if (index === null) return null;
  if (length === 0) return null;
  if (index >= length) return length - 1;

  return index;
}
