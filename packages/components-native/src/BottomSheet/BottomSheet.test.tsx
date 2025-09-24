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

it.skip("renders a BottomSheet", async () => {
  const { getByText } = setup({});

  await waitForUntestableRender(
    "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
  );

  act(() => {
    ref.current?.open();
  });

  expect(getByText("BottomSheet")).toBeDefined();
});

it.skip("renders a BottomSheet with a header", async () => {
  const header = "Hello this is header";
  const { getByText } = setup({ heading: header });

  await waitForUntestableRender(
    "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
  );

  act(() => {
    ref.current?.open();
  });

  expect(getByText(header)).toBeDefined();
});

it.skip("BottomSheet can be closed with the cancel action", async () => {
  const { getByText, queryByText } = setup({ showCancel: true });

  act(() => {
    ref.current?.open();
  });

  fireEvent.press(getByText("Cancel"));

  await waitFor(() => {
    expect(queryByText("BottomSheet")).toBeNull();
  });
});

describe.skip("when loading is provided and true", () => {
  it("hides the cancel action", async () => {
    const { queryByText } = setup({ showCancel: true, loading: true });

    await waitForUntestableRender(
      "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
    );

    act(() => {
      ref.current?.open();
    });

    expect(queryByText("Cancel")).toBeNull();
  });
});

it.skip("calls onClose when BottomSheet is closed", async () => {
  setup({});

  act(() => {
    ref.current?.open();
    ref.current?.close();
  });

  await waitFor(() => {
    expect(mockOnClose).toHaveBeenCalled();
  });
});

it.skip("calls onOpen when BottomSheet is opened", async () => {
  setup({});

  act(() => {
    ref.current?.open();
  });

  await waitFor(() => {
    expect(mockOnOpen).toHaveBeenCalled();
  });
});

describe.skip("when there is a screen reader enabled", () => {
  it("should always show the cancel action", async () => {
    jest
      .spyOn(AccessibilityInfo, "isScreenReaderEnabled")
      .mockImplementation(() => Promise.resolve(true));

    const { getByText, queryByText } = setup({});

    await waitForUntestableRender(
      "Wait for AccessibilityInfo.isScreenReaderEnabled to resolve",
    );

    act(() => {
      ref.current?.open();
    });

    fireEvent.press(getByText("Cancel"));

    await waitFor(() => {
      expect(queryByText("BottomSheet")).toBeNull();
    });
  });
});
