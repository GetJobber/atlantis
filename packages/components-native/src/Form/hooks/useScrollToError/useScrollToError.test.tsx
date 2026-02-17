import { renderHook } from "@testing-library/react-native";
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
        accessibilityFocus: jest.fn(),
      },
    },
    register: jest.fn(),
    unregister: jest.fn(),
  }),
}));

const handleScrollTo = jest.fn();
const handleSetFocus = jest.fn();

const initialProps = {
  formState: mockFormState,
  refNode: 1,
  scrollTo: handleScrollTo,
  setFocus: handleSetFocus,
};

afterEach(() => {
  handleScrollTo.mockClear();
  handleSetFocus.mockClear();
});

describe("useScrollToError", () => {
  it("should do nothing if everything is valid", () => {
    renderHook(useScrollToError, { initialProps });

    expect(handleSetFocus).not.toHaveBeenCalled();
    expect(handleScrollTo).not.toHaveBeenCalled();
  });

  it("should focus with RHF if it can", () => {
    const { rerender } = renderHook(useScrollToError, { initialProps });
    rerender({
      ...initialProps,
      formState: { ...mockFormState, isValid: false, submitCount: 1 },
    });

    expect(handleSetFocus).toHaveBeenCalled();
    expect(handleScrollTo).not.toHaveBeenCalled();
  });

  it("should manually scroll", () => {
    const failingFn = () => {
      throw new Error("setFocus failed");
    };
    // Mimics RHF not being able to focus on non-input fields
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
    expect(() => failedSetFocus()).toThrow("setFocus failed");
    expect(handleScrollTo).toHaveBeenCalled();
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
      expect(handleScrollTo).toHaveBeenCalled();
    });
  });
});
