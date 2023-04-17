import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useOnKeyDown } from "./index.js";

test("fires the method when the key is pressed", () => {
  const keypressCallback = jest.fn();
  const { container } = render(<TestComponent callback={keypressCallback} />);

  expect(keypressCallback).toHaveBeenCalledTimes(0);

  fireEvent(
    container,
    new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: false,
    }),
  );

  expect(keypressCallback).toHaveBeenCalledTimes(1);
});

interface TestComponentProps {
  callback(): void;
}

function TestComponent({ callback }: TestComponentProps) {
  useOnKeyDown(callback, "Enter");

  return <>Look at me!</>;
}
