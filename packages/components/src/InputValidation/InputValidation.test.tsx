import React from "react";
import { render } from "@testing-library/react";
import { InputValidation } from ".";

it("renders the input validation messages", async () => {
  const { queryByText } = render(<InputValidation message="I am an error" />);
  expect(queryByText("I am an error")).toBeTruthy();
});
