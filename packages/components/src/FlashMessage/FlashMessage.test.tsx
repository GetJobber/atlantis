import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { FlashMessage } from ".";

afterEach(cleanup);

it("renders a FlashMessage", () => {
  const tree = renderer
    .create(<FlashMessage type="base">A message</FlashMessage>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flash base"
    >
      <p
        className="base base greyBlueDark"
      >
        A message
      </p>
      <button
        aria-label="Close"
        className="closeButton"
        onClick={[Function]}
      >
        <div
          className="icon cross base"
        />
      </button>
    </div>
  `);
});
