import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { CardClickable } from "../CardClickable";

describe("when focused", () => {
  it("should trigger the click event only after enter press", () => {
    const clickHandler = jest.fn();

    const { getByTestId } = render(
      <CardClickable className="boink" onClick={clickHandler}>
        <p>Press enter</p>
      </CardClickable>,
    );

    getByTestId("clickable-card").focus();
    fireEvent.keyUp(getByTestId("clickable-card"), { key: "Tab" });
    expect(clickHandler).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(getByTestId("clickable-card"), { key: "Enter" });
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it("should trigger the click event only after spacebar press", () => {
    const clickHandler = jest.fn();

    const { getByTestId } = render(
      <CardClickable className="boink" onClick={clickHandler}>
        <p>Press spacebar</p>
      </CardClickable>,
    );

    getByTestId("clickable-card").focus();
    fireEvent.keyUp(getByTestId("clickable-card"), { key: "Shift" });
    expect(clickHandler).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(getByTestId("clickable-card"), { key: " " });
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

describe("when not focused", () => {
  it("should not trigger the click event on enter press", () => {
    const clickHandler = jest.fn();

    const { getByTestId } = render(
      <CardClickable className="boink" onClick={clickHandler}>
        <p>Press enter</p>
      </CardClickable>,
    );

    getByTestId("clickable-card").blur();
    fireEvent.keyUp(getByTestId("clickable-card"), { key: "Enter" });
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });

  it("should not trigger the click event on spacebar tap", () => {
    const clickHandler = jest.fn();

    const { getByTestId } = render(
      <CardClickable className="boink" onClick={clickHandler}>
        <p>Press spacebar</p>
      </CardClickable>,
    );

    getByTestId("clickable-card").blur();
    fireEvent.keyUp(getByTestId("clickable-card"), { key: " " });
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });
});
