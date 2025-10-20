import { useCallback, useEffect, useState } from "react";

export const useMultiSelectSync = (
  availableItems: string[],
  selectedItems: string[],
  onItemsChange: (items: string[]) => void,
) => {
  // Maintain internal options state like the MultiSelect expects
  const [options, setOptions] = useState(() =>
    availableItems.map(item => ({
      label: item,
      checked: selectedItems.includes(item),
    })),
  );

  // Sync external selectedItems changes to internal options
  useEffect(() => {
    setOptions(
      availableItems.map(item => ({
        label: item,
        checked: selectedItems.includes(item),
      })),
    );
  }, [availableItems, selectedItems]);

  const handleOptionsChange = useCallback(
    (
      newOptionsOrUpdater:
        | typeof options
        | ((prev: typeof options) => typeof options),
    ) => {
      setOptions(current => {
        const newOptions =
          typeof newOptionsOrUpdater === "function"
            ? newOptionsOrUpdater(current)
            : newOptionsOrUpdater;

        // Extract selected items and notify parent
        const selected = newOptions
          .filter(option => option.checked)
          .map(option => option.label);

        onItemsChange(selected);

        return newOptions;
      });
    },
    [onItemsChange],
  );

  return { options, setOptions: handleOptionsChange };
};
