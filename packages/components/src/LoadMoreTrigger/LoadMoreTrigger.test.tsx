import React from "react";
import { render } from "@testing-library/react";
import { LoadMoreTrigger } from ".";

it("renders a LoadMoreTrigger", () => {
  const { container } = render(<LoadMoreTrigger onLoadMore={jest.fn()} />);
  expect(container).toMatchSnapshot();
});
