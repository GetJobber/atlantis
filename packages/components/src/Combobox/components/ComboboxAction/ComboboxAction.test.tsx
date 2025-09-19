import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as POM from "./ComboboxAction.pom";

const onClick = jest.fn();
const handleClose = jest.fn();

afterEach(() => {
  onClick.mockClear();
  handleClose.mockClear();
});

describe("ComboboxAction", () => {
  const renderAction = actions => {
    POM.renderComboboxAction(actions, handleClose);
  };
  it("renders without error", () => {
    renderAction([{ label: "Label", onClick }]);

    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    renderAction([{ label: "Add a teammate", onClick }]);

    await userEvent.click(screen.getByText("Add a teammate"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can exist in a group of multiple actions", async () => {
    const actions = [
      { label: "Action 1", onClick: jest.fn() },
      { label: "Action 2", onClick: jest.fn() },
      { label: "Action 3", onClick: jest.fn() },
    ];

    renderAction(actions);

    for (const action of actions) {
      await userEvent.click(screen.getByText(action.label));
      expect(action.onClick).toHaveBeenCalledTimes(1);
    }
  });

  it("keeps the Combobox open when keepOpenOnClick is true", async () => {
    renderAction([{ label: "Action", onClick, keepOpenOnClick: true }]);

    await userEvent.click(screen.getByText("Action"));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("closes the Combobox when keepOpenOnClick is false", async () => {
    renderAction([{ label: "Action", onClick, keepOpenOnClick: false }]);

    await userEvent.click(screen.getByText("Action"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("closes the Combobox when keepOpenOnClick is not provided", async () => {
    renderAction([{ label: "Action", onClick }]);

    await userEvent.click(screen.getByText("Action"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  describe("visible prop", () => {
    it("renders the action when visible is not provided", () => {
      renderAction([{ label: "Action", onClick }]);

      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("renders the action when visible is true", () => {
      renderAction([{ label: "Action", onClick, visible: true }]);

      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("does not render the action when visible is false", () => {
      renderAction([{ label: "Action", onClick, visible: false }]);

      expect(screen.queryByText("Action")).not.toBeInTheDocument();
    });

    it("renders the action when visible function shows action for empty searchValue", () => {
      renderAction([
        {
          label: "Action",
          onClick,
          visible: ({ searchValue }: { searchValue: string }) => !searchValue,
        },
      ]);

      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("does not render the action when visible function returns false for empty searchValue", () => {
      renderAction([
        {
          label: "Action",
          onClick,
          visible: ({ searchValue }: { searchValue: string }) =>
            Boolean(searchValue),
        },
      ]);

      expect(screen.queryByText("Action")).not.toBeInTheDocument();
    });
  });
});
