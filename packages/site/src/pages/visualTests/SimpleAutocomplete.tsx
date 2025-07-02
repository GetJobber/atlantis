import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./SimpleAutocomplete.module.css";

interface AutocompleteProps {
  readonly suggestions: string[];
  readonly onSelect: (value: string) => void;
  readonly renderItem?: (item: string) => React.ReactNode;
}

export default function SimpleAutocomplete({
  suggestions,
  onSelect,
  renderItem,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredSuggestions = suggestions.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase()),
  );

  useEffect(() => {
    if (highlightedIndex >= filteredSuggestions.length) {
      setHighlightedIndex(-1);
    }
  }, [filteredSuggestions, highlightedIndex]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();

        if (highlightedIndex >= 0) {
          selectItem(filteredSuggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const selectItem = (item: string) => {
    setInputValue(item);
    setIsOpen(false);
    onSelect(item);
  };

  const handleItemClick = (index: number) => {
    selectItem(filteredSuggestions[index]);
  };

  return (
    <div className={styles.autocomplete}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          ref={inputRef}
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls="autocomplete-listbox"
          aria-expanded={isOpen}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `autocomplete-item-${highlightedIndex}`
              : undefined
          }
          role="combobox"
        />
      </div>
      {isOpen && filteredSuggestions.length > 0 && (
        <ul
          id="autocomplete-listbox"
          className={styles.list}
          role="listbox"
          ref={listRef}
        >
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              id={`autocomplete-item-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              className={`${styles.item} ${
                highlightedIndex === index ? styles.highlighted : ""
              }`}
              onMouseDown={() => handleItemClick(index)}
            >
              {renderItem ? renderItem(item) : item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
