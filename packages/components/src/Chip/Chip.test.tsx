import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Chip } from ".";

afterEach(cleanup);

describe("chip without avatar", () => {
  it("renders", () => {
    const { container } = render(
      <Chip
        label="Look Mom!"
        dismissAction={{ ariaLabel: "Remove", onDismiss: jest.fn() }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
