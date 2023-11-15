import React from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { Combobox } from "@jobber/components/Combobox";

export function DataListSort() {
  const { sorting, headers } = useDataListContext();

  if (!sorting) return null;
  const { sortable, state, onSort } = sorting;

  const sortByOptions = getSortByOptions();

  return (
    <Combobox
      label={getButtonLabel()}
      onSelect={selection => {
        handleKeyChange(selection[0].id.toString());
      }}
      selected={[{ id: state?.key || "", label: state?.order || "" }]}
    >
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
    const label = state && headers[state.key];
    if (!label) return "Sort";

    return `Sort by: ${label}`;
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
