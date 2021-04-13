import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Disclosure } from ".";

afterEach(cleanup);

const sampleProps = {
  title: "Example Disclosure Title",
  open: false,
};

it("renders a Disclosure", () => {
  const tree = renderer
    .create(
      <Disclosure {...sampleProps}>
        <p>Wafer topping soufflé bear claw cake chocolate toffee.</p>
      </Disclosure>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Disclosure that is opened by default", () => {
  const newProps = {
    ...sampleProps,
    defaultOpen: true,
  };

  const tree = renderer
    .create(
      <Disclosure {...newProps}>
        <section>Cotton candy brownie pie powder cotton candy soufflé.</section>
      </Disclosure>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should not attempt to call the handler when it is not set", () => {
  const toggleHandler = jest.fn();
  const { getByText } = render(
    <Disclosure {...sampleProps}>
      <span>Donut sesame snaps marzipan halvah icing halvah.</span>
    </Disclosure>,
  );

  expect(() => fireEvent.click(getByText(sampleProps.title))).not.toThrow();
  expect(toggleHandler).not.toHaveBeenCalled();
});

it("should call the handler when toggling the Disclosure component", () => {
  const toggleHandler = jest.fn();
  const { getByText } = render(
    <Disclosure onRequestToggle={toggleHandler} {...sampleProps}>
      <span>Cotton candy tootsie roll lemon drops tiramisu cake tart.</span>
    </Disclosure>,
  );

  fireEvent.click(getByText(sampleProps.title));
  expect(toggleHandler).toHaveBeenNthCalledWith(1, true);
});
