import React, {
  Key,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import styles from "./ListBox.module.css";
import { ListBoxContext, ListBoxProvider } from "./ListBoxProvider";

type SelectionMode = "single" | "multi";

// I like Sets for selections, makes more sense than arrays
// performs better too I think/hope/dream
type Selection = "all" | Set<Key>;

interface ListBoxProps extends PropsWithChildren {
  /**
   * Callback when the selection changes.
   */

  readonly onSelectionChange?: (selected: Key[]) => void;
  /**
   * Determines how the list items are selected.
   * Defaults to single.
   */
  readonly selectionMode?: SelectionMode;

  /** The currently selected keys in the collection (controlled). */
  // readonly selectedKeys?: "all" | Iterable<Key>;
  readonly selectedKeys?: "all" | Key[];
  /** The initial selected keys in the collection (uncontrolled). */
  // readonly defaultSelectedKeys?: "all" | Iterable<Key>;
  readonly defaultSelectedKeys?: "all" | Key[];
}

export function ListBox({
  children,
  selectionMode = "single",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
}: ListBoxProps) {
  const optionsListRef = useRef<HTMLUListElement>(null);
  // controlled or uncontrolled state
  // can allow it to be passed in
  const [selected, setSelected] = useState(
    new Set(selectedKeys || defaultSelectedKeys || []),
  );
  // find all the values since we don't know them, they are props to the children
  // or maybe just ask for them as options, that's much easier
  const options = React.Children.map(children, child => {
    const value = (child as ReactElement<ListBoxItemProps>).props.value;

    return value;
  });

  const selectionHandler = useCallback(
    // eslint-disable-next-line max-statements
    (value: string) => {
      let newSelected = new Set<Key>();

      if (selectionMode === "single") {
        if (selected instanceof Set) {
          newSelected = selected.has(value) ? new Set() : new Set([value]);
        } else if (selected === "all") {
          newSelected = new Set([value]);
        }
      } else {
        if (selected instanceof Set) {
          newSelected = new Set(selected);

          if (newSelected.has(value)) {
            newSelected.delete(value);
          } else {
            newSelected.add(value);
          }
        } else if (selected === "all") {
          newSelected = new Set(options);
        }
      }

      if (onSelectionChange) {
        onSelectionChange(Array.from(newSelected));
      }

      setSelected(newSelected);
    },
    [onSelectionChange, selectionMode, selected],
  );

  return (
    <ListBoxProvider
      selectedKeys={selected}
      selectionHandler={selectionHandler}
    >
      <ul
        className={styles.listBox}
        role="listbox"
        aria-multiselectable={selectionMode === "multi"}
        ref={optionsListRef}
      >
        {children}
      </ul>
    </ListBoxProvider>
  );
}

interface ListBoxItemProps {
  readonly value: string;
  readonly children: React.ReactNode;
}

ListBox.Item = function ListBoxItem({ value, children }: ListBoxItemProps) {
  const { selectedKeys, selectionHandler } = useContext(ListBoxContext);

  const handleClick = () => {
    selectionHandler(value);
  };

  const isSelected = selectedKeys === "all" ? true : selectedKeys.has(value);

  return (
    <li
      className={`${styles.listBoxItem} ${isSelected ? styles.selected : ""}`}
      tabIndex={0}
      role="option"
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      {/* we don't care about what it looks like as far as UI */}
      {children}
    </li>
  );
};

interface ListBoxFooterProps {
  readonly children: ReactNode;
}

// don't know if I like this or not
ListBox.Footer = function ListBoxFooter({ children }: ListBoxFooterProps) {
  return <div className={styles.listBoxFooter}>{children}</div>;
};
