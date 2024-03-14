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

it("allows duplicate terms", () => {
  const { getAllByText } = render(
    <DescriptionList
      data={[
        ["Issued", "2018-12-08"],
        ["Issued", "2019-01-06"],
      ]}
    />,
  );
  expect(getAllByText("Issued")).toHaveLength(2);
});

it("does not throw a key error when duplicate terms are used", () => {
  const logSpy = jest.spyOn(global.console, "error");

  render(
    <DescriptionList
      data={[
        ["Issued", "2018-12-08"],
        ["Issued", "2019-01-06"],
      ]}
    />,
  );
  expect(logSpy).not.toHaveBeenCalledWith(
    expect.stringContaining(
      "Warning: Encountered two children with the same key",
    ),
    expect.anything(),
    expect.anything(),
  );
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
