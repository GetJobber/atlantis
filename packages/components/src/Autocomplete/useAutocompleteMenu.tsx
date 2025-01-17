import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { useEffect, useState } from "react";
import { useKeyListeners } from "./useKeyListeners";
import { AnyOption, Option, UseAutocompleteMenuProps } from "./types";

export const useAutoCompleteMenu = ({
  options,
  visible,
  menuRef,
  onOptionSelect,
}: UseAutocompleteMenuProps) => {
  const detectSeparatorCondition = (option: Option) =>
    option.description || option.details;

  const detectGroups = (option: AnyOption) => option.options;

  const addSeparators = options?.some(detectSeparatorCondition);

  const initialHighlight = options?.some(detectGroups) ? 1 : 0;
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => setHighlightedIndex(initialHighlight), [options]);

  const { isOptionSelected, isGroup } = useKeyListeners({
    options,
    visible,
    highlightedIndex,
    setHighlightedIndex,
    menuRef,
    onOptionSelect,
  });

  const mounted = useIsMounted();

  return {
    mounted,
    addSeparators,
    initialHighlight,
    isOptionSelected,
    highlightedIndex,
    isGroup,
    setHighlightedIndex,
  };
};
