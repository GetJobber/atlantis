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
const mockData = [
  { id: 1, label: "Luke Skywalker" },
  { id: 2, label: "Anakin Skywalker" },
];
const mockHeader = { label: "Name" };
const contextValueWithRenderableChildren = {
  ...defaultValues,
  data: mockData,
  onSelect: jest.fn(),
  selected: [],
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
};

afterEach(() => {
  cleanup();
  spy.mockReset();
});

describe("DataListItems", () => {
  describe("selectable", () => {
    it("should render list items with checkboxes when onSelect and selected provided", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);

      renderItems();

      expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });

    it("should not render list items with checkboxes when  selected is not provided", async () => {
      spy.mockReturnValue(omit(contextValueWithRenderableChildren, "selected"));

      renderItems();
      await waitFor(() => {
        expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
      });
    });

    it("should not render list items with checkboxes when  onSelect is not provided", async () => {
      spy.mockReturnValue(omit(contextValueWithRenderableChildren, "onSelect"));

      renderItems();
      await waitFor(() => {
        expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
      });
    });
  });

  describe("onSelect", () => {
    it("should call onSelect when a single checkbox is selected", async () => {
      const onSelectMock = jest.fn();
      spy.mockReturnValue({
        ...contextValueWithRenderableChildren,
        onSelect: onSelectMock,
      });
      renderItems();

      const checkbox = screen.getAllByRole("checkbox")[0];

      await userEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith([mockData[0].id]);
    });

    it("should call onSelect with multiple checkboxes selected", async () => {
      const onSelectMock = jest.fn();
      spy.mockReturnValue({
        ...contextValueWithRenderableChildren,
        selected: [mockData[0].id],
        onSelect: onSelectMock,
      });
      renderItems();

      const checkbox = screen.getAllByRole("checkbox")[1];

      userEvent.click(checkbox);
      await waitFor(() => {
        expect(onSelectMock).toHaveBeenCalledTimes(1);
        expect(onSelectMock).toHaveBeenCalledWith([
          mockData[0].id,
          mockData[1].id,
        ]);
      });
    });

    it("should call onSelect when a signle checkbox is un-selected", async () => {
      const onSelectMock = jest.fn();
      spy.mockReturnValue({
        ...contextValueWithRenderableChildren,
        onSelect: onSelectMock,
        selected: [mockData[0].id, mockData[1].id],
      });
      renderItems();
      const checkbox = screen.getAllByRole("checkbox")[0];

      await userEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith([mockData[1].id]);
    });
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
