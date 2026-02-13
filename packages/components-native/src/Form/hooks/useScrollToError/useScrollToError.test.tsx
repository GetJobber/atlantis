import { renderHook } from "@testing-library/react-native";
import type { FieldValues, FormState } from "react-hook-form";
import { useScrollToError } from "./useScrollToError";
import type { UseScrollToErrorParams } from "./useScrollToError";

const mockFormState: FormState<FieldValues> = {
  isDirty: true,
  isLoading: false,
  isReady: true,
  disabled: false,
  validatingFields: {},
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

type UseScrollToErrorProps = UseScrollToErrorParams<FieldValues>;

const initialProps: UseScrollToErrorProps = {
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
    renderHook((props: UseScrollToErrorProps) => useScrollToError(props), {
      initialProps,
    });

    expect(handleSetFocus).not.toHaveBeenCalled();
    expect(handleScrollTo).not.toHaveBeenCalled();
  });

  it("should focus with RHF if it can", () => {
    const { rerender } = renderHook(
      (props: UseScrollToErrorProps) => useScrollToError(props),
      {
        initialProps,
      },
    );
    rerender({
      ...initialProps,
      formState: { ...mockFormState, isValid: false, submitCount: 1 },
    });

    expect(handleSetFocus).toHaveBeenCalled();
    expect(handleScrollTo).not.toHaveBeenCalled();
  });

  it("should manually scroll", () => {
    // @ts-expect-error - making this fail when it gets called since you can't
    // call undefined as a function. This mimic's RHF not being able to focus on
    // non-input fields
    const failedSetFocus = jest.fn(() => failingFn());
    const manualScrollProps = { ...initialProps, setFocus: failedSetFocus };

    const { rerender } = renderHook(
      (props: UseScrollToErrorProps) => useScrollToError(props),
      {
        initialProps: manualScrollProps,
      },
    );
    rerender({
      ...manualScrollProps,
      formState: { ...mockFormState, isValid: false, submitCount: 1 },
    });

    expect(failedSetFocus).toHaveBeenCalled();
    expect(failedSetFocus).toThrow();
    expect(handleScrollTo).toHaveBeenCalled();
  });

  describe("With screen readers", () => {
    it("should not fire the setFocus", () => {
      mockScreenReaderEnabled.mockReturnValue(true);

      const { rerender } = renderHook(
        (props: UseScrollToErrorProps) => useScrollToError(props),
        {
          initialProps,
        },
      );
      rerender({
        ...initialProps,
        formState: { ...mockFormState, isValid: false, submitCount: 1 },
      });

      expect(handleSetFocus).not.toHaveBeenCalled();
      expect(handleScrollTo).toHaveBeenCalled();
    });
  });
});
