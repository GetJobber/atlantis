import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputTime } from ".";

describe("InputTime", () => {
  it("renders an initial time when given 'defaultValue'", () => {
    const defaultDate = new Date();
    defaultDate.setHours(11, 23, 0, 0);
    render(<InputTime defaultValue={defaultDate} />);
    expect(screen.getByDisplayValue("11:23")).toBeInTheDocument();
  });

  it("renders correctly in a readonly state", () => {
    const defaultDate = new Date();
    defaultDate.setHours(10, 25, 0, 0);

    render(<InputTime defaultValue={defaultDate} readonly={true} />);
    expect(screen.getByDisplayValue("10:25")).toHaveAttribute("readonly");
  });

  it("should set the value when given 'value'", () => {
    const defaultDate = new Date();
    defaultDate.setHours(12, 30, 0, 0);

    render(<InputTime value={defaultDate} />);
    expect(screen.getByDisplayValue("12:30")).toBeInTheDocument();
  });

  it("should call the onChange function when the component is modified", () => {
    const startDate = new Date();
    startDate.setHours(2, 35, 0, 0);

    const newValue = "05:32";
    // The event value get converted to a Date inside the component.
    const newDate = new Date();
    newDate.setHours(5, 32, 0, 0);

    const changeHandler = jest.fn();

    render(<InputTime value={startDate} onChange={changeHandler} />);

    fireEvent.change(screen.getByDisplayValue("02:35"), {
      target: { value: newValue },
    });

    expect(changeHandler).toHaveBeenCalledWith(newDate);
  });
});
