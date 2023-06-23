import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert, Keyboard } from "react-native";
import { useIntl } from "react-intl";
import { Host } from "react-native-portalize";
import { Form, FormBannerMessage, FormBannerMessageType } from ".";
import { messages as formErrorBannerMessages } from "./components/FormErrorBanner/messages";
import { messages } from "./components/FormSaveButton/messages";
import { messages as formMessages } from "./messages";
import { FormBannerErrors, FormSubmitErrorType } from "./types";
import { defaultValues as contextDefaultValue } from "../AtlantisContext";
import * as atlantisContext from "../AtlantisContext/AtlantisContext";
import { Text } from "../Text";
import { Checkbox } from "../Checkbox";
import { InputNumber } from "../InputNumber";
import { Switch } from "../Switch";
import { Option, Select } from "../Select";
import { InputText } from "../InputText";

jest.mock("lodash/debounce", () => {
  return jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  });
});

const onSubmitMock = jest.fn().mockImplementation(() => {
  return Promise.resolve(() => Promise.resolve());
});
const onSuccessMock = jest.fn();
const onErrorMock = jest.fn();
const onChangeMock = jest.fn();
const onChangeSelectMock = jest.fn();
const onChangeSwitchMock = jest.fn();

const mockScrollToPosition = jest.fn();
const mockScrollToTop = jest.fn();

jest.mock("./hooks/useFormViewRefs", () => ({
  useFormViewRefs: () => {
    return {
      scrollViewRef: {
        current: { scrollToPosition: mockScrollToPosition },
      },
      bottomViewRef: { current: {} },
      scrollToTop: mockScrollToTop,
    };
  },
}));

const bannerError = {
  title: "My error",
  messages: ["userError1", "userError2"],
};

const noticeMessage = {
  messageType: FormBannerMessageType.NoticeMessage,
  message: "Take note of this information.",
};

const warningMessage = {
  messageType: FormBannerMessageType.WarningMessage,
  message: "Caution is warranted in this case.",
};

const testInputTextName = "test";
const testInputTextNameExclude = "exclude";
const testInputTextPlaceholderExclude = "Test Exclude";
const testInputTextPlaceholder = "Test Input";
const testSelectName = "testSelect";
const testSwitchName = "testSwitch";
const testInputNumberName = "testNumber";
const testCheckboxName = "testCheckbox";
const switchLabel = "switchLabel";
const checkboxLabel = "checkboxLabel";
const selectLabel = "selectLabel";
const saveButtonText = messages.saveButton.defaultMessage;

const requiredInputText = "This field is required";
const minLengthText = "Test is too short";

interface FormFields {
  [testInputTextName]: string;
  [testSelectName]: string;
  [testSwitchName]: boolean;
  [testInputNumberName]: number;
}

interface FormTestProps {
  onSubmit: jest.Mock;
  sendBannerErrors?: boolean;
  sendNetworkErrors?: boolean;
  saveLabel?: string;
  renderStickySection?: (
    onSubmit: () => void,
    label: string | undefined,
    isSubmitting: boolean,
  ) => JSX.Element;
  initialLoading?: boolean;
  initialValues?: FormFields;
  bannerMessages?: FormBannerMessage[];
  localCacheKey?: string;
  localCacheExclude?: string[];
  localCacheId?: string[] | string;
  onBeforeSubmit?: jest.Mock;
  renderFooter?: React.ReactNode;
  saveButtonOffset?: number;
}

function FormTest(props: FormTestProps) {
  return <MockForm {...props} />;
}

function MockForm({
  onSubmit,
  sendBannerErrors = false,
  sendNetworkErrors = false,
  saveLabel,
  renderStickySection,
  initialLoading = false,
  initialValues = undefined,
  bannerMessages,
  localCacheKey,
  localCacheExclude,
  onBeforeSubmit,
  localCacheId,
  renderFooter,
  saveButtonOffset,
}: FormTestProps) {
  const formErrors: FormBannerErrors = {};
  if (sendBannerErrors) {
    formErrors.bannerError = bannerError;
  }
  if (sendNetworkErrors) {
    formErrors.networkError = "Ouch";
  }

  return (
    <Host>
      <Form
        onSubmit={onSubmit}
        onSubmitError={onErrorMock}
        onSubmitSuccess={onSuccessMock}
        bannerErrors={formErrors}
        bannerMessages={bannerMessages}
        saveButtonLabel={saveLabel}
        renderStickySection={renderStickySection}
        initialLoading={initialLoading}
        initialValues={initialValues}
        localCacheKey={localCacheKey}
        localCacheExclude={localCacheExclude}
        localCacheId={localCacheId}
        onBeforeSubmit={onBeforeSubmit}
        renderFooter={renderFooter}
        saveButtonOffset={saveButtonOffset}
      >
        <InputText
          name={testInputTextName}
          placeholder={testInputTextPlaceholder}
          onChangeText={onChangeMock}
          accessibilityLabel={testInputTextPlaceholder}
          validations={{
            required: requiredInputText,
            minLength: { value: 3, message: minLengthText },
          }}
        />
        {Array.isArray(localCacheExclude) && localCacheExclude.length > 0 && (
          <InputText
            name={testInputTextNameExclude}
            placeholder={testInputTextPlaceholderExclude}
          />
        )}
        <Select
          onChange={onChangeSelectMock}
          label={selectLabel}
          name={testSelectName}
        >
          <Option value={"1"}>1</Option>
          <Option value={"2"}>2</Option>
        </Select>
        <Switch
          name={testSwitchName}
          label="Test Switch"
          accessibilityLabel={switchLabel}
          onValueChange={onChangeSwitchMock}
        />
        <InputNumber name={testInputNumberName} placeholder="Test Num" />
        <Checkbox name={testCheckboxName} accessibilityLabel={checkboxLabel} />
      </Form>
    </Host>
  );
}

const testPresetValues = {
  [testInputTextName]: "PresetValueTestText",
  [testSelectName]: "2",
  [testSwitchName]: true,
  [testInputNumberName]: 123454321,
  [testCheckboxName]: true,
};

async function wait(milliseconds = 0): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}

afterEach(() => {
  jest.clearAllMocks();
});

describe("Form", () => {
  describe("Initial Load", () => {
    it("should show activity indicator", () => {
      const { getByLabelText } = render(
        <FormTest initialLoading={true} onSubmit={onSubmitMock} />,
      );
      expect(
        getByLabelText(formMessages.loadingA11YLabel.defaultMessage),
      ).toBeTruthy();
    });

    it("should be populated with provided initialValues", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <FormTest initialValues={testPresetValues} onSubmit={onSubmitMock} />,
      );

      expect(
        getByDisplayValue(testPresetValues[testInputTextName]),
      ).toBeDefined();
      expect(
        getByDisplayValue(testPresetValues[testInputNumberName].toString()),
      ).toBeDefined();
      expect(getByLabelText(switchLabel).props.value).toEqual(true);
      expect(
        getByLabelText(checkboxLabel).props.accessibilityState.checked,
      ).toEqual(true);
    });
  });

  describe("Save", () => {
    it("renders the save button of the form", () => {
      const { getByLabelText } = render(<FormTest onSubmit={onSubmitMock} />);

      const saveButton = getByLabelText(saveButtonText);
      expect(saveButton).toBeTruthy();
    });

    it("displays relevant validation errors when trying to save the form", async () => {
      const { getByLabelText, getAllByText } = render(
        <FormTest onSubmit={onSubmitMock} />,
      );

      const saveButton = getByLabelText(saveButtonText);
      await waitFor(() => {
        fireEvent.press(saveButton);
      });
      expect(
        getAllByText(requiredInputText, { includeHiddenElements: true }),
      ).toBeDefined();

      const newValue = "A";

      await waitFor(() => {
        fireEvent.changeText(
          getByLabelText(testInputTextPlaceholder),
          newValue,
        );
      });
      expect(
        getAllByText(minLengthText, { includeHiddenElements: true }),
      ).toBeDefined();
    });

    it("should submit correct create form data", async () => {
      const { getByLabelText, getByText } = render(
        <FormTest onSubmit={onSubmitMock} />,
      );
      const saveButton = getByLabelText(saveButtonText);

      const newValue = "New Value";
      fireEvent.changeText(getByLabelText(testInputTextPlaceholder), newValue);
      expect(onChangeMock).toHaveBeenCalled();

      fireEvent(getByLabelText(switchLabel), "onValueChange", true);
      expect(onChangeSwitchMock).toHaveBeenCalled();

      fireEvent(
        getByText(selectLabel, { includeHiddenElements: true }),
        "onChange",
        "2",
      );
      expect(onChangeSelectMock).toHaveBeenCalled();

      fireEvent.press(saveButton);

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          [testInputTextName]: newValue,
          [testSelectName]: "2",
          [testSwitchName]: true,
        });
      });
    });

    it("should dismiss keyboard when form is saved", async () => {
      const keyboardDismissSpy = jest.spyOn(Keyboard, "dismiss");
      const { getByLabelText } = render(<FormTest onSubmit={onSubmitMock} />);

      const newValue = "New Value";
      fireEvent.changeText(getByLabelText(testInputTextPlaceholder), newValue);

      const saveButton = getByLabelText(saveButtonText);
      fireEvent.press(saveButton);

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalled();
      });

      expect(keyboardDismissSpy).toHaveBeenCalled();
    });

    it("renders a save button with a custom label if provided", () => {
      const customSaveButtonText = "MySave";
      const { getByLabelText } = render(
        <FormTest onSubmit={onSubmitMock} saveLabel={customSaveButtonText} />,
      );
      const saveButton = getByLabelText(customSaveButtonText);
      expect(saveButton).toBeTruthy();
    });

    it("renders a custom sticky component if provided", () => {
      const customSaveButtonText = "CheckboxOverload";
      const { getByLabelText } = render(
        <FormTest
          onSubmit={onSubmitMock}
          saveLabel={customSaveButtonText}
          renderStickySection={(onSubmit, label) => (
            <Checkbox
              checked={false}
              name={label}
              accessibilityLabel={label}
              onChange={onSubmit}
            />
          )}
        />,
      );
      const overrideCheckbox = getByLabelText(customSaveButtonText);
      expect(overrideCheckbox).toBeTruthy();
    });
  });

  describe("Submitting", () => {
    it("should show submission spinner when submitting form data", async () => {
      const timeoutSubmit = jest.fn().mockImplementation(() => {
        return new Promise(res =>
          setTimeout(() => res(() => Promise.resolve()), 1000),
        );
      });
      const { getByLabelText } = await waitFor(() =>
        render(<FormTest onSubmit={timeoutSubmit} />),
      );

      const saveButton = getByLabelText(saveButtonText);
      fireEvent.press(saveButton);

      expect(
        getByLabelText(formMessages.loadingA11YLabel.defaultMessage),
      ).toBeTruthy();
    });

    it("should call beforeSubmit if one is provided", async () => {
      const beforeSubmitMock = jest.fn().mockImplementation(() => {
        return Promise.resolve(true);
      });

      const { getByLabelText } = render(
        <FormTest onSubmit={onSubmitMock} onBeforeSubmit={beforeSubmitMock} />,
      );

      const newValue = "New Value";
      fireEvent.changeText(getByLabelText(testInputTextPlaceholder), newValue);

      const saveButton = getByLabelText(saveButtonText);
      fireEvent.press(saveButton);

      await waitFor(() => {
        expect(beforeSubmitMock).toHaveBeenCalled();
        expect(onSubmitMock).toHaveBeenCalled();
      });
    });

    it("does not submit if beforeSubmit returns false", async () => {
      const beforeSubmitMock = jest.fn().mockImplementation(() => {
        return Promise.resolve(false);
      });

      const { getByLabelText } = render(
        <FormTest onSubmit={onSubmitMock} onBeforeSubmit={beforeSubmitMock} />,
      );

      const newValue = "New Value";
      fireEvent.changeText(getByLabelText(testInputTextPlaceholder), newValue);

      const saveButton = getByLabelText(saveButtonText);
      fireEvent.press(saveButton);

      await waitFor(() => {
        expect(beforeSubmitMock).toHaveBeenCalled();
        expect(onSubmitMock).not.toHaveBeenCalled();
      });
    });
    describe("While offline", () => {
      const mockSubmit = jest.fn().mockImplementation(() =>
        Promise.reject({
          errorType: FormSubmitErrorType.NetworkError,
        }),
      );
      const setup = () => {
        const view = render(
          <FormTest sendNetworkErrors={true} onSubmit={mockSubmit} />,
        );

        const { getByLabelText } = view;

        const newValue = "New Value";
        fireEvent.changeText(
          getByLabelText(testInputTextPlaceholder),
          newValue,
        );
        fireEvent.press(getByLabelText(saveButtonText));
        return view;
      };

      it("should show offline alert when attempting to save while offline", async () => {
        const alertSpy = jest.spyOn(Alert, "alert");
        const { formatMessage } = useIntl();
        setup();

        await act(wait);
        expect(alertSpy).toHaveBeenCalledTimes(1);
        expect(alertSpy).toHaveBeenCalledWith(
          formatMessage(formMessages.unavailableNetworkTitle),
          formatMessage(formMessages.unavailableNetworkMessage),
          expect.anything(),
        );
      });

      it("Submits Form on successful retry", async () => {
        const alertSpy = jest.spyOn(Alert, "alert");
        setup();
        await act(wait);
        const alertActions = alertSpy.mock.calls[0][2];
        const retryAction = alertActions?.find(
          action =>
            action.text === formMessages.retryAlertButton.defaultMessage,
        );
        mockSubmit.mockImplementationOnce(() => Promise.resolve());
        retryAction?.onPress?.();

        await act(wait);
        expect(alertSpy).toHaveBeenCalledTimes(1);
        expect(onSuccessMock).toHaveBeenCalled();
      });

      it("reshows an Alert on unsuccessful retry", async () => {
        const alertSpy = jest.spyOn(Alert, "alert");
        setup();
        await act(wait);
        const alertActions = alertSpy.mock.calls[0][2];
        const retryAction = alertActions?.find(
          action =>
            action.text === formMessages.retryAlertButton.defaultMessage,
        );
        retryAction?.onPress?.();

        await act(wait);
        expect(alertSpy).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Error Banner", () => {
    const atlantisContextSpy = jest.spyOn(
      atlantisContext,
      "useAtlantisContext",
    );

    atlantisContextSpy.mockReturnValue({
      ...contextDefaultValue,
      isOnline: false,
    });

    it("renders Offline Banner when disconnected", async () => {
      const { getByText } = render(<FormTest onSubmit={onSubmitMock} />);
      const { formatMessage } = useIntl();

      expect(
        getByText(formatMessage(formErrorBannerMessages.offlineError)),
      ).toBeDefined();
    });

    it("does not render Offline Banner when connected", async () => {
      atlantisContextSpy.mockReturnValue({
        ...contextDefaultValue,
        isOnline: true,
      });
      const { queryByText } = render(<FormTest onSubmit={onSubmitMock} />);
      const { formatMessage } = useIntl();

      expect(
        queryByText(formatMessage(formErrorBannerMessages.offlineError)),
      ).toBeNull();
    });

    it("renders user errors when provided", async () => {
      const { getByText } = render(
        <FormTest onSubmit={onSubmitMock} sendBannerErrors={true} />,
      );
      const expectedErrors = bannerError.messages;

      expect(getByText(new RegExp(expectedErrors[0]))).toBeTruthy();
      expect(getByText(new RegExp(expectedErrors[1]))).toBeTruthy();
    });

    it("does not render user errors when not provided", async () => {
      const { queryByText } = render(<FormTest onSubmit={onSubmitMock} />);

      const expectedErrors = bannerError.messages;

      expect(queryByText(expectedErrors[0])).toBeNull();
      expect(queryByText(expectedErrors[1])).toBeNull();
    });
  });

  describe("Message Banner", () => {
    it.each([
      [FormBannerMessageType.NoticeMessage, noticeMessage],
      [FormBannerMessageType.WarningMessage, warningMessage],
    ])("renders a %s when provided", async (_messageType, message) => {
      const { getByText } = render(
        <FormTest onSubmit={onSubmitMock} bannerMessages={[message]} />,
      );

      expect(getByText(message.message)).toBeDefined();
    });

    it("renders multiple messages when provided", async () => {
      const { getByText } = render(
        <FormTest
          onSubmit={onSubmitMock}
          bannerMessages={[noticeMessage, warningMessage]}
        />,
      );

      expect(getByText(noticeMessage.message)).toBeDefined();
      expect(getByText(warningMessage.message)).toBeDefined();
    });
  });

  describe("Render footer", () => {
    it("render a footer when provided", () => {
      const footerMessage = "Hello, I'm a footer!";
      const { getByText } = render(
        <FormTest
          onSubmit={onSubmitMock}
          renderFooter={<Text>{footerMessage}</Text>}
        />,
      );

      expect(getByText(footerMessage)).toBeDefined();
    });
  });

  describe("Safe Area", () => {
    it("does render a safe area when there's a saveButtonOffset is provided", () => {
      const { getByTestId } = render(<FormTest onSubmit={onSubmitMock} />);

      expect(getByTestId("ATL-FormSafeArea")).toBeDefined();
    });

    it("does NOT render a safe area when there's a saveButtonOffset is provided", () => {
      const { queryByTestId } = render(
        <FormTest onSubmit={onSubmitMock} saveButtonOffset={30} />,
      );

      expect(queryByTestId("ATL-FormSafeArea")).toBeNull();
    });
  });
});
