import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Content } from ".";

afterEach(cleanup);

it("renders a Content", () => {
  const { container } = render(<Content>Wazaaaaa</Content>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="padded base"
      >
        Wazaaaaa
      </div>
    </div>
  `);
});

it("renders a Content with a large spacing", () => {
  const { container } = render(<Content spacing="large">Space me up!</Content>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="padded large"
      >
        Space me up!
      </div>
    </div>
  `);
});

it("renders a Content with a small spacing", () => {
  const { container } = render(
    <Content spacing="small">Space me down!</Content>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="padded small"
      >
        Space me down!
      </div>
    </div>
  `);
});

it("renders with a semantic tag when a valid type is set", () => {
  const { container } = render(<Content type="section">A section!</Content>);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <section
        class="padded base"
      >
        A section!
      </section>
    </div>
    `);
});
