import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Banner } from ".";

afterEach(cleanup);

it("renders a success banner", () => {
  const tree = renderer
    .create(<Banner type="success">Success</Banner>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an error banner", () => {
  const tree = renderer.create(<Banner type="error">Fail</Banner>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a notice banner", () => {
  const tree = renderer
    .create(<Banner type="notice">Notice me</Banner>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a warning banner", () => {
  const tree = renderer.create(<Banner type="warning">Warn</Banner>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={false}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Close")).toBeNull();
});

it("renders with close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={true}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Close")).toBeTruthy();
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <Banner type="success" onDismiss={changeHandler}>
      Close me
    </Banner>,
  );

  fireEvent.click(getByLabelText("Close"));
  expect(changeHandler).toHaveBeenCalledTimes(1);
});

it("renders a banner with a primary action", () => {
  const tree = renderer
    .create(
      <Banner
        type="success"
        primaryAction={{
          label: "smash me",
        }}
      >
        Bruce
      </Banner>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a banner with a primary 'learning' action when the type is 'notice'", () => {
  const tree = renderer
    .create(
      <Banner
        type="notice"
        primaryAction={{
          label: "smash me",
        }}
      >
        Bruce
      </Banner>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the onClick when primaryAction is present", () => {
  const onClick = jest.fn();

  const { getByText } = render(
    <Banner
      type="success"
      primaryAction={{
        label: "Hello World",
        onClick: () => onClick(),
      }}
    >
      Bruce
    </Banner>,
  );

  fireEvent.click(getByText("Hello World"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
