import React from "react";
import renderer from "react-test-renderer";
import { cleanup, render } from "@testing-library/react";
import { Disclosure } from ".";

afterEach(cleanup);

it("renders a Disclosure", () => {
  const tree = renderer
    .create(
      <Disclosure title="Example Disclosure Title">
        <p>Wafer topping soufflé bear claw cake chocolate toffee.</p>
      </Disclosure>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Disclosure which should be closed by default", () => {
  const { queryByRole } = render(
    <Disclosure title="I am Disclosure">
      <span>Bacon ipsum dolor amet leberkas picanha landjaeger ham.</span>
    </Disclosure>,
  );

  const detailsElement = queryByRole("group");
  expect(detailsElement.getAttribute("open")).toBeNull();
});

it("renders a Disclosure that is opened if `defaultOpen` is set", () => {
  const { queryByRole } = render(
    <Disclosure defaultOpen title="I am Disclosure">
      <span>Cotton candy tootsie roll lemon drops tiramisu cake tart.</span>
    </Disclosure>,
  );

  const detailsElement = queryByRole("group");
  expect(detailsElement.getAttribute("open")).not.toBeNull();
});
