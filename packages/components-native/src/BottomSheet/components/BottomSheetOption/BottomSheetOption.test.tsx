import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BottomSheetOption } from "./BottomSheetOption";

describe("BottomSheetOption component", () => {
  it("renders", () => {
    const mockNavigate = jest.fn();
    const iconName = "camera";
    const optionLabel = "Take photo";

    const { getByTestId, getByText } = render(
      <BottomSheetOption
        onPress={mockNavigate}
        icon={iconName}
        text={optionLabel}
      />,
    );
    expect(getByTestId(iconName)).toBeDefined();
    expect(getByText(optionLabel)).toBeDefined();
  });

  it("responds to presses", () => {
    const mockNavigate = jest.fn();
    const tree = render(
      <BottomSheetOption
        onPress={mockNavigate}
        icon={"camera"}
        text={"Take photo"}
      />,
    );
    fireEvent.press(tree.getByLabelText("Take photo"));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
