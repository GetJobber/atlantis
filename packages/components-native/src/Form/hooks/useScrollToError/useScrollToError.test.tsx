import { renderHook } from "@testing-library/react-hooks";
import { useScrollToError } from "./useScrollToError";

const mockFormState = {
  isDirty: true,
  dirtyFields: {},
  isSubmitted: false,
  isSubmitSuccessful: false,
  submitCount: 0,
  touchedFields: {},
  isSubmitting: false,
  isValidating: false,
  isValid: true,
  errors: {},
};

const mockScreenReaderEnabled = jest.fn().mockReturnValue(false);
jest.mock("../../../hooks/useIsScreenReaderEnabled", () => ({
  useIsScreenReaderEnabled: () => mockScreenReaderEnabled(),
}));

jest.mock("../../../ErrorMessageWrapper", () => ({
  useErrorMessageContext: () => ({
    elements: {
      el: {
        measure: jest.fn((_, callback) => callback()),
        hasErrorMessage: true,
      },
    },
    register: jest.fn(),
    unregister: jest.fn(),
  }),
}));

const handleScrollToPosition = jest.fn();
const handleSetFocus = jest.fn();

const initialProps = {
  formState: mockFormState,
  refNode: 1,
  scrollToPosition: handleScrollToPosition,
  setFocus: handleSetFocus,
};

afterEach(() => {
  handleScrollToPosition.mockClear();
  handleSetFocus.mockClear();
});

describe("useScrollToError", () => {
  it("should do nothing if everything is valid", () => {
    renderHook(useScrollToError, { initialProps });

    expect(handleSetFocus).not.toHaveBeenCalled();
    expect(handleScrollToPosition).not.toHaveBeenCalled();
  });

  it("should focus with RHF if it can", () => {
    const { rerender } = renderHook(useScrollToError, { initialProps });
    rerender({
      ...initialProps,
      formState: { ...mockFormState, isValid: false, submitCount: 1 },
    });

    expect(handleSetFocus).toHaveBeenCalled();
    expect(handleScrollToPosition).not.toHaveBeenCalled();
  });

  it("should manually scroll", () => {
    // @ts-expect-error - making this fail when it gets called since you can't
    // call undefined as a function. This mimic's RHF not being able to focus on
    // non-input fields
    const failedSetFocus = jest.fn(() => failingFn());
    const manualScrollProps = { ...initialProps, setFocus: failedSetFocus };

    const { rerender } = renderHook(useScrollToError, {
      initialProps: manualScrollProps,
    });
    rerender({
      ...manualScrollProps,
      formState: { ...mockFormState, isValid: false, submitCount: 1 },
    });

    expect(failedSetFocus).toHaveBeenCalled();
    expect(failedSetFocus).toThrow();
    expect(handleScrollToPosition).toHaveBeenCalled();
  });

  describe("With screen readers", () => {
    it("should not fire the setFocus", () => {
      mockScreenReaderEnabled.mockReturnValue(true);

      const { rerender } = renderHook(useScrollToError, { initialProps });
      rerender({
        ...initialProps,
        formState: { ...mockFormState, isValid: false, submitCount: 1 },
      });

      expect(handleSetFocus).not.toHaveBeenCalled();
      expect(handleScrollToPosition).toHaveBeenCalled();
    });
  });
});
