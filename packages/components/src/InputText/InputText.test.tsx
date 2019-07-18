import React from "react";
import renderer from "react-test-renderer";
import { InputText } from "./InputText";

it("renders a input with a type of text", () => {
  const tree = renderer.create(<InputText />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
      style={Object {}}
    >
      <input
        className="formField"
        disabled={false}
        onChange={[Function]}
        readOnly={false}
        type="text"
      />
    </div>
  `);
});
