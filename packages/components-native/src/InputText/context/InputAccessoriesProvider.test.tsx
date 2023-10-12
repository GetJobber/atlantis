import { fireEvent, render } from "@testing-library/react-native";
import React, { useContext, useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import { InputAccessoriesContext } from "./InputAccessoriesContext";
import { InputAccessoriesProvider } from "./InputAccessoriesProvider";
import { InputText } from "../InputText";

const mockUseFormController = jest.fn();
jest.mock("../../hooks", () => {
  return {
    useFormController: (
      ...args: [{ name: string; value: string; validations: unknown }]
    ) => mockUseFormController(...args),
  };
});
const actualUseFormController =
  jest.requireActual("../../hooks").useFormController;

describe("InputAccessories", () => {
  beforeEach(() => {
    Platform.OS = "ios";
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.resetAllMocks();
  });

  const inputOneName = "testInput1";
  const inputTwoName = "testInput2";

  const mockInputOneFocus = jest.fn();
  const mockInputTwoFocus = jest.fn();

  function InputWrapper({ focusedInput }: { readonly focusedInput: string }) {
    const { register, setFocusedInput, unregister } = useContext(
      InputAccessoriesContext,
    );

    useEffect(() => {
      register(inputOneName, () => mockInputOneFocus());
      register(inputTwoName, () => mockInputTwoFocus());
      setFocusedInput(focusedInput);

      return () => {
        unregister(inputOneName);
        unregister(inputTwoName);
        setFocusedInput("");
      };
    }, [register, setFocusedInput, unregister, focusedInput]);

    return (
      <>
        <InputText
          testID={inputOneName}
          name={inputOneName}
          onFocus={mockInputOneFocus}
          value=""
        />
        <InputText testID={inputTwoName} onFocus={mockInputTwoFocus} value="" />
      </>
    );
  }

  function SetupInputAccessoriesTest(focusedInput: string) {
    mockUseFormController.mockImplementation(({ name, value, validations }) => {
      const { field, error } = actualUseFormController({
        name: name || inputTwoName,
        value,
        validations,
      });

      return { field, error };
    });

    return render(<InputWrapper focusedInput={focusedInput} />, {
      wrapper: InputAccessoriesProvider,
    });
  }

  it("pressing done dismisses the keyboard", async () => {
    const keyboardDismissSpy = jest.spyOn(Keyboard, "dismiss");
    const { getByTestId } = SetupInputAccessoriesTest(inputOneName);
    const doneButton = getByTestId("ATL-InputAccessory-Done");

    await fireEvent.press(doneButton);

    expect(keyboardDismissSpy).toHaveBeenCalled();
  });
});
