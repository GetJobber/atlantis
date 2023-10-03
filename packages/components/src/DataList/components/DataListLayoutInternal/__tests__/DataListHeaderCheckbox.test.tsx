import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breakpoints } from "@jobber/components/DataList/DataList.types";
import { BREAKPOINT_SIZES } from "@jobber/components/DataList/DataList.const";
import {
  DataListContext,
  defaultValues,
} from "../../../context/DataListContext";
import { DataListHeaderCheckbox } from "../DataListHeaderCheckbox";

const handleSelect = jest.fn();
const handleSelectAll = jest.fn();

beforeEach(() => {
  handleSelect.mockReset();
  handleSelectAll.mockReset();
});

const withSelectedContext = {
  ...defaultValues,
  selected: ["1"],
  onSelect: handleSelect,
  onSelectAll: handleSelectAll,
};

const withoutSelectedContext = {
  ...defaultValues,
  ...withSelectedContext,
  selected: [],
};

const deselectAllLabel = "Deselect All";

describe("DataListHeaderCheckbox", () => {
  it("should only render the checkbox and children when there are no selected items", () => {
    const textToBeFound = "Find me";
    render(
      <DataListContext.Provider value={withoutSelectedContext}>
        <DataListHeaderCheckbox>
          <p>{textToBeFound}</p>
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: deselectAllLabel }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(textToBeFound)).toBeInTheDocument();
  });

  it("should only render the checkbox and deselect all button when there are selected items", () => {
    const textToBeFound = "Find me";
    render(
      <DataListContext.Provider value={withSelectedContext}>
        <DataListHeaderCheckbox>
          <p>{textToBeFound}</p>
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: deselectAllLabel }),
    ).toBeInTheDocument();
    expect(screen.queryByText(textToBeFound)).not.toBeInTheDocument();
  });

  it("should only render the children when none of the required props are implemented", () => {
    const textToBeFound = "Find me";
    render(
      <DataListContext.Provider value={defaultValues}>
        <DataListHeaderCheckbox>
          <p>{textToBeFound}</p>
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: deselectAllLabel }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(textToBeFound)).toBeInTheDocument();
  });

  it("should fire the onSelectAll when the checkbox have been clicked", () => {
    render(
      <DataListContext.Provider value={withSelectedContext}>
        <DataListHeaderCheckbox>
          <div />
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    userEvent.click(screen.getByRole("checkbox"));

    expect(handleSelectAll).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array on onSelect when deselect all have been clicked", () => {
    render(
      <DataListContext.Provider value={withSelectedContext}>
        <DataListHeaderCheckbox>
          <div />
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    userEvent.click(screen.getByRole("button", { name: deselectAllLabel }));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  describe("Select All Checkbox Indeterminate and Checked State", () => {
    const originalMatchMedia = window.matchMedia;

    afterAll(() => {
      window.matchMedia = originalMatchMedia;
    });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => {
        const queryValue = parseInt(query.match(/(\d+)/)?.[0] || "0", 10);
        const queryBreakpoint = Object.entries(BREAKPOINT_SIZES).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => {
            return value === queryValue;
          },
        )?.[0];
        const expectedValue = {
          xs: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
        }[queryBreakpoint as Breakpoints];
        return {
          matches: expectedValue,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });
    describe("Indeterminate", () => {
      it.each([
        [
          "is not the same as totalCount",
          { ...withSelectedContext, totalCount: 2 },
        ],
        [
          "is less than the length of data",
          { ...withSelectedContext, data: [{ id: 1 }, { id: 2 }] },
        ],
      ])("should be indeterminate when the selected items %s", (_, context) => {
        render(
          <DataListContext.Provider value={context}>
            <DataListHeaderCheckbox>
              <div />
            </DataListHeaderCheckbox>
          </DataListContext.Provider>,
        );

        expect(screen.getByRole("checkbox")).toHaveClass("indeterminate");
      });
    });

    it.each([
      ["is the same as totalCount", { ...withSelectedContext, totalCount: 1 }],
      [
        "is greater than or equal to the length of data",
        { ...withSelectedContext, data: [{ id: 1 }] },
      ],
    ])("should be a checkmark when the selected items %s", (_, context) => {
      render(
        <DataListContext.Provider value={context}>
          <DataListHeaderCheckbox>
            <div />
          </DataListHeaderCheckbox>
        </DataListContext.Provider>,
      );

      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });
});
