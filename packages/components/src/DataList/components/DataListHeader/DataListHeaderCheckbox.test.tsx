import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breakpoints } from "@jobber/components/DataList/DataList.types";
import { BREAKPOINT_SIZES } from "@jobber/components/DataList/DataList.const";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import {
  DATA_LIST_HEADER_BATCH_SELECT_TEST_ID,
  DATA_LIST_HEADER_CHECKBOX_TEST_ID,
  DataListHeaderCheckbox,
} from "./DataListHeaderCheckbox";

const handleSelect = jest.fn();
const handleSelectAll = jest.fn();

beforeEach(() => {
  handleSelect.mockReset();
  handleSelectAll.mockReset();
});

const withBothHandlersContext = {
  ...defaultValues,
  selected: ["1"],
  onSelect: handleSelect,
  onSelectAll: handleSelectAll,
  data: [{ id: "1" }, { id: "2" }],
};

const withOnlySelectContext = {
  ...defaultValues,
  selected: ["1"],
  onSelect: handleSelect,
  data: [{ id: "1" }, { id: "2" }],
};

const withoutHandlersContext = {
  ...defaultValues,
  data: [{ id: "1" }, { id: "2" }],
};

const withNoSelectedItemsContext = {
  ...withBothHandlersContext,
  selected: [],
};

const deselectAllLabel = "Deselect All";

describe("DataListHeaderCheckbox", () => {
  describe("when neither onSelect nor onSelectAll are provided", () => {
    it("should only render the children without checkbox or AnimatedSwitcher", () => {
      const childText = "Find me";
      render(
        <DataListContext.Provider value={withoutHandlersContext}>
          <DataListHeaderCheckbox>
            <p data-testid="child-element">{childText}</p>
          </DataListHeaderCheckbox>
        </DataListContext.Provider>,
      );

      expect(screen.getByTestId("child-element")).toBeInTheDocument();
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID),
      ).not.toBeInTheDocument();
    });
  });

  describe("when only onSelect is provided", () => {
    it("should render an invisible checkbox with children (no AnimatedSwitcher)", () => {
      const childText = "Find me";
      render(
        <DataListContext.Provider value={withOnlySelectContext}>
          <DataListHeaderCheckbox>
            <p data-testid="child-element">{childText}</p>
          </DataListHeaderCheckbox>
        </DataListContext.Provider>,
      );

      expect(screen.getByTestId("child-element")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(
        screen.getByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID),
      ).not.toHaveClass("visible");
    });
  });

  describe("when both onSelect and onSelectAll are provided", () => {
    it("should render a visible checkbox and children when no items are selected", () => {
      const childText = "Find me";
      render(
        <DataListContext.Provider value={withNoSelectedItemsContext}>
          <DataListHeaderCheckbox>
            <p data-testid="child-element">{childText}</p>
          </DataListHeaderCheckbox>
        </DataListContext.Provider>,
      );

      expect(screen.getByTestId("child-element")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(
        screen.getByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID),
      ).toBeInTheDocument();
      expect(screen.getByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID)).toHaveClass(
        "visible",
      );
      expect(
        screen.queryByTestId(DATA_LIST_HEADER_BATCH_SELECT_TEST_ID),
      ).not.toBeInTheDocument();
    });

    it("should render the batch select UI when items are selected", () => {
      const childText = "Find me";
      render(
        <DataListContext.Provider value={withBothHandlersContext}>
          <DataListHeaderCheckbox>
            <p data-testid="child-element">{childText}</p>
          </DataListHeaderCheckbox>
        </DataListContext.Provider>,
      );

      expect(screen.queryByTestId("child-element")).not.toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(
        screen.getByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID),
      ).toBeInTheDocument();
      expect(screen.getByTestId(DATA_LIST_HEADER_CHECKBOX_TEST_ID)).toHaveClass(
        "visible",
      );
      expect(
        screen.getByTestId(DATA_LIST_HEADER_BATCH_SELECT_TEST_ID),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: deselectAllLabel }),
      ).toBeInTheDocument();
    });
  });

  it("should fire the onSelectAll when the checkbox has been clicked", async () => {
    render(
      <DataListContext.Provider value={withBothHandlersContext}>
        <DataListHeaderCheckbox>
          <div />
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    await userEvent.click(screen.getByRole("checkbox"));

    expect(handleSelectAll).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array on onSelect when deselect all has been clicked", async () => {
    render(
      <DataListContext.Provider value={withBothHandlersContext}>
        <DataListHeaderCheckbox>
          <div />
        </DataListHeaderCheckbox>
      </DataListContext.Provider>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: deselectAllLabel }),
    );

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
          { ...withBothHandlersContext, totalCount: 2 },
        ],
        [
          "is less than the length of data",
          { ...withBothHandlersContext, data: [{ id: 1 }, { id: 2 }] },
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
      [
        "is the same as totalCount",
        { ...withBothHandlersContext, totalCount: 1 },
      ],
      [
        "is greater than or equal to the length of data",
        { ...withBothHandlersContext, data: [{ id: 1 }] },
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
