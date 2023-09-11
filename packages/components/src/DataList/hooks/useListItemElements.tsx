import React, { isValidElement } from "react";
import { DataListItemType, DataListObject } from "../DataList.types";
import { DataListTags } from "../components/DataListTags";
import { FormatDate } from "../../FormatDate";
import { Text } from "../../Text";
import { Heading } from "../../Heading";
import { useDataListContext } from "../context/DataListContext";
import styles from "../DataList.css";
import { Checkbox } from "../../Checkbox";

/**
 * Generate the default elements the DataList would use on the data provided.
 */

export function useListItemElements<T extends DataListObject>(data: T[]) {
  type DataListElements = DataListItemType<typeof data>;

  return data.map(item =>
    // eslint-disable-next-line max-statements
    Object.keys(item).reduce((acc, key: keyof DataListElements) => {
      const currentItem = item[key];

      if (!currentItem) {
        return acc;
      }
      if (key === "tags" && Array.isArray(currentItem)) {
        acc[key] = <DataListTags items={currentItem} />;
      } else if (key === "label" && typeof currentItem === "string") {
        acc[key] = <LabelInternal currentItem={currentItem} item={item} />;
      } else if (isValidElement(currentItem)) {
        acc[key] = currentItem;
      } else if (currentItem instanceof Date) {
        acc[key] = (
          <Text variation="subdued">
            <FormatDate date={currentItem} />
          </Text>
        );
      } else {
        acc[key] = <Text variation="subdued">{currentItem}</Text>;
      }

      return acc;
    }, {} as DataListElements),
  );
}

function LabelInternal<T extends DataListObject>({
  currentItem,
  item,
}: {
  currentItem: string;
  item: T;
}) {
  const { selectedItems, actions, onSelectChange } = useDataListContext();
  if (actions) {
    return (
      <div className={styles.selectable}>
        <Checkbox
          checked={selectedItems?.includes(item.id)}
          onChange={() => {
            console.log("test change", item.id);
            onSelectChange?.(selectedItems ? [...selectedItems, item.id] : []);
          }}
        />
        <Heading level={5}>{currentItem}</Heading>
      </div>
    );
  }

  return <Heading level={5}>{currentItem}</Heading>;
}
