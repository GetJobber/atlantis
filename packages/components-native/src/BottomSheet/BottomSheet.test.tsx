import React, { createRef } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { AccessibilityInfo, View } from "react-native";
import { Host, Portal } from "react-native-portalize";
import { BottomSheet } from ".";
import type { BottomSheetRef } from "./BottomSheet";
import { waitForUntestableRender } from "../utils/test/wait";
import { Text } from "../Text";

jest.unmock("../hooks/useIsScreenReaderEnabled");

const ref = createRef<BottomSheetRef>();
const mockOnClose = jest.fn();
const mockOnOpen = jest.fn();

function setup({
  heading,
  showCancel,
  loading,
}: {
  heading?: string;
  showCancel?: boolean;
  loading?: boolean;
}) {
  return render(
    <Host>
      <Portal>
        <BottomSheet
          ref={ref}
          heading={heading}
          showCancel={showCancel}
          loading={loading}
          onClose={mockOnClose}
          onOpen={mockOnOpen}
        >
          <View>
            <Text>BottomSheet</Text>
          </View>
        </BottomSheet>
      </Portal>
    </Host>,
  );
}

it("renders a BottomSheet", async () => {
  const { findByText } = setup({});

  await waitForUntestableRender(
    "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
  );

  await act(async () => {
    ref.current?.open();
  });

  expect(await findByText("BottomSheet")).toBeDefined();
});

it("renders a BottomSheet with a header", async () => {
  const header = "Hello this is header";
  const { findByText } = setup({ heading: header });

  await waitForUntestableRender(
    "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
  );

  await act(async () => {
    ref.current?.open();
  });

  expect(await findByText(header)).toBeDefined();
});

it("BottomSheet can be closed with the cancel action", async () => {
  const { findByLabelText, queryByText } = setup({ showCancel: true });

  await act(async () => {
    ref.current?.open();
  });

  fireEvent.press(await findByLabelText("Cancel"));

  await waitFor(() => {
    expect(queryByText("BottomSheet")).toBeNull();
  });
});

describe("when loading is provided and true", () => {
  it("hides the cancel action", async () => {
    const { queryByText } = setup({ showCancel: true, loading: true });

    await waitForUntestableRender(
      "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
    );

    await act(async () => {
      ref.current?.open();
    });

    expect(queryByText("Cancel")).toBeNull();
  });
});

it("calls onClose when BottomSheet is closed", async () => {
  setup({});

  await act(async () => {
    ref.current?.open();
    ref.current?.close();
  });

  await waitFor(() => {
    expect(mockOnClose).toHaveBeenCalled();
  });
});

it("calls onOpen when BottomSheet is opened", async () => {
  setup({});

  await act(async () => {
    ref.current?.open();
  });

  await waitFor(() => {
    expect(mockOnOpen).toHaveBeenCalled();
  });
});

describe("when there is a screen reader enabled", () => {
  it("should always show the cancel action", async () => {
    jest
      .spyOn(AccessibilityInfo, "isScreenReaderEnabled")
      .mockImplementation(() => Promise.resolve(true));

    const { findByLabelText, queryByText } = setup({});

    await waitForUntestableRender(
      "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
    );

    await act(async () => {
      ref.current?.open();
    });

    fireEvent.press(await findByLabelText("Cancel"));

    await waitFor(() => {
      expect(queryByText("BottomSheet")).toBeNull();
    });
  });
});
