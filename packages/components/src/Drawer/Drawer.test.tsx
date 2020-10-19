import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Drawer } from ".";

afterEach(cleanup);

it("renders a Drawer", () => {
  const tree = renderer
    .create(<Drawer title="Drawer">Drawer content</Drawer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
