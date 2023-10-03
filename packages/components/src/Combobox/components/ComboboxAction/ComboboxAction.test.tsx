import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ComboboxAction } from "./ComboboxAction";

const onClick = jest.fn();

describe("ComboboxAction", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <ComboboxAction label="Label" onClick={onClick} />,
    );

    expect(getByText("Label")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const { getByText } = render(
      <ComboboxAction onClick={onClick} label="Add a teammate" />,
    );

    fireEvent.click(getByText("Add a teammate"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can exist in a group of multiple actions", () => {
    const actions = [
      { label: "Action 1", onClick: jest.fn() },
      { label: "Action 2", onClick: jest.fn() },
      { label: "Action 3", onClick: jest.fn() },
    ];

    const { getByText } = render(
      <div>
        {actions.map((action, index) => (
          <ComboboxAction
            key={index}
            onClick={action.onClick}
            label={action.label}
          />
        ))}
      </div>,
    );

    actions.forEach(action => {
      expect(getByText(action.label)).toBeInTheDocument();
    });

    actions.forEach(action => {
      getByText(action.label).click();
      expect(action.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
