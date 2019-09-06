import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Content } from ".";

afterEach(cleanup);

it("renders a Content", () => {
  const tree = renderer.create(<Content>Wazaaaaa</Content>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="base base"
    >
      Wazaaaaa
    </div>
  `);
});

it("renders a Content with a large spacing", () => {
  const tree = renderer
    .create(<Content padding="large">Space me up!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <div
              className="base large"
            >
              Space me up!
            </div>
      `);
});

it("renders a Content with a small spacing", () => {
  const tree = renderer
    .create(<Content padding="small">Space me down!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <div
              className="base small"
            >
              Space me down!
            </div>
      `);
});

it("renders a Content with a large padding", () => {
  const tree = renderer
    .create(<Content padding="large">Pad me up!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <div
              className="base large"
            >
              Pad me up!
            </div>
      `);
});

it("renders a Content with a small padding", () => {
  const tree = renderer
    .create(<Content padding="small">Pad me down!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <div
              className="base small"
            >
              Pad me down!
            </div>
      `);
});

it("renders a Content with no padding", () => {
  const tree = renderer
    .create(<Content padding="none">Pad me none!</Content>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <div
              className="base none"
            >
              Pad me none!
            </div>
      `);
});
