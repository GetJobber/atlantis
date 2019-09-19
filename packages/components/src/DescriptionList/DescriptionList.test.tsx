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
    <dl
      className="descriptionList"
    >
      <div
        className="termGroup"
      >
        <dd
          className="base regular base blue"
        >
          Issued
        </dd>
        <dt
          className="base regular base greyBlue"
        >
          2018-12-08
        </dt>
      </div>
      <div
        className="termGroup"
      >
        <dd
          className="base regular base blue"
        >
          Due
        </dd>
        <dt
          className="base regular base greyBlue"
        >
          2019-01-06
        </dt>
      </div>
    </dl>
  `);
});
