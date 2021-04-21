import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
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

it("should call the handler when toggling the Disclosure component", async () => {
  const toggleHandler = jest.fn();
  const { queryByText } = render(
    <Disclosure onRequestToggle={toggleHandler} {...sampleProps}>
      <span>Cotton candy tootsie roll lemon drops tiramisu cake tart.</span>
    </Disclosure>,
  );

  const summaryElement = queryByText(sampleProps.title);
  fireEvent.click(summaryElement);

  await waitFor(() => {
    expect(toggleHandler).toHaveBeenNthCalledWith(1, true);
  });
});
