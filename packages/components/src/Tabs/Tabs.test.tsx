import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Tab, Tabs } from ".";

afterEach(cleanup);

let count = 0;
const omelet = (
  <Tabs>
    <Tab label="Eggs">
      <p>🍳</p>
      <p>Eggs</p>
    </Tab>
    <Tab label="Cheese" onClick={() => count++}>
      <p>🧀</p>
    </Tab>
  </Tabs>
);

it("renders Tabs", () => {
  const { container } = render(omelet);
  expect(container).toMatchSnapshot();
});

test("it should switch tabs", () => {
  const { getByText, queryByText } = render(omelet);

  expect(queryByText("🍳")).toBeTruthy();
  expect(queryByText("🧀")).toBeFalsy();

  fireEvent.click(getByText("Cheese"));
  expect(queryByText("🍳")).toBeFalsy();
  expect(queryByText("🧀")).toBeTruthy();

  fireEvent.click(getByText("Eggs"));
  expect(queryByText("🍳")).toBeTruthy();
  expect(queryByText("🧀")).toBeFalsy();
});

test("it should handle tab onClick", () => {
  const { getByText } = render(omelet);
  count = 0;

  fireEvent.click(getByText("Cheese"));
  expect(count).toBe(1);
  fireEvent.click(getByText("Cheese"));
  expect(count).toBe(2);
});
