import React, { useState } from "react";
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

const Component = () => {
  const [options, setOptions] = useState([
    { label: "Synced", checked: true },
    { label: "Errors", checked: false },
    { label: "Warnings", checked: true },
    { label: "Ignored", checked: true },
  ]);

  return (
    <MultiSelect
      defaultLabel="Status"
      allSelectedLabel="All Statuses"
      options={options}
      onOptionsChange={setOptions}
    />
  );
};

describe("when rendering MultiSelect component", () => {
  describe("when not all options are checked", () => {
    beforeEach(() => {
      render(<Component />);
    });

    it("input should have checked options as the value", () => {
      const multiSelectInput = screen.getByTestId("multi-select");

      expect(multiSelectInput).toHaveTextContent("Synced, Warnings, Ignored");
    });
  });

  describe("when all options are unchecked ", () => {
    const AllOptionsUnchecked = () => {
      const [options, setOptions] = useState([
        { label: "Synced", checked: false },
        { label: "Errors", checked: false },
        { label: "Warnings", checked: false },
        { label: "Ignored", checked: false },
      ]);

      return (
        <MultiSelect
          defaultLabel="Status"
          allSelectedLabel="All Statuses"
          options={options}
          onOptionsChange={setOptions}
        />
      );
    };

    beforeEach(() => {
      render(<AllOptionsUnchecked />);
    });

    it("input should have the provided defaultLabel as value", () => {
      const multiSelectInput = screen.getByTestId("multi-select");

      expect(multiSelectInput).toHaveTextContent("Status");
    });
  });

  describe("when all options are checked ", () => {
    const AllOptionsChecked = () => {
      const [options, setOptions] = useState([
        { label: "Synced", checked: true },
        { label: "Errors", checked: true },
        { label: "Warnings", checked: true },
        { label: "Ignored", checked: true },
      ]);

      return (
        <MultiSelect
          defaultLabel="Status"
          allSelectedLabel="All Statuses"
          options={options}
          onOptionsChange={setOptions}
        />
      );
    };

    beforeEach(() => {
      render(<AllOptionsChecked />);
    });

    it("input should have the provided allSelectedLabel as value", () => {
      const multiSelectInput = screen.getByTestId("multi-select");

      expect(multiSelectInput).toHaveTextContent("All Statuses");
    });
  });
});

describe("when focusing multislect to display the options", () => {
  beforeEach(() => {
    render(<Component />);
  });

  it("should not display the menu", () => {
    expect(screen.queryByTestId("dropdown-menu")).toBeNull();
  });

  describe("when clicking MultiSelect", () => {
    it("should display the dropdown menu with the options", async () => {
      await userEvent.click(screen.getByTestId("multi-select"));
      const dropDownMenu = screen.getByTestId("dropdown-menu");

      expect(dropDownMenu).not.toBeNull();
      expect(within(dropDownMenu).getByText(/Synced/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Errors/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Warnings/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Ignored/i)).toBeInTheDocument();
    });
  });

  describe("when pressing Spacebar key", () => {
    it("should display the dropdown menu with the options", async () => {
      await userEvent.tab();
      fireEvent(
        screen.getByTestId("multi-select"),
        new KeyboardEvent("keydown", {
          key: " ",
          bubbles: true,
          cancelable: false,
        }),
      );

      const dropDownMenu = screen.getByTestId("dropdown-menu");

      expect(dropDownMenu).not.toBeNull();
      expect(within(dropDownMenu).getByText(/Synced/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Errors/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Warnings/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Ignored/i)).toBeInTheDocument();
    });
  });

  describe("when pressing Enter key", () => {
    it("should display the dropdown menu with the options", async () => {
      await userEvent.tab();
      fireEvent(
        screen.getByTestId("multi-select"),
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          cancelable: false,
        }),
      );

      const dropDownMenu = screen.getByTestId("dropdown-menu");

      expect(dropDownMenu).not.toBeNull();
      expect(within(dropDownMenu).getByText(/Synced/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Errors/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Warnings/i)).toBeInTheDocument();
      expect(within(dropDownMenu).getByText(/Ignored/i)).toBeInTheDocument();
    });
  });

  describe("when pressing 'Escape' key", () => {
    it("should hide the dropdown menu", async () => {
      await userEvent.click(screen.getByTestId("multi-select"));

      expect(screen.queryByTestId("dropdown-menu")).not.toBeNull();

      fireEvent(
        screen.getByTestId("multi-select"),
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: false,
        }),
      );

      expect(screen.queryByTestId("dropdown-menu")).toBeNull();
    });
  });

  describe("when clicking out of the component", () => {
    it("should hide the dropdown menu", async () => {
      await userEvent.click(screen.getByTestId("multi-select"));

      expect(screen.queryByTestId("dropdown-menu")).not.toBeNull();

      await userEvent.click(document.body);

      expect(screen.queryByTestId("dropdown-menu")).toBeNull();
    });
  });
});

describe("when selecting an option", () => {
  beforeEach(() => {
    render(<Component />);
  });

  describe("when using mouse click event", () => {
    it("should call the provided callback", async () => {
      await userEvent.click(screen.getByTestId("multi-select"));
      await userEvent.click(screen.getAllByRole("checkbox")[2]);

      expect(screen.getByLabelText("Warnings")).not.toBeChecked();
    });
  });

  describe("when using keyboard navigation", () => {
    it("should call the provided callback when using arrows and Enter keys", async () => {
      await userEvent.click(screen.getByTestId("multi-select"));

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

      expect(screen.getByLabelText("Errors")).toBeChecked();
    });

    it("should call the provided callback when using tab and spacebar keys", async () => {
      await userEvent.click(screen.getByTestId("multi-select"));

      await userEvent.tab();
      fireEvent(
        screen.getByTestId("dropdown-menu"),
        new KeyboardEvent("keydown", {
          key: " ",
          bubbles: true,
          cancelable: false,
        }),
      );

      expect(screen.getByLabelText("Errors")).toBeChecked();
    });
  });
});
