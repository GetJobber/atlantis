import { render } from "@testing-library/react";
import React from "react";
import { DescriptionList } from ".";

it("renders an object as a list of key value pairs", () => {
  const { container } = render(
    <DescriptionList
      data={[
        ["Issued", "2018-12-08"],
        ["Due", "2019-01-06"],
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});

it("renders an object as a list of key value pairs with an element", () => {
  const { container } = render(
    <DescriptionList
      data={[
        ["Foo", <>Foo</>],
        ["Bar", <>Bar</>],
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});
