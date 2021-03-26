import React from "react";
import renderer from "react-test-renderer";
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

const omeletNoCheese = (
  <Tabs>
    <Tab label="Eggs">
      <p>🍳</p>
      <p>Eggs</p>
    </Tab>
    <Tab disabled={true} label="Cheese" onClick={() => count++}>
      <p>🧀</p>
    </Tab>
  </Tabs>
);

it("renders Tabs", () => {
  const tree = renderer.create(omelet).toJSON();
  expect(tree).toMatchSnapshot();
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

test("it should not switch tabs when `disabled` props is set", () => {
  const { getByText, queryByText } = render(omeletNoCheese);

  expect(queryByText("🍳")).toBeTruthy();
  expect(queryByText("🧀")).toBeFalsy();

  fireEvent.click(getByText("Cheese"));
  expect(queryByText("🍳")).toBeTruthy();
  expect(queryByText("🧀")).toBeFalsy();
});

test("it should not handle tab onClick when `disabled` props is set", () => {
  const { getByText } = render(omeletNoCheese);
  count = 0;

  fireEvent.click(getByText("Cheese"));
  expect(count).toBe(0);
  fireEvent.click(getByText("Cheese"));
  expect(count).toBe(0);
});
