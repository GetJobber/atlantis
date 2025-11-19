import { act, renderHook } from "@testing-library/react-native";
import { BackHandler } from "react-native";
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
    const onCloseController = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(onCloseController),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "hardwareBackPress",
      expect.any(Function),
    );
  });

  it("should call onCloseController when back button is pressed", async () => {
    const onCloseController = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(onCloseController),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(0);
    });

    const registeredCallback = mockAddEventListener.mock.calls[0][1];
    const returnValue = registeredCallback();

    expect(onCloseController).toHaveBeenCalled();
    expect(returnValue).toBe(true);
  });

  it("should remove listener when sheet is dismissed", async () => {
    const onCloseController = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(onCloseController),
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
    const onCloseController = jest.fn();
    const { result } = renderHook(() =>
      useBottomSheetModalBackHandler(onCloseController),
    );

    await act(async () => {
      result.current.handleSheetPositionChange(-1);
    });

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });
});
