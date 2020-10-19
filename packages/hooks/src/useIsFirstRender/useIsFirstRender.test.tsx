import React, { useState } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { useIsFirstRender } from ".";

afterEach(cleanup);

it("should return true on the first render", () => {
  const { getByText } = render(<MockComponet />);
  expect(getByText("first render true")).toBeInstanceOf(HTMLDivElement);
});

it("should return false on all other renders", () => {
  const { getByText } = render(<MockComponet />);
  fireEvent.click(getByText("plus"));
  expect(getByText("clicks: 1")).toBeInstanceOf(HTMLDivElement);
  expect(getByText("first render false")).toBeInstanceOf(HTMLDivElement);
});

function MockComponet() {
  const [count, setCount] = useState(0);
  const isFirstRender = useIsFirstRender();
  return (
    <div>
      <div>clicks: {count}</div>
      <div>first render {isFirstRender ? "true" : "false"}</div>
      <button onClick={() => setCount(count + 1)}>plus</button>
    </div>
  );
}
