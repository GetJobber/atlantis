import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Link } from "./Link";

describe("Link", () => {
  const textLink = "getjobber.com";
  const mockPress = jest.fn();

  it("should call the onPress callback", () => {
    const { getAllByText } = render(
      <Link onPress={mockPress}>{textLink}</Link>,
    );

    fireEvent.press(getAllByText("getjobber.com")[0]);
    expect(mockPress).toHaveBeenCalled();
  });

  it("should call the longPress callback", () => {
    const mockLongPress = jest.fn();
    const { getAllByText } = render(
      <Link onPress={mockPress} onLongPress={mockLongPress}>
        {textLink}
      </Link>,
    );

    fireEvent(getAllByText(textLink)[0], "onLongPress");

    expect(mockLongPress).toHaveBeenCalled();
  });
});
