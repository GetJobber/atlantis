import React, {
  Ref,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  Platform,
  ReturnKeyTypeOptions,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from "react-native";
import {
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { IconNames } from "@jobber/design";
import identity from "lodash/identity";
import { styles } from "./InputText.style";
import { useInputAccessoriesContext } from "./context";
import { useFormController } from "../hooks";
import { InputFieldStyleOverride } from "../InputFieldWrapper/InputFieldWrapper";
import {
  Clearable,
  InputFieldWrapper,
  useShowClear,
} from "../InputFieldWrapper";
import { commonInputStyles } from "../InputFieldWrapper/CommonInputStyles.style";

export interface InputTextProps {
  /**
   * Highlights the field red and shows message below (if string) to indicate an error
   */
  readonly invalid?: boolean | string;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

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
   * Determines what keyboard is shown
   */
  keyboard?:
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
  onChangeText?: (newValue: string) => void;

  /**
   * Callback that is called when the text input's submit button is pressed
   * @param event
   */
  onSubmitEditing?: (event?: SyntheticEvent) => void;

  /**
   * Callback that is called when the text input is focused
   * @param event
   */
  onFocus?: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  /**
   * Callback that is called when the text input is blurred
   */
  onBlur?: () => void;

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
   *  Determines where to autocapitalize
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
  transform?: {
    input?: (v: any) => string | undefined;
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
  testID?: string;

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
    name,
    placeholder,
    assistiveText,
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
  const { hasMiniLabel, setHasMiniLabel } = useMiniLabel(internalValue);

  const textInputRef = useTextInputRef({ ref, onClear: handleClear });

  const showClear = useShowClear({
    clearable,
    multiline,
    focused,
    hasValue,
    disabled,
  });

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

  return (
    <InputFieldWrapper
      prefix={prefix}
      suffix={suffix}
      hasValue={hasValue}
      hasMiniLabel={hasMiniLabel}
      assistiveText={assistiveText}
      focused={focused}
      error={error}
      invalid={invalid}
      placeholder={placeholder}
      disabled={disabled}
      onClear={handleClear}
      showClearAction={showClear}
      styleOverride={styleOverride}
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
          !hasMiniLabel && commonInputStyles.inputEmpty,
          disabled && commonInputStyles.inputDisabled,
          multiline && Platform.OS === "ios" && styles.multilineInputiOS,
          multiline && styles.multiLineInput,
          multiline && hasMiniLabel && styles.multiLineInputWithMini,
          styleOverride?.inputText,
        ]}
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
        secureTextEntry={secureTextEntry}
        {...androidA11yProps}
        onFocus={event => {
          _name && setFocusedInput(_name);
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={() => {
          _name && setFocusedInput("");
          setFocused(false);
          onBlur?.();
          field.onBlur();
          trimWhitespace(field, onChangeText);
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
    const newValue = outputTransform(removedIOSCharValue);
    setHasMiniLabel(Boolean(newValue));
    onChangeText?.(newValue);
    field.onChange(newValue);
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
}

function trimWhitespace(
  field: ControllerRenderProps<FieldValues, string>,
  onChangeText?: (newValue: string) => void,
) {
  if (!field.value || !field.value.trim) {
    return;
  }
  const trimmedInput = field.value.trim();
  onChangeText?.(trimmedInput);
  field.onChange(trimmedInput);
}

interface UseTextInputRefProps {
  readonly ref: Ref<InputTextRef>;
  readonly onClear: () => void;
}

function useTextInputRef({ ref, onClear }: UseTextInputRefProps) {
  const textInputRef = useRef<InputTextRef | null>(null);

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

function useMiniLabel(internalValue: string): {
  hasMiniLabel: boolean;
  setHasMiniLabel: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [hasMiniLabel, setHasMiniLabel] = useState(Boolean(internalValue));
  useEffect(() => {
    setHasMiniLabel(Boolean(internalValue));
  }, [internalValue]);
  return { hasMiniLabel, setHasMiniLabel };
}
