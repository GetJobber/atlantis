import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as POM from "./ComboboxAction.pom";

const onClick = jest.fn();
const setOpen = jest.fn();

afterEach(() => {
  onClick.mockClear();
  setOpen.mockClear();
});

describe("ComboboxAction", () => {
  it("renders without error", () => {
    POM.renderComboboxAction([{ label: "Label", onClick }]);

    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    POM.renderComboboxAction([{ label: "Add a teammate", onClick }]);

    await userEvent.click(screen.getByText("Add a teammate"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can exist in a group of multiple actions", async () => {
    const actions = [
      { label: "Action 1", onClick: jest.fn() },
      { label: "Action 2", onClick: jest.fn() },
      { label: "Action 3", onClick: jest.fn() },
    ];

    POM.renderComboboxAction(actions);

    for (const action of actions) {
      await userEvent.click(screen.getByText(action.label));
      expect(action.onClick).toHaveBeenCalledTimes(1);
    }
  });

  it("closes the Combobox when closeOnActionClick is true", async () => {
    POM.renderComboboxAction(
      [{ label: "Collapse Action", onClick, closeOnActionClick: true }],
      setOpen,
    );

    await userEvent.click(screen.getByText("Collapse Action"));

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
