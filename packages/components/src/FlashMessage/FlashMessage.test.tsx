import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { FlashMessage } from ".";

afterEach(cleanup);

it("renders a FlashMessage", () => {
  const tree = renderer
    .create(<FlashMessage type="base">A message</FlashMessage>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
