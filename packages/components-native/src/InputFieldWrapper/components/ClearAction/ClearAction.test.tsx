import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ClearAction } from "./ClearAction";

it("should call the handler", () => {
  const pressHandler = jest.fn();
  const { getByLabelText } = render(<ClearAction onPress={pressHandler} />);

  fireEvent.press(getByLabelText("Clear input"));
  expect(pressHandler).toHaveBeenCalled();
});
