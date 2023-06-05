import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { TextInput } from "react-native-gesture-handler";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-native";
import { FormField } from ".";
import { Text } from "../Text";

const mockOnSubmit = jest.fn();
const inputAccessibilityLabel = "textInput";
const saveButtonText = "Save Me";

// instead of Form,
// make a wrapper component that uses react hook form provider, and that uses the useForm Hook
// getFieldState for errors and getValue from the hook

// FormProvider
// useFormContext hook
// https://react-hooks-testing-library.com/usage/advanced-hooks#context

// 1 - FormField used where it creates its own controller for the field (no context)
// 2 - FormField used with a context from useFormContext

function SimpleFormWithProvider({ children }) {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      {children}
      <Button
        onPress={formMethods.handleSubmit(values => mockOnSubmit(values))}
        title={saveButtonText}
        accessibilityLabel={saveButtonText}
      />
    </FormProvider>
  );
}

describe("when a component is wrapped in a FormField within a Form", () => {
  describe("when the component's value is changed", () => {
    it("updates the form value for that component", async () => {
      const defaultInputValue = "Sonkey";
      const newInputValue = "Donic";

      const { getByLabelText } = render(
        <SimpleFormWithProvider>
          <FormField name="formTextInput" defaultValue={defaultInputValue}>
            {field => {
              return (
                <TextInput
                  accessibilityLabel={inputAccessibilityLabel}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              );
            }}
          </FormField>
        </SimpleFormWithProvider>,
      );
      const textInput = getByLabelText(inputAccessibilityLabel);
      fireEvent.changeText(textInput, newInputValue);

      const saveButton = getByLabelText(saveButtonText);
      await waitFor(() => {
        fireEvent.press(saveButton);
      });

      expect(mockOnSubmit).toHaveBeenCalledWith({
        formTextInput: newInputValue,
      });
    });
  });

  describe("when the validations of the component are violated", () => {
    it("returns an error from the FormField wrapper", async () => {
      const newInputValue = "Exceeding 5 characters";
      const maxLengthErrorMessage = "error: max length exceeded";

      const { getByLabelText, getAllByText } = render(
        <SimpleFormWithProvider>
          <FormField
            name="formTextInput"
            validations={{
              maxLength: {
                value: 5,
                message: maxLengthErrorMessage,
              },
            }}
          >
            {(field, error) => {
              return (
                <>
                  {error && <Text variation="error">{error.message}</Text>}
                  <TextInput
                    accessibilityLabel={inputAccessibilityLabel}
                    value={field.value}
                    onChangeText={field.onChange}
                    id={field.name}
                  />
                </>
              );
            }}
          </FormField>
        </SimpleFormWithProvider>,
      );

      const textInput = getByLabelText(inputAccessibilityLabel);
      fireEvent.changeText(textInput, newInputValue);

      const saveButton = getByLabelText(saveButtonText);
      await waitFor(() => {
        fireEvent.press(saveButton);
      });

      expect(getAllByText(maxLengthErrorMessage)).toHaveLength(1);
    });
  });
});
// describe("when a component is not in a Form with a Form ProviderField within a Form", () => {
//   describe("when the component's value is changed", () => {
//     it("updates the form value for that component", async () => {
//     });
//   });

//   describe("when the validations of the component are violated", () => {
//     it("returns an error from the FormField wrapper", async () => {
//   });
// });
