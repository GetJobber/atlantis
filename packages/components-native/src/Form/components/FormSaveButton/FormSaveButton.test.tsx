import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { IconNames } from "@jobber/design";
import { FormSaveButton } from "./FormSaveButton";
import { messages } from "./messages";
import { messages as buttonGroupMessage } from "../../../ButtonGroup/messages";

interface TestSecondaryActionProp {
  label: string;
  icon?: IconNames | undefined;
  handleAction: {
    onBeforeSubmit?: jest.Mock;
    onSubmit: () => Promise<void>;
    onSubmitError?: () => void;
    resetFormOnSubmit?: boolean;
  };
  destructive?: boolean;
}
interface TestFormSaveButtonProps {
  primaryAction: () => Promise<void>;
  loading: boolean;
  label?: string;
  secondaryAction?: TestSecondaryActionProp[];
  setSecondaryActionLoading: (bool: boolean) => void;
}
jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    reset: () => jest.fn(),
  }),
}));

function ButtonGroupForTest(props: TestFormSaveButtonProps) {
  return (
    <Host>
      <FormSaveButton
        primaryAction={props.primaryAction}
        loading={props.loading}
        label={props.label}
        setSecondaryActionLoading={props.setSecondaryActionLoading}
        secondaryActions={props.secondaryAction}
      />
    </Host>
  );
}

describe("the form save button is enabled", () => {
  const loading = false;
  it("renders the form save button with default label", () => {
    const pressHandler = jest.fn();
    const { getByLabelText } = render(
      <ButtonGroupForTest
        primaryAction={pressHandler}
        loading={loading}
        setSecondaryActionLoading={jest.fn()}
      />,
    );
    const saveButton = getByLabelText("Save");
    expect(saveButton).toBeTruthy();
  });

  it("renders a save button and calls the onPress handler when pressed", () => {
    const pressHandler = jest.fn();
    const saveButtonText = messages.saveButton.defaultMessage;
    const { getByLabelText } = render(
      <ButtonGroupForTest
        primaryAction={pressHandler}
        loading={loading}
        setSecondaryActionLoading={jest.fn()}
      />,
    );

    fireEvent.press(getByLabelText(saveButtonText));
    expect(pressHandler).toHaveBeenCalled();
  });

  it("renders a save button with a custom label if provided", () => {
    const pressHandler = jest.fn();
    const saveButtonText = "MySave";
    const { getByLabelText } = render(
      <ButtonGroupForTest
        primaryAction={pressHandler}
        loading={loading}
        setSecondaryActionLoading={jest.fn()}
        label={saveButtonText}
      />,
    );
    const saveButton = getByLabelText(saveButtonText);
    expect(saveButton).toBeTruthy();
  });
});

describe("the form save button is loading", () => {
  const loading = true;
  it("renders the form save button as loading", () => {
    const pressHandler = jest.fn();
    const { getByTestId, getByRole } = render(
      <ButtonGroupForTest
        primaryAction={pressHandler}
        loading={loading}
        setSecondaryActionLoading={jest.fn()}
      />,
    );
    expect(getByTestId("loadingImage")).toBeDefined();
    expect(getByRole("button", { busy: true })).toBeDefined();
  });
});

it("renders a secondaryAction element", () => {
  const pressHandler = jest.fn();
  const { getByLabelText } = render(
    <ButtonGroupForTest
      primaryAction={pressHandler}
      loading={false}
      setSecondaryActionLoading={jest.fn()}
      secondaryAction={[{ label: "hi", handleAction: { onSubmit: jest.fn() } }]}
    />,
  );

  expect(getByLabelText(buttonGroupMessage.more.defaultMessage)).toBeDefined();
});

it("renders a secondaryAction element with and fires the onSubmit and beforeSubmit if available", async () => {
  const pressHandler = jest.fn(() => Promise.resolve());
  const beforeSubmitMock = jest.fn().mockImplementation(() => {
    return Promise.resolve(true);
  });
  const { getByLabelText } = render(
    <ButtonGroupForTest
      primaryAction={pressHandler}
      loading={false}
      setSecondaryActionLoading={jest.fn()}
      secondaryAction={[
        {
          icon: "trash",
          label: "hi",
          handleAction: {
            onSubmit: pressHandler,
            onBeforeSubmit: beforeSubmitMock,
          },
        },
      ]}
    />,
  );
  fireEvent.press(getByLabelText(buttonGroupMessage.more.defaultMessage));
  expect(getByLabelText("hi")).toBeDefined();
  fireEvent.press(getByLabelText("hi"));
  expect(beforeSubmitMock).toHaveBeenCalled();
  await waitFor(() => {
    expect(pressHandler).toHaveBeenCalled();
  });
});
