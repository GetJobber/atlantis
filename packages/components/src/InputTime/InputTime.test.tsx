import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputTime } from ".";

describe("InputTime", () => {
  it("renders an initial time when given 'defaultValue'", () => {
    render(<InputTime defaultValue={new CivilTime(11, 23)} />);
    expect(screen.getByDisplayValue("11:23")).toBeInTheDocument();
  });

  it("renders correctly in a readonly state", () => {
    render(<InputTime defaultValue={new CivilTime(10, 25)} readonly={true} />);
    expect(screen.getByDisplayValue("10:25")).toHaveAttribute("readonly");
  });

  it("should set the value when given 'value'", () => {
    render(<InputTime value={new CivilTime(12, 30)} />);
    expect(screen.getByDisplayValue("12:30")).toBeInTheDocument();
  });

  it("should call the onChange function when the component is modified", () => {
    const newValue = "05:32";
    // The event value get converted to a CivilTime inside the component.
    const newCivilTime = new CivilTime(5, 32);

    const changeHandler = jest.fn();

    render(<InputTime value={new CivilTime(2, 35)} onChange={changeHandler} />);

    fireEvent.change(screen.getByDisplayValue("02:35"), {
      target: { value: newValue },
    });

    expect(changeHandler).toHaveBeenCalledWith(newCivilTime);
  });
});
