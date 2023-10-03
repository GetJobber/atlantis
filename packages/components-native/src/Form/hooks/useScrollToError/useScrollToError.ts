import { useCallback, useState } from "react";
import { FieldValues, FormState, Path, UseFormSetFocus } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Keyboard,
  MeasureInWindowOnSuccessCallback,
  Platform,
} from "react-native";
import { useIsScreenReaderEnabled } from "../../../hooks";
import { useErrorMessageContext } from "../../../ErrorMessageWrapper";

interface UseScrollToErrorParams<T extends FieldValues> {
  readonly formState: FormState<T>;
  readonly refNode: number | null;
  readonly setFocus: UseFormSetFocus<T>;
  readonly scrollToPosition?: KeyboardAwareScrollView["scrollToPosition"];
}

export function useScrollToError<T extends FieldValues>({
  formState: { errors, isValid, submitCount },
  refNode,
  setFocus,
  scrollToPosition,
}: UseScrollToErrorParams<T>): void {
  const [submitCounter, setSubmitCounter] = useState(submitCount);
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  const manuallyScrollToElement = useManuallyScrollToElement(
    handleScroll,
    refNode,
  );

  // Determine if the form has been submitted by checking if the submit count
  // went up.
  const hasBeenSubmitted = submitCounter < submitCount;
  if (!hasBeenSubmitted) return;
  if (isScreenReaderEnabled) {
    manuallyScrollToElement();
    Keyboard.dismiss();
  } else {
    defaultAutoScroll();
  }

  setSubmitCounter(submitCount);

  function defaultAutoScroll() {
    if (isValid) return;
    try {
      focusInputWithRHF(errors, setFocus);
    } catch {
      manuallyScrollToElement();
    }
  }

  function handleScroll(
    ...[x, y]: Parameters<MeasureInWindowOnSuccessCallback>
  ) {
    /**
     * Disable scroll animation on android when screen reader is active since it
     * can't accessibility-focus on an offscreen component.
     */
    const isAndroidWithScreenReader =
      isScreenReaderEnabled && Platform.OS === "android";
    const shouldAnimateScroll = !isAndroidWithScreenReader;

    scrollToPosition?.(x, y, shouldAnimateScroll);
  }
}

function focusInputWithRHF<T extends FieldValues>(
  errors: FormState<T>["errors"],
  setFocus: UseFormSetFocus<T>,
) {
  const errorMessages = Object.keys(errors);
  setFocus(errorMessages[0] as Path<T>);
}

/**
 * Manually scroll to the element by checking which elements has an error from
 * the Error Message Context
 */
function useManuallyScrollToElement(
  callback: MeasureInWindowOnSuccessCallback,
  refNode: number | null,
) {
  const { elements } = useErrorMessageContext();

  return useCallback(() => {
    const elementWithError = Object.keys(elements).find(
      el => elements[el].hasErrorMessage,
    );

    if (elementWithError) {
      const element = elements[elementWithError];
      refNode && element.measure(refNode, callback, handleError);
      element.accessibilityFocus();
    }
  }, [callback, elements, refNode]);
}

function handleError() {
  return Error("Couldn't scroll to error");
}
