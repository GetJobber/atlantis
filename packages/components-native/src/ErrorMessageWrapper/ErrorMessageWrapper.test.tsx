import React from "react";
import { render } from "@testing-library/react-native";
import { ErrorMessageWrapper } from "./ErrorMessageWrapper";
import { Text } from "../Text";

describe("ErrorMessageWrapper", () => {
  it("should show the child, an error message, and an icon", () => {
    const errorMessage = "This is an error message";
    const childText = "Howdy";
    const screen = render(
      <ErrorMessageWrapper message={errorMessage}>
        <Text>{childText}</Text>
      </ErrorMessageWrapper>,
    );

    expect(screen.getByText(childText)).toBeDefined();
    expect(
      screen.getByText(errorMessage, { includeHiddenElements: true }),
    ).toBeDefined();
    expect(screen.getByTestId("alert")).toBeDefined();
  });

  it("should show the child, but not an error message and an icon", () => {
    const errorMessage = "This is an error message part 2";
    const childText = "I'm still here";

    const screen = render(
      <ErrorMessageWrapper message={errorMessage}>
        <Text>{childText}</Text>
      </ErrorMessageWrapper>,
    );

    expect(screen.getByText(childText)).toBeDefined();
    expect(
      screen.getByText(errorMessage, { includeHiddenElements: true }),
    ).toBeDefined();
    expect(screen.getByTestId("alert")).toBeDefined();

    screen.rerender(
      <ErrorMessageWrapper>
        <Text>{childText}</Text>
      </ErrorMessageWrapper>,
    );
    expect(screen.getByText(childText)).toBeDefined();
    expect(screen.queryByText(errorMessage)).toBeNull();
    expect(screen.queryByTestId("alert")).toBeNull();
  });
});
