import { createRef } from "react";
import type React from "react";
import { act, renderHook } from "@testing-library/react-native";
import { BackHandler } from "react-native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useBottomSheetModalBackHandler } from "./useBottomSheetModalBackHandler";

describe("useBottomSheetModalBackHandler", () => {
  let mockRemove: jest.Mock;
  let mockAddEventListener: jest.SpyInstance;

  beforeEach(() => {
    mockRemove = jest.fn();
    mockAddEventListener = jest.spyOn(BackHandler, "addEventListener");
    mockAddEventListener.mockReturnValue({ remove: mockRemove });
  });

  afterEach(() => {
    mockAddEventListener.mockRestore();
  });

  it("should register BackHandler listener when sheet becomes visible", async () => {
    const bottomSheetModalRef = createRef<BottomSheetModal | null>();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(bottomSheetModalRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "hardwareBackPress",
      expect.any(Function),
    );
  });

  it("should call dismiss() when back button is pressed", async () => {
    const mockDismiss = jest.fn();
    const bottomSheetModalRef = {
      current: {
        dismiss: mockDismiss,
      } as unknown as BottomSheetModal,
    } as React.RefObject<BottomSheetModal | null>;

    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(bottomSheetModalRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    const registeredCallback = mockAddEventListener.mock.calls[0][1];
    const returnValue = registeredCallback();

    expect(mockDismiss).toHaveBeenCalled();
    expect(returnValue).toBe(true);
  });

  it("should remove listener when sheet is dismissed", async () => {
    const bottomSheetModalRef = createRef<BottomSheetModal | null>();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(bottomSheetModalRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    await act(async () => {
      result.current.handleSheetPositionChange(-1);
    });

    expect(mockRemove).toHaveBeenCalled();
  });

  it("should not register listener when index is negative", async () => {
    const bottomSheetModalRef = createRef<BottomSheetModal | null>();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(bottomSheetModalRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(-1);
    });

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });
});
