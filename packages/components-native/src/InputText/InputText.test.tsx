import React from "react";
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { Platform, TextStyle } from "react-native";
import { InputText, InputTextProps } from "./InputText";
import { InputAccessoriesProvider } from "./context";
import {
  Clearable,
  InputFieldWrapperProps,
  commonInputStyles,
} from "../InputFieldWrapper";

const MockInputFieldWrapper = jest.fn();
jest.mock("../InputFieldWrapper", () => ({
  ...jest.requireActual("../InputFieldWrapper"),
  InputFieldWrapper: function Mock(props: InputFieldWrapperProps) {
    MockInputFieldWrapper(props);
    return jest.requireActual("../InputFieldWrapper").InputFieldWrapper(props);
  },
}));

const mockLabel = { label: "$" };

const android = "android";
const ios = "ios";

const platforms: Array<[typeof android | typeof ios, string]> = [
  ["ios", "done"],
  ["android", "next"],
];

function renderInputText(props: InputTextProps): RenderAPI {
  return render(<InputText {...props} />);
}

const clearInput = "Clear input";
// eslint-disable-next-line max-statements
describe("InputText", () => {
  describe("InputFieldWrapper gets the expected props", () => {
    it("renders an invalid InputText", () => {
      const props = { invalid: true };
      renderInputText(props);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders an invalid InputText with non-empty string", () => {
      const props = { invalid: "Always invalid" };
      renderInputText(props);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders a valid InputText with empty string", () => {
      const props = { invalid: "" };
      renderInputText(props);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders a disabled InputText", () => {
      const props = { disabled: true };
      renderInputText(props);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders a InputText with placeholder", () => {
      const props = { placeholder: "Foobar" };
      renderInputText(props);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });
  });

  it("renders a InputText with defaultValue", () => {
    const defaultValue = "Default Foobar";
    const { getByDisplayValue } = renderInputText({
      defaultValue,
    });
    expect(getByDisplayValue(defaultValue)).toBeTruthy();
  });

  it("renders a InputText with autoCompleteType", () => {
    const { getByTestId } = renderInputText({
      testID: "InputText",
      autoComplete: "name",
    });
    expect(getByTestId("InputText").props.autoComplete).toBe("name");
  });

  describe("autoCorrect prop", () => {
    it("defaults the autoCorrect prop to undefined", () => {
      const { getByTestId } = renderInputText({ testID: "Text" });

      expect(getByTestId("Text").props.autoCorrect).toEqual(undefined);
    });

    describe("setting the autoCorrect field", () => {
      it("allows setting the field when a value is passed in", () => {
        const { getByTestId } = renderInputText({
          testID: "Text",
          autoCorrect: true,
        });

        expect(getByTestId("Text").props.autoCorrect).toBe(true);
      });
    });
  });

  describe("Suffix and Prefix", () => {
    it("renders a prefix icon when specified", () => {
      const { getByTestId } = renderInputText({ prefix: { icon: "invoice" } });
      expect(getByTestId("invoice")).toBeDefined();
    });

    it("renders a suffix icon when specified", () => {
      const { getByTestId } = renderInputText({ suffix: { icon: "invoice" } });
      expect(getByTestId("invoice")).toBeDefined();
    });
  });

  describe("when given a value", () => {
    const value = "Foobar";

    it("renders the InputText with the value", () => {
      const { getByDisplayValue } = renderInputText({ value: value });
      expect(getByDisplayValue(value)).toBeTruthy();
    });

    it("renders a prefix label", () => {
      const { getByText } = renderInputText({
        prefix: mockLabel,
        value: value,
      });
      expect(getByText(mockLabel.label)).toBeTruthy();
    });

    it("renders a suffix label", () => {
      const { getByText } = renderInputText({
        suffix: mockLabel,
        value: value,
      });
      expect(getByText(mockLabel.label)).toBeTruthy();
    });
  });

  describe("when no value", () => {
    it("does not render a prefix label", () => {
      const { queryByText } = renderInputText({ prefix: mockLabel });
      expect(queryByText(mockLabel.label)).toBeNull();
    });

    it("does not render a suffix label", () => {
      const { queryByText } = renderInputText({ suffix: mockLabel });
      expect(queryByText(mockLabel.label)).toBeNull();
    });
  });

  describe("Callbacks", () => {
    it("calls onChangeText callback on input", () => {
      const changeCallback = jest.fn();
      const a11yLabel = "Test InputText";
      const { getByLabelText } = render(
        <InputText
          onChangeText={changeCallback}
          value="Initial value"
          accessibilityLabel={a11yLabel}
        />,
      );

      fireEvent.changeText(getByLabelText(a11yLabel), "New value");
      expect(changeCallback).toHaveBeenCalledWith("New value");
    });

    describe("onBlur", () => {
      it("calls onBlur callback on input", () => {
        const blurCallback = jest.fn();
        const a11yLabel = "Test InputText";
        const { getByLabelText } = render(
          <InputText
            onBlur={blurCallback}
            value="Initial value"
            accessibilityLabel={a11yLabel}
          />,
        );

        fireEvent(getByLabelText(a11yLabel), "blur");
        expect(blurCallback).toHaveBeenCalledTimes(1);
      });

      it("trims whitespace on blur", () => {
        const onChangeHandler = jest.fn();
        const a11yLabel = "Test InputText";
        const whiteSpacesValue = "    Hello World    ";
        const { getByLabelText } = render(
          <InputText
            value={whiteSpacesValue}
            accessibilityLabel={a11yLabel}
            onChangeText={onChangeHandler}
          />,
        );

        fireEvent(getByLabelText(a11yLabel), "blur");
        expect(onChangeHandler).toHaveBeenCalledWith("Hello World");
      });
    });

    it("calls onFocus callback on focus", () => {
      const focusCallback = jest.fn();
      const a11yLabel = "Test InputText";
      const { getByLabelText } = render(
        <InputText onFocus={focusCallback} accessibilityLabel={a11yLabel} />,
      );

      fireEvent(getByLabelText(a11yLabel), "onFocus");
      expect(focusCallback).toHaveBeenCalled();
    });
  });

  describe("Validations", () => {
    it("calls validations on blur", async () => {
      const validationMock = jest.fn();
      const a11yLabel = "Test InputText";
      const { getByLabelText } = render(
        <InputText
          value="Initial value"
          accessibilityLabel={a11yLabel}
          validations={{ validate: validationMock }}
        />,
      );

      await waitFor(() => {
        fireEvent(getByLabelText(a11yLabel), "blur");
      });

      expect(validationMock).toHaveBeenCalled();
    });

    it("renders validation messages after blur", async () => {
      const a11yLabel = "Test InputText";
      const { getByLabelText, getByText } = render(
        <InputText
          accessibilityLabel={a11yLabel}
          validations={{ required: { value: true, message: "Foobar" } }}
        />,
      );

      await waitFor(() => {
        fireEvent(getByLabelText(a11yLabel), "blur");
      });

      expect(
        getByText("Foobar", { includeHiddenElements: true }),
      ).toBeDefined();
    });
  });

  describe("accessibilityLabel", () => {
    it("uses accessibilityLabel if specified", () => {
      const changeCallback = jest.fn();
      const { getByLabelText } = render(
        <InputText
          onChangeText={changeCallback}
          value=""
          placeholder="placeholder"
          accessibilityLabel="accessibilityLabel"
        />,
      );

      expect(getByLabelText("accessibilityLabel")).toBeTruthy();
    });

    it("uses placeholder if unspecified", () => {
      const changeCallback = jest.fn();
      const { getByLabelText } = render(
        <InputText
          onChangeText={changeCallback}
          value=""
          placeholder="placeholder"
        />,
      );

      expect(getByLabelText("placeholder")).toBeTruthy();
    });
  });

  describe("clearable button", () => {
    function setup({
      clearable,
      value,
      accessibilityLabel,
      onChangeText,
      disabled,
    }: {
      clearable: Clearable;
      value?: string;
      accessibilityLabel?: string;
      onChangeText?: () => void;
      disabled?: boolean;
    }): RenderAPI {
      return render(
        <InputText
          clearable={clearable}
          value={value}
          placeholder="placeholder"
          accessibilityLabel={accessibilityLabel}
          onChangeText={onChangeText}
          disabled={disabled}
        />,
      );
    }

    describe("clearable set to always", () => {
      it("renders the clear button when there is a value", () => {
        const { getByLabelText } = setup({
          clearable: "always",
          value: "test value",
        });

        const clearButton = getByLabelText(clearInput);
        expect(clearButton).toBeDefined();
      });

      it("doesn't render the clear button if there is no value", () => {
        const { queryByLabelText } = setup({ clearable: "always", value: "" });

        const clearButton = queryByLabelText(clearInput);
        expect(clearButton).toBeNull();
      });

      it("renders the clear button when there is a value and you are focused", async () => {
        const { getByLabelText } = setup({
          clearable: "always",
          value: "test value",
          accessibilityLabel: "clearableTest",
        });
        await fireEvent(getByLabelText("clearableTest"), "focus");

        const clearButton = getByLabelText(clearInput);
        expect(clearButton).toBeDefined();
      });
    });

    describe("clearable set to when editing", () => {
      it("renders the clear button when there is a value and it is being edited", async () => {
        const { getByLabelText } = setup({
          clearable: "while-editing",
          value: "Test Input",
          accessibilityLabel: "clearableTest",
        });
        await fireEvent(getByLabelText("clearableTest"), "focus");

        const clearButton = getByLabelText(clearInput);
        expect(clearButton).toBeDefined();
      });

      it("doesn't render the clear button if the user isn't editing", () => {
        const { queryByLabelText } = setup({
          clearable: "while-editing",
          value: "Test value",
        });

        const clearButton = queryByLabelText(clearInput);
        expect(clearButton).toBeNull();
      });
    });

    describe("clearable set to never", () => {
      it("shouldn't show the button when it is being edited", async () => {
        const { getByLabelText, queryByLabelText } = setup({
          clearable: "never",
          value: "Test Input",
          accessibilityLabel: "clearableTest",
        });
        await fireEvent(getByLabelText("clearableTest"), "focus");

        const clearButton = queryByLabelText(clearInput);
        expect(clearButton).toBeNull();
      });

      it("shouldn't show the clear button when the user is not editing", () => {
        const { queryByLabelText } = setup({
          clearable: "never",
          value: "Test Input",
          accessibilityLabel: "clearableTest",
        });

        const clearButton = queryByLabelText(clearInput);
        expect(clearButton).toBeNull();
      });
    });

    it("should clear the value when the clear button is pressed", () => {
      const onChangeHandler = jest.fn();
      const { getByLabelText } = setup({
        clearable: "always",
        value: "Test Input",
        onChangeText: onChangeHandler,
      });

      const clearButton = getByLabelText(clearInput);
      fireEvent(clearButton, "press");
      expect(onChangeHandler).toHaveBeenCalledWith("");
    });

    it("shouldn't render the clear button if the input is disabled", () => {
      const { queryByLabelText } = setup({
        clearable: "always",
        value: "Test value",
        accessibilityLabel: "clearableTest",
        disabled: true,
      });

      const clearButton = queryByLabelText(clearInput);
      expect(clearButton).toBeNull();
    });
  });

  describe.each(platforms)(
    "%s returnKeyLabel",
    (platform, expectedReturnKeyType) => {
      it("doesn't set a returnKeyType for multiline inputs", () => {
        Platform.OS = platform;

        const { getByTestId } = renderInputText({
          multiline: true,
          testID: "multiline",
        });
        const rnTextInput = getByTestId("multiline");

        expect(rnTextInput.props.returnKeyType).toBeUndefined();
      });

      it("sets the correct returnKeyType when in the InputAccessoryContext", () => {
        Platform.OS = platform;

        const { getByTestId } = render(
          <InputAccessoriesProvider>
            <InputText testID="returnKeyType" />
          </InputAccessoriesProvider>,
        );

        const rnTextInput = getByTestId("returnKeyType");

        expect(rnTextInput.props.returnKeyType).toBe(expectedReturnKeyType);
      });
    },
  );

  describe("Style", () => {
    it("displays default text styles", () => {
      const defaultValue = "Default Foobar";
      const { getByDisplayValue } = renderInputText({ defaultValue });
      const textInput = getByDisplayValue(defaultValue);
      expect(textInput.props.style).toContainEqual({
        ...commonInputStyles.input,
      });
    });

    it("displays overriden text styles", () => {
      const defaultValue = "Default Foobar";
      const styleOverride = {
        inputText: {
          fontFamily: "inter-extrabold",
          fontSize: 50,
          lineHeight: 60,
          letterSpacing: 10,
          color: "purple",
        },
      };
      const { getByDisplayValue } = renderInputText({
        defaultValue,
        styleOverride,
      });
      const textInput = getByDisplayValue(defaultValue);
      const flattenedStyle = textInput.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );
      expect(styleOverride.inputText.fontFamily).toEqual(
        flattenedStyle.fontFamily,
      );
      expect(styleOverride.inputText.fontSize).toEqual(flattenedStyle.fontSize);
      expect(styleOverride.inputText.lineHeight).toEqual(
        flattenedStyle.lineHeight,
      );
      expect(styleOverride.inputText.letterSpacing).toEqual(
        flattenedStyle.letterSpacing,
      );
      expect(styleOverride.inputText.color).toEqual(flattenedStyle.color);
    });
  });
});
