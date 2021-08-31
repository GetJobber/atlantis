import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Chip } from ".";

afterEach(cleanup);

describe("chip without avatar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Chip
        label="jobber!"
        dismissAction={{ ariaLabel: "Remove", onDismiss: jest.fn() }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("can trigger dismiss action", () => {
    const onDismissFn = jest.fn();
    const { getByLabelText } = render(
      <Chip
        label="jobber!"
        dismissAction={{ ariaLabel: "Remove", onDismiss: onDismissFn }}
      />,
    );
    fireEvent.click(getByLabelText("Remove"));
    expect(onDismissFn).toHaveBeenCalledTimes(1);
  });
});

describe("chip with an avatar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Chip
        avatar={{ name: "Joobler", initials: "JBL" }}
        label="jobber!"
        dismissAction={{ ariaLabel: "Remove", onDismiss: jest.fn() }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("can trigger dismiss action", () => {
    const onDismissFn = jest.fn();
    const { getByLabelText } = render(
      <Chip
        avatar={{ name: "Joobler", initials: "JBL" }}
        label="jobber!"
        dismissAction={{ ariaLabel: "Remove", onDismiss: onDismissFn }}
      />,
    );
    fireEvent.click(getByLabelText("Remove"));
    expect(onDismissFn).toHaveBeenCalledTimes(1);
  });
});
