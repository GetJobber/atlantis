import React, { forwardRef, useCallback } from "react";
import type { FocusEvent } from "react-native";
import { TextInput, findNodeHandle } from "react-native";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import type {
  InputTextProps,
  InputTextRef,
} from "../../../InputText/InputText";
import { InputText } from "../../../InputText/InputText";

/**
 * BottomSheetInputText is a wrapper around InputText that provides
 * bottom sheet keyboard handling. It implements the handleOnFocus and
 * handleOnBlur logic from BottomSheetTextInput to ensure proper keyboard
 * positioning within bottom sheets.
 */
export const BottomSheetInputText = forwardRef<InputTextRef, InputTextProps>(
  function BottomSheetInputText(props, ref) {
    const { onFocus, onBlur } = props;
    const { animatedKeyboardState, textInputNodesRef } =
      useBottomSheetInternal();

    const handleOnFocus = useCallback(
      (event?: FocusEvent) => {
        animatedKeyboardState.set(state => ({
          ...state,
          target: event?.nativeEvent.target,
        }));

        onFocus?.(event);
      },
      [animatedKeyboardState, onFocus],
    );

    const handleOnBlur = useCallback(
      (event?: FocusEvent) => {
        const keyboardState = animatedKeyboardState.get();
        const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
        const currentFocusedInput =
          currentlyFocusedInput !== null
            ? findNodeHandle(
                // @ts-expect-error - TextInput.State.currentlyFocusedInput() returns NativeMethods
                // which is not directly assignable to findNodeHandle's expected type,
                // but it works at runtime. This is a known type limitation in React Native.
                currentlyFocusedInput,
              )
            : null;

        /**
         * we need to make sure that we only remove the target
         * if the target belong to the current component and
         * if the currently focused input is not in the targets set.
         */
        const shouldRemoveCurrentTarget =
          keyboardState.target === event?.nativeEvent.target;
        const shouldIgnoreBlurEvent =
          currentFocusedInput &&
          textInputNodesRef.current.has(currentFocusedInput);

        if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
          animatedKeyboardState.set(state => ({
            ...state,
            target: undefined,
          }));
        }

        onBlur?.(event);
      },
      [animatedKeyboardState, textInputNodesRef, onBlur],
    );

    return (
      <InputText
        {...props}
        ref={ref}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );
  },
);
