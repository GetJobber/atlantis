import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Chip } from ".";

afterEach(cleanup);

it("renders a Chip", () => {
  render(<Chip label="thang" />);
});
