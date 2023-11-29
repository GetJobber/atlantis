import React from "react";
import { render } from "@testing-library/react";
import { Disclosure } from ".";

it("renders a Disclosure", () => {
  const { container } = render(
    <Disclosure title="Example Disclosure Title">
      <p>Wafer topping soufflé bear claw cake chocolate toffee.</p>
    </Disclosure>,
  );
  expect(container).toMatchSnapshot();
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
