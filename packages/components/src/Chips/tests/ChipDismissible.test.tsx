import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChipDismissible } from "..";

afterEach(cleanup);

it("should have a remove action", () => {
  render(<ChipDismissible onRequestRemove={jest.fn()} label="This thing!" />);
  expect(screen.getByTestId("remove-chip-button")).toBeInTheDocument();
});

describe("on remove click", () => {
  it("should not fire the onclick prop", async () => {
    const handleRemove = jest.fn();
    const handleClick = jest.fn();
    render(
      <ChipDismissible
        onClick={handleClick}
        onRequestRemove={handleRemove}
        label="This thing!"
      />,
    );

    await userEvent.click(screen.getByTestId("remove-chip-button"));
    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
