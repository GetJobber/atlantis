import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Banner } from ".";

afterEach(cleanup);

it("renders a success banner", () => {
  const tree = renderer
    .create(<Banner type="success">Success</Banner>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("adds an error class to error banners", () => {
  const { getByRole } = render(<Banner type="error">Fail</Banner>);
  expect(getByRole("alert").classList).toContain("error");
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
  expect(queryByLabelText("Close this notification")).toBeNull();
});

it("renders with close button", () => {
  const { queryByLabelText } = render(
    <Banner type="warning" dismissible={true}>
      Foo
    </Banner>,
  );
  expect(queryByLabelText("Close this notification")).toBeTruthy();
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <Banner type="success" onDismiss={changeHandler}>
      Close me
    </Banner>,
  );

  fireEvent.click(getByLabelText("Close this notification"));
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

it("wraps its children in text if the children are a simple string", () => {
  render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      Bruce
    </Banner>,
  );
  expect(screen.getByText("Bruce")).toBeInstanceOf(HTMLParagraphElement);
});

it("does not wrap the its children in text if the children are not a simple string", () => {
  render(
    <Banner
      type="notice"
      primaryAction={{
        label: "smash me",
      }}
    >
      <h3>Bruce</h3>
    </Banner>,
  );
  const bruceHeading = screen.getByText("Bruce");
  expect(bruceHeading).toBeInstanceOf(HTMLHeadingElement);
  expect(bruceHeading.parentElement).toBeInstanceOf(HTMLDivElement);
});

it("it should call the onClick when primaryAction is present", () => {
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

it("adds a role of status by default", () => {
  const { getByRole } = render(<Banner type="notice">Bruce</Banner>);
  expect(getByRole("status")).toBeInstanceOf(HTMLDivElement);
});

it("adds a role of error for error banners", () => {
  const { getByRole } = render(<Banner type="error">Bruce</Banner>);
  expect(getByRole("alert")).toBeInstanceOf(HTMLDivElement);
});
