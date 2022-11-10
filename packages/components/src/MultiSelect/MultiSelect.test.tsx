import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelect } from ".";

afterEach(cleanup);

const options = [
  { label: "Synced", checked: true },
  { label: "Errors" },
  { label: "Warnings", checked: true },
  { label: "Ignored", checked: true },
];
const changeHandler = jest.fn();
const component = (
  <MultiSelect
    defaultLabel="Status"
    allSelectedLabel="All Statuses"
    options={options}
    onChange={changeHandler}
  />
);

describe("when rendering MultiSelect component", () => {
  describe("when not all options are checked", () => {
    beforeEach(() => {
      render(component);
    });

    it("input should have checked options as the value", () => {
      const multiSelectInput = screen.getByRole("textbox");

      expect(multiSelectInput).toHaveValue("Synced, Warnings, Ignored");
    });
  });

  describe("when all options are unchecked ", () => {
    const allOptionsUnchecked = [
      { label: "Synced", checked: false },
      { label: "Errors", checked: false },
      { label: "Warnings", checked: false },
      { label: "Ignored", checked: false },
    ];

    beforeEach(() => {
      render(
        <MultiSelect
          defaultLabel="Status"
          allSelectedLabel="All Statuses"
          options={allOptionsUnchecked}
          onChange={changeHandler}
        />,
      );
    });

    it("input should have the provided defaultLabel as value", () => {
      const multiSelectInput = screen.getByRole("textbox");

      expect(multiSelectInput).toHaveValue("Status");
    });
  });

  describe("when all options are checked ", () => {
    const allOptionsChecked = [
      { label: "Synced", checked: true },
      { label: "Errors", checked: true },
      { label: "Warnings", checked: true },
      { label: "Ignored", checked: true },
    ];

    beforeEach(() => {
      render(
        <MultiSelect
          defaultLabel="Status"
          allSelectedLabel="All Statuses"
          options={allOptionsChecked}
          onChange={changeHandler}
        />,
      );
    });

    it("input should have the provided allSelectedLabel as value", () => {
      const multiSelectInput = screen.getByRole("textbox");

      expect(multiSelectInput).toHaveValue("All Statuses");
    });
  });
});

describe("when displaying the options", () => {
  beforeEach(() => {
    render(component);
  });

  it("should not display the menu", () => {
    expect(screen.queryByTestId("dropdown-menu")).toBeNull();
  });

  describe("when clicking MultiSelect", () => {
    it("should display the dropdown menu with the options", () => {
      userEvent.click(screen.getByRole("textbox"));
      const dropDownMenu = screen.getByTestId("dropdown-menu");

      expect(dropDownMenu).not.toBeNull();
      expect(within(dropDownMenu).getByText(/Synced/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Errors/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Warnings/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Ignored/i)).toBeInTheDocument();
    });
  });

  describe("when pressing 'Escape' key", () => {
    it("should hide the dropdown menu", () => {
      userEvent.click(screen.getByRole("textbox"));

      expect(screen.queryByTestId("dropdown-menu")).not.toBeNull();

      fireEvent(
        screen.getByRole("textbox"),
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: false,
        }),
      );

      expect(screen.queryByTestId("dropdown-menu")).toBeNull();
    });
  });
});

describe("when selecting an option", () => {
  beforeEach(() => {
    render(component);
  });

  describe("when using mouse click event", () => {
    it("should call the provided callback", () => {
      userEvent.click(screen.getByRole("textbox"));
      userEvent.click(screen.getAllByRole("checkbox")[0]);

      expect(changeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("when using keyboard navigation", () => {
    it("should call the provided callback", () => {
      userEvent.click(screen.getByRole("textbox"));

      fireEvent(
        screen.getByTestId("dropdown-menu"),
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          cancelable: false,
        }),
      );
      fireEvent(
        screen.getByTestId("dropdown-menu"),
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          bubbles: true,
          cancelable: false,
        }),
      );
      fireEvent(
        screen.getByTestId("dropdown-menu"),
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          cancelable: false,
        }),
      );

      expect(changeHandler).toHaveBeenCalledWith(options[1]);
    });
  });
});
