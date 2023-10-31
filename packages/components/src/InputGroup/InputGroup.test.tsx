import React from "react";
import { render } from "@testing-library/react";
import { InputGroup } from ".";

it("renders a vertical InputGroup", () => {
  const { container } = render(
    <InputGroup>
      <div>Test content</div>
    </InputGroup>,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="inputGroup vertical"
      >
        <div>
          Test content
        </div>
      </div>
    </div>
  `);
});

it("renders a horizontal InputGroup", () => {
  const { container } = render(
    <InputGroup flowDirection="horizontal">
      <div>Test content</div>
    </InputGroup>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="inputGroup horizontal"
      >
        <div>
          Test content
        </div>
      </div>
    </div>
  `);
});

it("renders a valid nested InputGroup", () => {
  const { container } = render(
    <InputGroup>
      <InputGroup flowDirection="horizontal">
        <div>Test content</div>
      </InputGroup>
    </InputGroup>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="inputGroup vertical"
      >
        <div
          class="inputGroup horizontal"
        >
          <div>
            Test content
          </div>
        </div>
      </div>
    </div>
  `);
});

it("renders a null fragment for an invalidly nested InputGroup", () => {
  const { container } = render(
    <InputGroup flowDirection="horizontal">
      <InputGroup>
        <div>Test content</div>
      </InputGroup>
    </InputGroup>,
  );

  expect(container).toMatchInlineSnapshot(`<div />`);
});
