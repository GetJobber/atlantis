import React from "react";
import { cleanup, render } from "@testing-library/react";
import { ChipGroup } from ".";

afterEach(cleanup);

it("renders an empty Chip Group", () => {
  const { container } = render(<ChipGroup chips={[]} />);
  expect(container).toMatchSnapshot();
});
