import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { FormMessage } from ".";

describe("FormMessage", () => {
  it("should render null when there are no message to show", () => {
    const view = render(<FormMessage />);
    expect(view.toJSON()).toMatchInlineSnapshot(`null`);
  });

  it("should show the message", () => {
    const { getByText } = render(<FormMessage />);

    const description = "🔥";
    FormMessage.show({ description });
    expect(getByText(description)).toBeDefined();
  });

  it("should close the message", () => {
    const { getByText, queryByText } = render(<FormMessage />);

    const description = "🌚";
    FormMessage.show({ description });
    expect(getByText(description)).toBeDefined();

    FormMessage.close();
    expect(queryByText(description)).toBeNull();
  });

  describe("Opening another message through a message", () => {
    const firstMessage = "I am the first message";
    const secondMessage = "Second message here";

    const showMessage = () =>
      FormMessage.show({
        description: firstMessage,
        primaryAction: {
          label: "Click me",
          onPress: () => FormMessage.show({ description: secondMessage }),
        },
      });

    it("should show the most recent message", () => {
      const { getByText, queryByText, getByLabelText } = render(
        <FormMessage />,
      );

      showMessage();

      expect(getByText(firstMessage)).toBeDefined();
      expect(queryByText(secondMessage)).toBeNull();

      fireEvent.press(getByLabelText("Click me"));

      expect(getByText(secondMessage)).toBeDefined();
      expect(queryByText(firstMessage)).toBeNull();
    });

    it("should close the most recent message", () => {
      const { getByText, queryByText, getByLabelText } = render(
        <FormMessage />,
      );

      showMessage();
      fireEvent.press(getByLabelText("Click me"));
      FormMessage.close();

      expect(getByText(firstMessage)).toBeDefined();
      expect(queryByText(secondMessage)).toBeNull();
    });
  });
});
