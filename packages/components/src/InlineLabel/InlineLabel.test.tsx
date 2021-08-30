import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InlineLabel } from ".";

afterEach(cleanup);

describe("Basic InlineLabel", () => {
  it("renders correctly", () => {
    const { container } = render(<InlineLabel>My Label</InlineLabel>);
    expect(container).toMatchSnapshot();
  });
});

describe("Dismissable InlineLabel", () => {
  it("renders correctly", () => {
    const { container } = render(
      <InlineLabel
        dismissable
        dismissAriaLabel="Remove Label"
        onDismiss={jest.fn()}
      >
        My Label
      </InlineLabel>,
    );
    expect(container).toMatchSnapshot();
  });

  it("triggers onDismiss", () => {
    const onDismissFn = jest.fn();
    const { getByLabelText } = render(
      <InlineLabel
        dismissable
        dismissAriaLabel="Remove Label"
        onDismiss={onDismissFn}
      >
        My Label
      </InlineLabel>,
    );
    fireEvent.click(getByLabelText("Remove Label"));
    expect(onDismissFn).toHaveBeenCalledTimes(1);
  });
});
