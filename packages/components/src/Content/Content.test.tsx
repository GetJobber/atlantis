import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Content } from ".";

afterEach(cleanup);

it("renders a Content", () => {
  const tree = renderer.create(<Content>Wazaaaaa</Content>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="padded base"
        >
          Wazaaaaa
        </div>
    `);
});

it("renders a Content with a large spacing", () => {
  const tree = renderer
    .create(<Content spacing="large">Space me up!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="padded large"
        >
          Space me up!
        </div>
    `);
});

it("renders a Content with a small spacing", () => {
  const tree = renderer
    .create(<Content spacing="small">Space me down!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="padded small"
        >
          Space me down!
        </div>
    `);
});
