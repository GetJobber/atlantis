import React, { PropsWithChildren, useState } from "react";
import { DataType } from "./data";
import { ThiccListContext } from "./ThiccListContext";

export function ThiccListProvider({ children }: PropsWithChildren<object>) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  return (
    <ThiccListContext.Provider
      value={{ selectedItems, setSelectedItems, addOrRemoveSelectedItem }}
    >
      {children}
    </ThiccListContext.Provider>
  );

  function addOrRemoveSelectedItem(item: DataType, shouldClear = false) {
    let selectedItemCopy: number[] = [];

    if (!shouldClear) {
      selectedItemCopy = [...selectedItems];
    }

    if (selectedItemCopy.includes(item.id)) {
      setSelectedItems(selectedItemCopy.filter(id => id !== item.id));
    } else {
      setSelectedItems([...selectedItemCopy, item.id]);
    }
  }
}
