import React, { useRef, useState } from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { Button } from "@jobber/components/Button";
import { Popover } from "@jobber/components/Popover";
import { Content } from "@jobber/components/Content";
import { Chips } from "@jobber/components/Chips";
import { Chip } from "@jobber/components/Chip";
import { Heading } from "@jobber/components/Heading";

export function DataListSort() {
  const { sorting, headers } = useDataListContext();
  const divRef = useRef<HTMLSpanElement>(null);
  const [showPopover, setShowPopover] = useState(false);

  if (!sorting) return null;
  const { sortable, state, onSort } = sorting;

  const sortByOptions = getSortByOptions();
  const canChangeOrder = !state?.key;

  return (
    <>
      <span ref={divRef}>
        <Button
          {...(!state && { icon: "add", iconOnRight: true })}
          label={getButtonLabel()}
          variation="subtle"
          onClick={() => setShowPopover(!showPopover)}
        />
      </span>
      <Popover
        attachTo={divRef}
        open={showPopover}
        onRequestClose={() => setShowPopover(false)}
      >
        <Content>
          <Heading level={5}>Sort by</Heading>
          <Chips selected={state?.key || "none"} onChange={handleKeyChange}>
            {sortByOptions.map(({ label, value }) => (
              <Chip key={label} label={label} value={value} role="radio" />
            ))}
          </Chips>

          <Heading level={5}>Ordered by</Heading>
          <Chips selected={state?.order || ""} onChange={handleSortingChange}>
            <Chip
              label="Ascending"
              value="asc"
              disabled={canChangeOrder}
              role="radio"
            />
            <Chip
              label="Descending"
              value="desc"
              disabled={canChangeOrder}
              role="radio"
            />
          </Chips>
        </Content>
      </Popover>
    </>
  );

  function getSortByOptions() {
    const options = sortable.reduce(
      (acc: Record<"label" | "value", string>[], sort) => {
        const label = headers[sort];
        if (!label) return acc;

        acc.push({ label, value: sort.toString() });

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
    if (!label) return "Sort by";

    return `Sort by: ${label}, ${state.order}`;
  }

  function handleKeyChange(value?: string) {
    if (value && value !== "none" && value !== state?.order) {
      onSort({ key: value, order: state?.order || "asc" });

      return;
    }

    onSort(undefined);
  }

  function handleSortingChange(value: "asc" | "desc") {
    if (state?.key && value && value !== state?.order) {
      onSort({ key: state.key, order: value });

      return;
    }
  }
}
