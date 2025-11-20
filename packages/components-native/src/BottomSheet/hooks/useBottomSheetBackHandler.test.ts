import { createRef } from "react";
import type { RefObject } from "react";
import { act, renderHook } from "@testing-library/react-native";
import { BackHandler } from "react-native";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useBottomSheetBackHandler } from "./useBottomSheetBackHandler";

describe("useBottomSheetBackHandler", () => {
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
    const bottomSheetRef = createRef<BottomSheet | null>();
    const { result } = renderHook(() =>
      useBottomSheetBackHandler(bottomSheetRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "hardwareBackPress",
      expect.any(Function),
    );
  });

  it("should call close() when back button is pressed", async () => {
    const mockClose = jest.fn();
    const bottomSheetRef = {
      current: {
        close: mockClose,
      } as unknown as BottomSheet,
    } as RefObject<BottomSheet | null>;

    const { result } = renderHook(() =>
      useBottomSheetBackHandler(bottomSheetRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    const registeredCallback = mockAddEventListener.mock.calls[0][1];
    const returnValue = registeredCallback();

    expect(mockClose).toHaveBeenCalled();
    expect(returnValue).toBe(true);
  });

  it("should remove listener when sheet is dismissed", async () => {
    const bottomSheetRef = createRef<BottomSheet | null>();
    const { result } = renderHook(() =>
      useBottomSheetBackHandler(bottomSheetRef),
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
    const bottomSheetRef = createRef<BottomSheet | null>();
    const { result } = renderHook(() =>
      useBottomSheetBackHandler(bottomSheetRef),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(-1);
    });

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });
});
