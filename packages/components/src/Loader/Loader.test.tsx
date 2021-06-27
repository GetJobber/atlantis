import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Loader } from ".";

afterEach(cleanup);

it("renders a Loader", () => {
  const tree = renderer
    .create(
      <Loader loading determinate={false}>
        Loading
      </Loader>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
