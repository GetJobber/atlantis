import React from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { Combobox } from "@jobber/components/Combobox";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";

export function DataListSort() {
  const { sorting, headers } = useDataListContext();

  if (!sorting) return null;
  const { sortable, state, onSort } = sorting;

  const sortByOptions = getSortByOptions();

  return (
    <Combobox
      onSelect={selection => {
        handleKeyChange(selection[0].id.toString());
      }}
      selected={[{ id: state?.key || "", label: state?.order || "" }]}
    >
      <Combobox.Activator>
        <Chip heading="Sort" label={getButtonLabel()} variation="subtle">
          {!state && (
            <Chip.Suffix>
              <Icon name="arrowDown" size="small" />
            </Chip.Suffix>
          )}
        </Chip>
      </Combobox.Activator>
      {sortByOptions.map(({ label, value }) => {
        return <Combobox.Option key={value} id={value} label={label} />;
      })}
    </Combobox>
  );

  function getSortByOptions() {
    const options = sortable.reduce(
      (acc: Record<"label" | "value", string>[], sort) => {
        const label = headers[sort];
        if (!label) return acc;

        if (label === "Last activity") {
          acc.push({ label: "Last Activity (Newest)", value: `${sort},desc` });
          acc.push({ label: "Last Activity (Oldest)", value: `${sort},asc` });
        } else {
          acc.push({ label: `${label} (A-Z)`, value: `${sort},asc` });
          acc.push({ label: `${label} (Z-A)`, value: `${sort},desc` });
        }

        return acc;
      },
      [],
    );

    // Inject a none option as the first option
    options.unshift({ label: "None", value: "none" });

    return options;
  }

  function getButtonLabel() {
    const selectedOption = sortByOptions.find(
      option => option.value === `${state?.key},${state?.order}`,
    );

    return selectedOption?.label || "";
  }

  function handleKeyChange(value?: string) {
    if (value && value !== "none") {
      const [key, order] = value.split(",");
      onSort({ key, order: order as "asc" | "desc" });

      return;
    }

    onSort(undefined);
  }
}
