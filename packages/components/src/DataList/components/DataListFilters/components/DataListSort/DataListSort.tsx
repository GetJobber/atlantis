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
      onSelect={selection => handleKeyChange(selection[0].id.toString())}
      selected={[
        {
          id: getSelectedSortID(),
          label: state?.order || "",
        },
      ]}
    >
      <Combobox.Activator>
        <Chip
          heading="Sort"
          label={getButtonLabel()}
          variation={state ? "base" : "subtle"}
        >
          {!state && (
            <Chip.Suffix>
              <Icon name="arrowDown" size="small" />
            </Chip.Suffix>
          )}
        </Chip>
      </Combobox.Activator>
      {sortByOptions.map(({ label, value }) => (
        <Combobox.Option key={value} id={value} label={label} />
      ))}
    </Combobox>
  );

  function getSortByOptions() {
    const options = sortable.reduce(
      (acc: Record<"label" | "value", string>[], sort) => {
        const label = headers[sort.key];
        if (!label) return acc;
        const customOptions = sort.options;

        if (customOptions) {
          customOptions.forEach(option => {
            acc.push({
              label: option.label || "",
              value: JSON.stringify({
                key: sort.key,
                order: option.order,
                label: option.label,
                id: option.id,
              }),
            });
          });

          return acc;
        }
        // acc.push({
        //   label: `${label} (A-Z)`,
        //   value: JSON.stringify({
        //     key: sort.key,
        //     order: "asc",
        //     label: label,
        //     id: sort.key,
        //   }),
        // });
        // acc.push({
        //   label: `${label} (Z-A)`,
        //   value: JSON.stringify({
        //     key: sort.key,
        //     order: "desc",
        //     label: label,
        //     id: sort.key,
        //   }),
        // });

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
      option => option.value === getSelectedSortID(),
    );

    return selectedOption?.label || "";
  }

  function handleKeyChange(value?: string) {
    if (value && value !== "none") {
      const { key, order, label, id } = JSON.parse(value);
      onSort({ key, order: order as "asc" | "desc", label, id });

      return;
    }

    onSort(undefined);
  }

  function getSelectedSortID() {
    const selectedSortID = {
      key: state?.key,
      order: state?.order,
      label: state?.label,
      id: state?.id,
    };

    return JSON.stringify(selectedSortID);
  }
}
