import type { Ref, SyntheticEvent } from "react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  FocusEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
} from "react-native";
import { Platform, TextInput, findNodeHandle } from "react-native";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import type { RegisterOptions } from "react-hook-form";
import type { IconNames } from "@jobber/design";
import identity from "lodash/identity";
import type { Clearable } from "@jobber/hooks";
import { useShowClear } from "@jobber/hooks";
import { useStyles } from "./InputText.style";
import { useInputAccessoriesContext } from "./context";
import { useFormController } from "../hooks";
import type {
  InputFieldStyleOverride,
  InputFieldWrapperProps,
} from "../InputFieldWrapper/InputFieldWrapper";
import { InputFieldWrapper } from "../InputFieldWrapper";
import { useCommonInputStyles } from "../InputFieldWrapper/CommonInputStyles.style";

export interface InputTextProps
  extends Pick<
    InputFieldWrapperProps,
    "toolbar" | "toolbarVisibility" | "loading" | "loadingType"
  > {
  /**
   * Highlights the field red and shows message below (if string) to indicate an error
   */
  readonly invalid?: boolean | string;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * Makes the input read-only
   */
  readonly readonly?: boolean;

  /**
   * Name of the input.
   */
  readonly name?: string;

  /**
   * Hint text that goes above the value once the field is filled out
   */
  readonly placeholder?: string;

  /**
   * Text that helps the user understand the input
   */
  readonly assistiveText?: string;

  /**
   * Controls the visibility of the mini label that appears inside the input
   * when a value is entered. By default, the placeholder text moves up to
   * become a mini label. Set to false to disable this behavior.
   *
   * @default true
   */
  readonly showMiniLabel?: boolean;

  /**
   * Determines what keyboard is shown
   */
  readonly keyboard?:
    | "default"
    | "numeric"
    | "phone-pad"
    | "email-address"
    | "numbers-and-punctuation"
    | "decimal-pad";

  /**
   * Set the component to a given value
   */
  readonly value?: string;

  /**
   * Default value for when component is uncontrolled
   */
  readonly defaultValue?: string;

  /**
   * Automatically focus the input after it is rendered
   */
  readonly autoFocus?: boolean;

  /**
   * Shows an error message below the field and highlight the field red when value is invalid
   */
  readonly validations?: RegisterOptions;

  /**
   * Simplified callback that only provides the new value
   * @param newValue
   */
  readonly onChangeText?: (newValue: string) => void;

  /**
   * Callback that is called when the text input's submit button is pressed
   * @param event
   */
  readonly onSubmitEditing?: (event?: SyntheticEvent) => void;

  /**
   * Callback that is called when the text input is focused
   * @param event
   */
  readonly onFocus?: (event?: FocusEvent) => void;

  /**
   * Callback that is called when the text input is blurred
   */
  readonly onBlur?: (event?: FocusEvent) => void;

  /**
   * VoiceOver will read this string when a user selects the associated element
   */
  readonly accessibilityLabel?: string;

  /**
   * An accessibility hint helps users understand what will happen when they perform an action on the
   * accessibility element when that result is not clear from the accessibility label
   */
  readonly accessibilityHint?: string;

  /**
   * Turn off autocorrect
   */
  readonly autoCorrect?: boolean;

  /**
   * Determines where to autocapitalize
   */
  readonly autoCapitalize?: "characters" | "words" | "sentences" | "none";

  /**
   * Determines which content to suggest on auto complete, e.g.`username`.
   * Default is `off` which disables auto complete
   *
   * *Android Only*
   *
   */
  readonly autoComplete?: TextInputProps["autoComplete"];

  /**
   * Determines which content to suggest on auto complete, e.g.`username`.
   * Default is `none` which disables auto complete
   *
   * *iOS Only*
   */
  readonly textContentType?: TextInputProps["textContentType"];

  /**
   * Determines if inputText will span multiple lines.
   * Default is `false`
   *
   * https://reactnative.dev/docs/textinput#multiline
   */
  readonly multiline?: TextInputProps["multiline"];

  /**
   * Symbol to display before the text input
   */
  readonly prefix?: {
    icon?: IconNames;
    label?: string;
  };

  /**
   * Symbol to display after the text input
   */
  readonly suffix?: {
    icon?: IconNames;
    label?: string;
    onPress?: () => void;
  };

  /**
   * transform object is used to transform the internal TextInput value
   * It's useful for components like InputNumber where we want to transform
   * the internal value to a number.
   * "input" is a function that transform the value to the string format that should be shown to the user
   * "output" is a function that transform the string representation of the value to the value that is sent to onChange and the form
   */
  readonly transform?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input?: (v: any) => string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    output?: (v: string | undefined) => any;
  };

  /**
   * Add a clear action on the input that clears the value.
   *
   * You should always use `while-editing` if you want the input to be
   * clearable. if the input value isn't editable (i.e. `InputDateTime`) you can
   * set it to `always`.
   */
  readonly clearable?: Clearable;

  /**
   * Used to locate this view in end-to-end tests
   */
  readonly testID?: string;

  /**
   * Use secure text entry
   */
  readonly secureTextEntry?: boolean;

  /**
   * Determines whether spell check is used. Turn it off to hide empty autoCorrect
   * suggestions when autoCorrect is off.
   *
   * *iOS Only*
   */
  readonly spellCheck?: boolean;

  /**
   * Custom styling to override default style of the input text
   */
  readonly styleOverride?: InputTextStyleOverride;
}

interface InputTextStyleOverride extends InputFieldStyleOverride {
  inputText?: StyleProp<TextStyle>;
}

export type InputTextRef = Pick<TextInput, "clear" | "focus" | "blur">;
export const InputText = forwardRef(InputTextInternal);

// eslint-disable-next-line max-statements
function InputTextInternal(
  {
    invalid,
    disabled,
    readonly = false,
    name,
    placeholder,
    assistiveText,
    showMiniLabel = true,
    keyboard,
    value: controlledValue,
    defaultValue,
    autoFocus,
    autoComplete = "off",
    spellCheck,
    textContentType = "none",
    validations,
    onChangeText,
    onSubmitEditing,
    onFocus,
    accessibilityLabel,
    accessibilityHint,
    autoCorrect,
    autoCapitalize,
    onBlur,
    multiline = false,
    prefix,
    suffix,
    transform = {},
    clearable = multiline ? "never" : "while-editing",
    testID,
    secureTextEntry,
    styleOverride,
    toolbar,
    toolbarVisibility,
    loading,
    loadingType,
  }: InputTextProps,
  ref: Ref<InputTextRef>,
) {
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";

  const {
    input: inputTransform = identity,
    output: outputTransform = identity,
  } = transform;
  const { error, field } = useFormController({
    name,
    value: controlledValue ?? defaultValue,
    validations,
  });
  const internalValue = controlledValue ?? field.value?.toString();

  const hasValue = internalValue !== "" && internalValue !== undefined;
  const [focused, setFocused] = useState(false);
  const placeholderMode = getPlaceholderMode(showMiniLabel, internalValue);
  const miniLabelActive = placeholderMode === "mini";

  const textInputRef = useTextInputRef({ ref, onClear: handleClear });

  const showClear = useShowClear({
    clearable,
    multiline,
    focused,
    hasValue,
    disabled,
  });

  // Bottom sheet keyboard handling - detect if we're inside a ContentOverlay
  const bottomSheetContext = useBottomSheetInternal(true);
  const animatedKeyboardState = bottomSheetContext?.animatedKeyboardState;
  const textInputNodesRef = bottomSheetContext?.textInputNodesRef;

  // Android doesn't have an accessibility label like iOS does. By adding
  // it as a placeholder it readds it like a label. However we don't want to
  // add a placeholder on iOS.
  const androidA11yProps = {
    ...(isAndroid && {
      placeholder: accessibilityLabel || placeholder,
      placeholderTextColor: "transparent",
    }),
  };

  const _name = name ?? field.name;
  const {
    inputAccessoryID,
    register,
    unregister,
    setFocusedInput,
    canFocusNext,
    onFocusNext,
  } = useInputAccessoriesContext();
  useEffect(() => {
    _name &&
      register(_name, () => {
        textInputRef.current?.focus();
      });

    return () => {
      _name && unregister(_name);
    };
  }, [_name, register, textInputRef, unregister]);

  // Bottom sheet keyboard handling - register/cleanup TextInput node
  useEffect(() => {
    if (!textInputNodesRef || !animatedKeyboardState) {
      return;
    }

    const nodeHandle = findNodeHandle(textInputRef.current);

    if (!nodeHandle) {
      return;
    }

    if (!textInputNodesRef.current.has(nodeHandle)) {
      textInputNodesRef.current.add(nodeHandle);
    }

    return () => {
      const cleanupNodeHandle = findNodeHandle(textInputRef.current);

      if (!cleanupNodeHandle) {
        return;
      }

      const keyboardState = animatedKeyboardState.get();

      // Remove the keyboard state target if it belongs to the current component
      if (keyboardState.target === cleanupNodeHandle) {
        animatedKeyboardState.set(state => ({
          ...state,
          target: undefined,
        }));
      }

      if (textInputNodesRef.current.has(cleanupNodeHandle)) {
        textInputNodesRef.current.delete(cleanupNodeHandle);
      }
    };
  }, [textInputNodesRef, animatedKeyboardState, textInputRef]);

  const returnKeyType: ReturnKeyTypeOptions | undefined = useMemo(() => {
    if (!multiline) {
      if (inputAccessoryID && isAndroid) {
        return "next";
      } else {
        return "done";
      }
    } else {
      return undefined;
    }
  }, [multiline, inputAccessoryID, isAndroid]);

  // If it's not inside an inputAcessoriesContext or cannot focus next,
  // then hide the keyboard when the return key is pressed.
  const shouldBlurOnSubmit =
    !multiline && (!inputAccessoryID || !canFocusNext || !isAndroid);

  function handleOnFocusNext(): void {
    if (multiline) {
      return;
    }

    onFocusNext();
  }

  const styles = useStyles();
  const commonInputStyles = useCommonInputStyles();

  return (
    <InputFieldWrapper
      prefix={prefix}
      suffix={suffix}
      hasValue={hasValue}
      placeholderMode={placeholderMode}
      assistiveText={assistiveText}
      focused={focused}
      error={error}
      invalid={invalid}
      placeholder={placeholder}
      disabled={disabled}
      onClear={handleClear}
      showClearAction={showClear}
      styleOverride={styleOverride}
      toolbar={toolbar}
      toolbarVisibility={toolbarVisibility}
      loading={loading}
      loadingType={loadingType}
    >
      <TextInput
        inputAccessoryViewID={inputAccessoryID || undefined}
        testID={testID}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        style={[
          commonInputStyles.input,
          styles.inputPaddingTop,
          !miniLabelActive && commonInputStyles.inputEmpty,
          disabled && commonInputStyles.inputDisabled,
          multiline && styles.multiLineInput,
          multiline && Platform.OS === "ios" && styles.multilineInputiOS,
          multiline && miniLabelActive && styles.multiLineInputWithMini,
          multiline &&
            placeholderMode === "hidden" &&
            styles.multilineWithoutMiniLabel,
          styleOverride?.inputText,
          loading && loadingType === "glimmer" && { color: "transparent" },
        ]}
        readOnly={readonly}
        editable={!disabled}
        keyboardType={keyboard}
        value={inputTransform(internalValue)}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        multiline={multiline}
        scrollEnabled={false}
        textContentType={textContentType}
        onChangeText={handleChangeText}
        onSubmitEditing={handleOnSubmitEditing}
        returnKeyType={returnKeyType}
        blurOnSubmit={shouldBlurOnSubmit}
        accessibilityLabel={accessibilityLabel || placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ busy: loading }}
        secureTextEntry={secureTextEntry}
        {...androidA11yProps}
        onFocus={event => {
          handleBottomSheetFocus(event);
          _name && setFocusedInput(_name);
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          handleBottomSheetBlur(event);
          _name && setFocusedInput("");
          setFocused(false);
          onBlur?.(event);
          field.onBlur();
          trimWhitespace(inputTransform(field.value), updateFormAndState);
        }}
        ref={(instance: TextInput) => {
          // RHF wants us to do it this way
          // https://react-hook-form.com/faqs#Howtosharerefusage
          textInputRef.current = instance;
          field.ref(instance);
        }}
      />
    </InputFieldWrapper>
  );

  function handleChangeText(value: string) {
    /**
     * Replacing the U+FFFC character because it's duplicating text
     * when dictating on iOS 16.
     * https://github.com/facebook/react-native/issues/36521#issuecomment-1555421134
     */
    const removedIOSCharValue = isIOS ? value.replace(/\uFFFC/g, "") : value;
    updateFormAndState(removedIOSCharValue);
  }

  function handleBottomSheetFocus(event?: FocusEvent) {
    if (!animatedKeyboardState || !textInputNodesRef || !event?.nativeEvent) {
      return;
    }

    animatedKeyboardState.set(state => ({
      ...state,
      target: event.nativeEvent.target,
    }));
  }

  function handleBottomSheetBlur(event?: FocusEvent) {
    if (!animatedKeyboardState || !textInputNodesRef || !event?.nativeEvent) {
      return;
    }

    const keyboardState = animatedKeyboardState.get();
    const RNTextInput = require("react-native").TextInput;
    const currentFocusedInput = findNodeHandle(
      RNTextInput.State.currentlyFocusedInput(),
    );

    // Only remove the target if it belongs to the current component
    // and if the currently focused input is not in the targets set
    const shouldRemoveCurrentTarget =
      keyboardState.target === event.nativeEvent.target;
    const shouldIgnoreBlurEvent =
      currentFocusedInput && textInputNodesRef.current.has(currentFocusedInput);

    if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
      animatedKeyboardState.set(state => ({
        ...state,
        target: undefined,
      }));
    }
  }

  function handleClear() {
    handleChangeText("");
  }

  function handleOnSubmitEditing() {
    onSubmitEditing?.();

    if (isAndroid) {
      handleOnFocusNext();
    }
  }

  /**
   * Updates both the form value and the onChangeText callback
   * Ensuring that the tranform output function is called
   * @param rawValue value to be sent to form state and onChangeText callback
   */
  function updateFormAndState(rawValue: string) {
    const newValue = outputTransform(rawValue);
    onChangeText?.(newValue);
    field.onChange(newValue);
  }
}

function trimWhitespace(
  inputValue: string | undefined,
  onChangeText: (newValue: string) => void,
) {
  if (!inputValue || !inputValue.trim) {
    return;
  }
  const trimmedInput = inputValue.trim();

  if (trimmedInput === inputValue) {
    return; // no changes, avoid re-renders
  }

  onChangeText(trimmedInput);
}

interface UseTextInputRefProps {
  readonly ref: Ref<InputTextRef>;
  readonly onClear: () => void;
}

function useTextInputRef({ ref, onClear }: UseTextInputRefProps) {
  const textInputRef = useRef<TextInput | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => textInputRef.current?.focus(),
      blur: () => textInputRef.current?.blur(),
      clear: onClear,
    }),
    [onClear],
  );

  return textInputRef;
}

function getPlaceholderMode(
  isMiniLabelAllowed: boolean,
  internalValue: string,
): InputFieldWrapperProps["placeholderMode"] {
  const hasValue = Boolean(internalValue);

  if (hasValue) {
    if (isMiniLabelAllowed) {
      return "mini";
    } else {
      return "hidden";
    }
  } else {
    return "normal";
  }
}
