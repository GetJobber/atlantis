import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";
import { Toast, showToast } from ".";
import { Button } from "../Button";
import { MockSafeAreaProvider } from "../utils/test";

interface ToastSetupProps {
  bottomOffset?: number;
  message?: string;
}

async function expectToastWithMessage(message: string): Promise<void> {
  expect(await screen.findByText(message)).toBeDefined();

  await waitFor(() => {
    // We also need to assert the accessibility info because otherwise
    // the test will 'overflow' and cause other tests to fail.
    expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
      message,
    );

    jest.mocked(AccessibilityInfo.announceForAccessibility).mockClear();
  });
}

function setup({ bottomOffset, message = "Notify message" }: ToastSetupProps) {
  return render(
    <MockSafeAreaProvider>
      <Button
        label="Press me"
        accessibilityLabel="Button label"
        onPress={() => showToast({ message, bottomTabsVisible: false })}
      />
      <Toast bottomOffset={bottomOffset} />
    </MockSafeAreaProvider>,
  );
}

describe("Toast", () => {
  it("shows the toast on trigger", async () => {
    const { getByLabelText } = setup({ bottomOffset: 20 });

    const toastTriggerButton = getByLabelText("Button label");
    fireEvent.press(toastTriggerButton);

    await expectToastWithMessage("Notify message");
  });

  describe("When the message length exceed the defined maximum", () => {
    const over60CharactersMsg =
      "really really really really really really really really really really really really really really really really really really really long message";

    it("should log a warning that the message length is too long", async () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      const { getByLabelText } = setup({ message: over60CharactersMsg });

      const toastTriggerButton = getByLabelText("Button label");
      fireEvent.press(toastTriggerButton);

      await expectToastWithMessage(over60CharactersMsg);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Jobber Design Warning: Message length limit exceeded, your current length is 145, the maximum allowed is 60. please talk with your designer",
      );
      consoleSpy.mockRestore();
    });
  });
});
