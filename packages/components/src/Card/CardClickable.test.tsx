import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { CardClickable } from "./CardClickable";

test("it should trigger the click event after enter press", () => {
  const clickHandler = jest.fn();

  const { getByTestId } = render(
    <CardClickable className="boink" onClick={clickHandler}>
      <p>Press enter</p>
    </CardClickable>,
  );

  fireEvent.keyUp(getByTestId("clickable-card"), { key: "Enter" });
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

test("it should trigger the click event after spacebar press", () => {
  const clickHandler = jest.fn();

  const { getByTestId } = render(
    <CardClickable className="boink" onClick={clickHandler}>
      <p>Press spacebar</p>
    </CardClickable>,
  );

  fireEvent.keyUp(getByTestId("clickable-card"), { key: " " });
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
