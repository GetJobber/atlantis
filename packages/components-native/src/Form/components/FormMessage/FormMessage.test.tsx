import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { FormMessage } from ".";

describe("FormMessage", () => {
  it("should render null when there are no message to show", () => {
    render(<FormMessage />);
    expect(screen.toJSON()).toMatchInlineSnapshot(`null`);
  });

  it("should show the message", async () => {
    render(<FormMessage />);

    const description = "🔥";
    FormMessage.show({ description });
    await waitFor(() => {
      expect(screen.getByText(description)).toBeDefined();
    });
  });

  it("should close the message", async () => {
    render(<FormMessage />);

    const description = "🌚";
    FormMessage.show({ description });
    await waitFor(() => {
      expect(screen.getByText(description)).toBeDefined();
    });

    FormMessage.close();
    await waitFor(() => {
      expect(screen.queryByText(description)).toBeNull();
    });
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

    it("should show the most recent message", async () => {
      render(<FormMessage />);

      showMessage();

      await waitFor(() => {
        expect(screen.getByText(firstMessage)).toBeDefined();
      });
      expect(screen.queryByText(secondMessage)).toBeNull();

      fireEvent.press(screen.getByLabelText("Click me"));

      expect(screen.getByText(secondMessage)).toBeDefined();
      expect(screen.queryByText(firstMessage)).toBeNull();
    });

    it("should close the most recent message", async () => {
      render(<FormMessage />);

      showMessage();
      await waitFor(() => {
        expect(screen.getByText("Click me")).toBeDefined();
      });
      fireEvent.press(screen.getByLabelText("Click me"));
      FormMessage.close();
      await waitFor(() => {
        expect(screen.getByText(firstMessage)).toBeDefined();
      });
      expect(screen.queryByText(secondMessage)).toBeNull();
    });
  });
});
