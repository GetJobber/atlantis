import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { InputGroup } from ".";

afterEach(cleanup);

it("renders a vertical InputGroup", () => {
  const tree = renderer
    .create(
      <InputGroup>
        <div>Test content</div>
      </InputGroup>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
        <div
          className="inputGroup vertical"
        >
          <div>
            Test content
          </div>
        </div>
    `);
});

it("renders a horizontal InputGroup", () => {
  const tree = renderer
    .create(
      <InputGroup flowDirection="horizontal">
        <div>Test content</div>
      </InputGroup>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="inputGroup horizontal"
        >
          <div>
            Test content
          </div>
        </div>
    `);
});

it("renders a valid nested InputGroup", () => {
  const tree = renderer
    .create(
      <InputGroup>
        <InputGroup flowDirection="horizontal">
          <div>Test content</div>
        </InputGroup>
      </InputGroup>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="inputGroup vertical"
        >
          <div
            className="inputGroup horizontal"
          >
            <div>
              Test content
            </div>
          </div>
        </div>
    `);
});

it("renders a null fragment for an invalidly nested InputGroup", () => {
  const tree = renderer
    .create(
      <InputGroup flowDirection="horizontal">
        <InputGroup>
          <div>Test content</div>
        </InputGroup>
      </InputGroup>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`null`);
});
