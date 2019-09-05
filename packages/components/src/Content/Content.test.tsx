import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Content } from ".";

afterEach(cleanup);

it("renders a Content", () => {
  const tree = renderer.create(<Content>Wazaaaaa</Content>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="base"
    >
      Wazaaaaa
    </div>
  `);
});
