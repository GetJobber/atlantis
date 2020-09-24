import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { useFormState } from "@jobber/hooks";
import { Form } from ".";
import { InputText } from "../InputText";
import { Text } from "../Text";

afterEach(cleanup);

test("calls the submit handler if the form is valid", async () => {
  const submitHandler = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockForm onSubmit={submitHandler} />,
  );

  const input = getByLabelText("test form");
  fireEvent.change(input, { target: { value: "hello" } });
  fireEvent.click(getByText("submit"));

  await waitFor(() => expect(submitHandler).toHaveBeenCalledTimes(1));
});

test("does not call the submit handler if the form is invalid", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  fireEvent.click(getByText("submit"));

  await waitFor(() => expect(submitHandler).not.toHaveBeenCalled());
});

test("renders an error message when field is invalid", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  fireEvent.click(getByText("submit"));

  await waitFor(() =>
    expect(getByText("validation error")).toBeInstanceOf(HTMLParagraphElement),
  );
});

test("fires onStateChage when component renders", async () => {
  const stateChangeHandler = jest.fn();
  render(<MockForm onSubmit={jest.fn()} onStateChange={stateChangeHandler} />);

  await waitFor(() => {
    expect(stateChangeHandler).toHaveBeenCalled();
    expect(stateChangeHandler).toHaveBeenCalledWith({
      isDirty: false,
      isValid: true,
    });
  });
});

test("onStateChage updates state when form is valid", async () => {
  const stateChangeHandler = jest.fn();
  const { getByLabelText } = render(
    <MockForm onSubmit={jest.fn()} onStateChange={stateChangeHandler} />,
  );

  const input = getByLabelText("test form");
  input.focus();
  fireEvent.change(input, { target: { value: "Bo" } });
  input.blur();

  await waitFor(() => {
    expect(stateChangeHandler).toHaveBeenCalledWith({
      isDirty: true,
      isValid: false,
    });
  });
});

test("initializes useFormState with proper state", async () => {
  const { getByText } = render(<MockFormWithState />);
  await waitFor(() => {
    expect(getByText("Dirty: false")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });
});

test("updates state with useFormState to proper state", async () => {
  const { getByText, getByLabelText } = render(<MockFormWithState />);

  await waitFor(() => {
    expect(getByText("Dirty: false")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });

  const input = getByLabelText("gimme a name");
  fireEvent.change(input, { target: { value: "Bob" } });
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(getByText("Dirty: true")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });

  fireEvent.change(input, { target: { value: "Bobbert" } });
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(getByText("Dirty: true")).not.toBeNull();
    expect(getByText("Valid: true")).not.toBeNull();
  });
});

interface MockFormProps {
  onSubmit(): void;
  onStateChange?(): void;
}

function MockForm({ onSubmit, onStateChange }: MockFormProps) {
  return (
    <Form onSubmit={onSubmit} onStateChange={onStateChange}>
      <InputText
        placeholder="test form"
        name="test"
        validations={{
          required: {
            value: true,
            message: "validation error",
          },
          minLength: {
            value: 3,
            message: "short.",
          },
        }}
      />
      <button type="submit">submit</button>
    </Form>
  );
}

function MockFormWithState() {
  const [formState, setFormState] = useFormState();

  return (
    <Form onStateChange={setFormState}>
      <InputText
        placeholder="gimme a name"
        validations={{
          minLength: {
            value: 5,
            message: "to short",
          },
        }}
      />
      <Text>Dirty: {formState.isDirty ? "true" : "false"}</Text>
      <Text>Valid: {formState.isValid ? "true" : "false"}</Text>
    </Form>
  );
}
