import React from "react";
import { render } from "@testing-library/react-native";
import { ActivityIndicator } from "./index";
import { tokens } from "../utils/design";

const testId = "ActivityIndicator";
describe("ActivityIndicator", () => {
  it("renders with the default color when no props are provided", () => {
    const { getByTestId } = render(<ActivityIndicator />);
    expect(getByTestId(testId).props.color).toBe(tokens["color-greyBlue"]);
  });

  it("renders with a custom color", () => {
    const color = "red";
    const { getByTestId } = render(<ActivityIndicator color={color} />);
    expect(getByTestId(testId).props.color).toBe(color);
  });

  it("renders with large size", () => {
    const size = "large";
    const color = "red";
    const { getByTestId } = render(
      <ActivityIndicator color={color} size={size} />,
    );
    expect(getByTestId(testId).props.size).toBe(size);
    expect(getByTestId(testId).props.color).toBe(color);
  });
});
