/**
 * For playground purposes only.
 */
import uniq from "lodash/uniq";
import { useCallback, useState } from "react";

const ALL_OPTIONS = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Ugli fruit",
  "Vanilla bean",
  "Watermelon",
  "Xigua",
  "Yuzu",
  "Zucchini", // Technically a fruit!
];

// Initial selected items can be anything, even if not in ALL_OPTIONS initially
const INITIAL_SELECTED = ["Mando", "Din Djarin"];

export function useFakeOptionQuery() {
  const [selected, setSelected] = useState<string[]>(INITIAL_SELECTED);
  // Initialize options with selected items + all available options
  const [options, setOptions] = useState<string[]>(() =>
    uniq([...INITIAL_SELECTED, ...ALL_OPTIONS]),
  );

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!searchValue) {
        // Show all options (including selected) if search is cleared
        setOptions(uniq([...selected, ...ALL_OPTIONS]));
      } else {
        // Filter all options based on search, but always include currently selected ones
        const filtered = ALL_OPTIONS.filter(option =>
          option.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setOptions(uniq([...selected, ...filtered]));
      }
    },
    [selected], // Re-create search handler if selected changes
  );

  const handleSelect = (value: string[]) => {
    setSelected(value);
    // Ensure newly deselected options are still available if they are part of ALL_OPTIONS
    setOptions(prevOptions => uniq([...value, ...prevOptions, ...ALL_OPTIONS]));
  };

  const handleCustomAdd = (value: string) => {
    const newSelected = uniq([...selected, value]);
    setSelected(newSelected);
    // Add the custom value to the available options as well
    setOptions(prevOptions => uniq([...newSelected, ...prevOptions, value]));
  };

  // Note: loading and handleLoadMore are removed as they are not needed for static data
  return { selected, options, handleSearch, handleSelect, handleCustomAdd };
}

// fetchData function is removed as it's no longer needed
