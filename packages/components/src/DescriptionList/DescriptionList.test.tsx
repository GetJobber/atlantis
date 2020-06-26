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
  expect(tree).toMatchSnapshot();
});

it("renders an object as a list of key value pairs with an element", () => {
  const tree = renderer
    .create(<DescriptionList data={[["Foo", <>Foo</>], ["Bar", <>Bar</>]]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
