import { cleanup, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import omit from "lodash/omit";
import userEvent from "@testing-library/user-event";
import { DataListItems } from "./DataListItems";
import { defaultValues } from "../../context/DataListContext";
import * as dataListContext from "../../context/DataListContext/DataListContext";
import { DataListLayout } from "../DataListLayout";
import { DataListItemType } from "../../DataList.types";

const spy = jest.spyOn(dataListContext, "useDataListContext");
const mockData = [{ id: 1, label: "Luke Skywalker" }];
const mockHeader = { label: "Name" };
const contextValueWithRenderableChildren = {
  ...defaultValues,
  data: mockData,
  headers: mockHeader,
  children: (
    <DataListLayout key="layout1">
      {(item: DataListItemType<typeof mockData>) => (
        <div>
          <div>{item.label}</div>
        </div>
      )}
    </DataListLayout>
  ),
  actions: {},
};

afterEach(() => {
  cleanup();
  spy.mockReset();
});

describe("DataListItems", () => {
  describe("actions", () => {
    it("should render list items with checkboxes when actions are provided", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);

      renderItems();

      expect(screen.getAllByRole("checkbox")).toHaveLength(1);
    });

    it("should not render list items with checkboxes when no actions are provided", async () => {
      spy.mockReturnValue(omit(contextValueWithRenderableChildren, "actions"));

      renderItems();
      await waitFor(() => {
        expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
      });
    });
  });

  it("should call onSelectChanged when a checkbox is selected", async () => {
    const onSelectChangedMock = jest.fn();
    spy.mockReturnValue({
      ...contextValueWithRenderableChildren,
      onSelectChange: onSelectChangedMock,
    });
    renderItems();

    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);

    expect(onSelectChangedMock).toHaveBeenCalledTimes(1);
    expect(onSelectChangedMock).toHaveBeenCalledWith([mockData[0].id]);
  });

  it("should call onSelectChanged when wiht checkbox is un-selected", async () => {
    const onSelectChangedMock = jest.fn();
    spy.mockReturnValue({
      ...contextValueWithRenderableChildren,
      onSelectChange: onSelectChangedMock,
      selectedItems: [mockData[0].id],
    });
    renderItems();
    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);

    expect(onSelectChangedMock).toHaveBeenCalledTimes(1);
    expect(onSelectChangedMock).toHaveBeenCalledWith([]);
  });
});

function renderItems() {
  render(
    <DataListItems
      layouts={[
        <DataListLayout key={1}>
          {(item: DataListItemType<typeof mockData>) => (
            <div>
              <div>{item.label}</div>
            </div>
          )}
        </DataListLayout>,
      ]}
      mediaMatches={{ xs: true, sm: true, md: true, lg: true, xl: true }}
      data={mockData}
    />,
  );
}
