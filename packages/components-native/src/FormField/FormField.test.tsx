import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-native";
import { FormField } from ".";
import { InputText } from "../InputText";

const mockOnSubmit = jest.fn();
const inputAccessibilityLabel = "textInput";
const saveButtonText = "Save Me";

describe("when a component is wrapped in a FormField within a Form", () => {
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

  describe("when the component's value is changed", () => {
    it("updates the form value for that component", async () => {
      const defaultInputValue = "Sonkey";
      const newInputValue = "Donic";

      const { getByLabelText } = render(
        <SimpleFormWithProvider>
          <FormField name="formTextInput" defaultValue={defaultInputValue}>
            {field => {
              return (
                <InputText
                  name={field.name}
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
            {field => {
              return (
                <>
                  <InputText
                    name={field.name}
                    accessibilityLabel={inputAccessibilityLabel}
                    value={field.value}
                    onChangeText={field.onChange}
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

      expect(
        getAllByText(maxLengthErrorMessage, { includeHiddenElements: true }),
      ).toHaveLength(1);
    });
  });
});

describe("when a component is not in a Form with a Form ProviderField within a Form", () => {
  describe("when the component's value is changed", () => {
    it("updates the form value for that component", async () => {
      const defaultInputValue = "Sonkey";
      const newInputValue = "Donic";

      const { getByDisplayValue, getByLabelText } = render(
        <FormField name="formTextInput" defaultValue={defaultInputValue}>
          {field => {
            return (
              <InputText
                name={field.name}
                accessibilityLabel={inputAccessibilityLabel}
                value={field.value}
                onChangeText={field.onChange}
              />
            );
          }}
        </FormField>,
      );
      const textInput = getByLabelText(inputAccessibilityLabel);
      fireEvent.changeText(textInput, newInputValue);
      expect(getByDisplayValue(newInputValue)).toBeDefined();
    });
  });
});
