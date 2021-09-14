import React from "react";
import { render } from "@testing-library/react";
import { Spinner } from ".";

it("renders the spinner", () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});

it("renders the spinner with content", () => {
  const { container, getByRole } = render(<Spinner>Content</Spinner>);
  expect(container).toMatchSnapshot();
  expect(getByRole("alert")).toBeInTheDocument();
});

it("doesnt render the spinner when not loading", () => {
  const { container, queryByRole } = render(
    <Spinner loading={false}>Content</Spinner>,
  );
  expect(container).toMatchSnapshot();
  expect(queryByRole("alert")).not.toBeInTheDocument();
});

it("renders the small spinner", () => {
  const { container } = render(<Spinner size="small" />);
  expect(container).toMatchSnapshot();
});

it("renders the inline spinner", () => {
  const { container } = render(<Spinner inline={true} />);
  expect(container).toMatchSnapshot();
});

it("renders a small inline spinner", () => {
  const { container } = render(<Spinner inline={true} size="small" />);
  expect(container).toMatchSnapshot();
});
