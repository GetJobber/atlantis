import { render } from "@testing-library/react";
import React from "react";
import { Spinner } from ".";

it.skip("renders the spinner", () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});

it.skip("renders the small spinner", () => {
  const { container } = render(<Spinner size="small" />);
  expect(container).toMatchSnapshot();
});

it.skip("renders the inline spinner", () => {
  const { container } = render(<Spinner inline={true} />);
  expect(container).toMatchSnapshot();
});

it.skip("renders a small inline spinner", () => {
  const { container } = render(<Spinner inline={true} size="small" />);
  expect(container).toMatchSnapshot();
});
