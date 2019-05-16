import React from "react";
import renderer from "react-test-renderer";
import { DescriptionList } from ".";

it("renders an object as a list of key value pairs", () => {
  const tree = renderer
    .create(
      <DescriptionList
        data={[["Issued", "2018-12-08"], ["Due", "2019-01-06"]]}
      />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <dl>
      <div
        className="termGroup"
      >
        <dd>
          Issued
        </dd>
        <dt>
          2018-12-08
        </dt>
      </div>
      <div
        className="termGroup"
      >
        <dd>
          Due
        </dd>
        <dt>
          2019-01-06
        </dt>
      </div>
    </dl>
  `);
});
