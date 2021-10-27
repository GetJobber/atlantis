import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Tab, Tabs } from ".";

afterEach(cleanup);

const handler = jest.fn();
const omelet = (
  <Tabs onChange={handler}>
    <Tab label="Eggs">
      <p>🍳</p>
      <p>Eggs</p>
    </Tab>
    <Tab label="Cheese">
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

  fireEvent.click(getByText("Cheese"));
  expect(handler).toHaveBeenCalledWith(1);
  fireEvent.click(getByText("Eggs"));
  expect(handler).toHaveBeenCalledWith(0);
});
