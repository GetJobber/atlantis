import React, { useState } from "react";
import { render as renderComponent, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { DataList } from "../DataList";
import type { DataListSelectedType } from "../DataList.types";

const mockOnSearch = jest.fn();
const mockData = [
  { id: 1, label: "Jake Peralta" },
  { id: 2, label: "Amy Santiago" },
  { id: 3, label: "Rosa Diaz" },
  { id: 4, label: "Charles Boyle" },
  { id: 5, label: "Terry Jeffords" },
  { id: 6, label: "Raymond Holt" },
  { id: 7, label: "Gina Linetti" },
];

function ControlledDataList() {
  const [selected, setSelected] = useState<DataListSelectedType<number>>([]);

  return (
    <DataList
      totalCount={mockData.length}
      data={mockData}
      headers={{ label: "Name" }}
      selected={selected}
      onSelect={setSelected}
      onSelectAll={setSelected}
    >
      <DataList.Search onSearch={mockOnSearch} />
      <DataList.Layout>{item => <div>{item.label}</div>}</DataList.Layout>
    </DataList>
  );
}

export function render() {
  renderComponent(<ControlledDataList />);
}

export function getCheckboxes() {
  return screen.getAllByRole("checkbox");
}

export async function clickCheckbox(index: number) {
  await userEvent.click(getCheckboxes()[index]);
}

export async function clickSelectAllCheckbox() {
  await userEvent.click(getCheckboxes()[0]);
}

export async function clickDeselectAllButton() {
  await userEvent.click(await screen.findByText("Deselect All"));
}
