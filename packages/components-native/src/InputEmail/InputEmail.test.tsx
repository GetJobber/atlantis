import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { InputEmail } from ".";

it("renders an InputEmail", () => {
  const value = "test@test.com";
  const { getByDisplayValue } = render(<InputEmail value={value} />);
  expect(getByDisplayValue(value)).toBeTruthy();
});

it("displays the validtion message when an invalid email is entered", async () => {
  const a11yLabel = "InputEmailTest";
  const { getByText, getByLabelText } = render(
    <InputEmail value={"notanemail"} accessibilityLabel={a11yLabel} />,
  );

  await waitFor(() => {
    fireEvent(getByLabelText(a11yLabel), "blur");
  });
  expect(
    getByText("Enter a valid email address (email@example.com)", {
      includeHiddenElements: true,
    }),
  ).toBeDefined();
});
