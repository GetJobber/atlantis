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

describe("UNSAFE_ props", () => {
  describe("UNSAFE_className", () => {
    it("applies to clickable card container", () => {
      const clickHandler = jest.fn();
      const { getByTestId } = render(
        <CardClickable
          className="base-class"
          onClick={clickHandler}
          UNSAFE_className="custom-clickable-class"
        >
          <p>Clickable content</p>
        </CardClickable>,
      );

      const clickableElement = getByTestId("clickable-card");
      expect(clickableElement).toHaveClass("base-class");
      expect(clickableElement).toHaveClass("custom-clickable-class");
    });
  });

  describe("UNSAFE_style", () => {
    it("applies to clickable card container", () => {
      const clickHandler = jest.fn();
      const { getByTestId } = render(
        <CardClickable
          className="base-class"
          onClick={clickHandler}
          UNSAFE_style={{
            backgroundColor: "var(--color-green)",
            border: "2px solid red",
          }}
        >
          <p>Clickable content</p>
        </CardClickable>,
      );

      const clickableElement = getByTestId("clickable-card");
      expect(clickableElement).toHaveStyle({
        backgroundColor: "var(--color-green)",
        border: "2px solid red",
      });
    });
  });
});
