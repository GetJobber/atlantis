import React from "react";
import renderer from "react-test-renderer";
import { IconName } from "../../Icon";
import { DecoratedIcon } from "./DecoratedIcon";

it("renders correctly", () => {
  const tree = renderer
    .create(<DecoratedIcon iconName={IconName.invoice} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <span
      className="iconDecorator"
    >
      <div
        className="invoice icon"
      />
    </span>
  `);
});
