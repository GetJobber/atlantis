import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { useIntl } from "react-intl";
import { ClearAction } from "./ClearAction";
import { messages } from "./messages";

it("should call the handler", () => {
  const pressHandler = jest.fn();
  const { formatMessage } = useIntl();

  const { getByLabelText } = render(<ClearAction onPress={pressHandler} />);

  fireEvent.press(getByLabelText(formatMessage(messages.clearTextLabel)));
  expect(pressHandler).toHaveBeenCalled();
});
