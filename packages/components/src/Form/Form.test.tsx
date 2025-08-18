import type { MutableRefObject } from "react";
import React, { useRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { useFormState } from "@jobber/hooks/useFormState";
import { userEvent } from "@testing-library/user-event";
import type { FormRef } from ".";
import { Form } from ".";
import { InputText } from "../InputText";
import { Text } from "../Text";

it("calls the submit handler if the form is valid", async () => {
  const submitHandler = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockForm onSubmit={submitHandler} />,
  );

  const input = getByLabelText("test form");
  const inputTwo = getByLabelText("test input");
  await userEvent.type(input, "hello");
  await userEvent.type(inputTwo, "hello");
  await userEvent.click(getByText("submit"));

  await waitFor(() => expect(submitHandler).toHaveBeenCalledTimes(1));
});

it("does not call the submit handler if the form is invalid", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  await userEvent.click(getByText("submit"));

  await waitFor(() => expect(submitHandler).not.toHaveBeenCalled());
});

it("renders an error message when field is invalid", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  await userEvent.click(getByText("submit"));

  await waitFor(() =>
    expect(getByText("validation error")).toBeInstanceOf(HTMLParagraphElement),
  );
});

it("fires onStateChange when component renders", async () => {
  const stateChangeHandler = jest.fn();
  render(<MockForm onSubmit={jest.fn()} onStateChange={stateChangeHandler} />);

  await waitFor(() => {
    expect(stateChangeHandler).toHaveBeenCalled();
    expect(stateChangeHandler).toHaveBeenCalledWith({
      isDirty: false,
      isValid: false,
    });
  });
});

it("onStateChange updates state when form is valid", async () => {
  const stateChangeHandler = jest.fn();
  const { getByLabelText } = render(
    <MockForm onSubmit={jest.fn()} onStateChange={stateChangeHandler} />,
  );

  const input = getByLabelText("test form");
  await userEvent.type(input, "Bo");
  await userEvent.tab();

  await waitFor(() => {
    expect(stateChangeHandler).toHaveBeenCalledWith({
      isDirty: true,
      isValid: false,
    });
  });
});

it("initializes useFormState with proper state", async () => {
  const { getByText } = render(<MockFormWithState />);
  await waitFor(() => {
    expect(getByText("Dirty: false")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });
});

it("updates state with useFormState to proper state", async () => {
  const { getByText, getByLabelText } = render(<MockFormWithState />);

  await waitFor(() => {
    expect(getByText("Dirty: false")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });

  const input = getByLabelText("gimme a name");
  await userEvent.type(input, "Bob");
  await userEvent.tab();

  await waitFor(() => {
    expect(getByText("Dirty: true")).not.toBeNull();
    expect(getByText("Valid: false")).not.toBeNull();
  });
  await userEvent.clear(input);
  await userEvent.type(input, "Bobbert");
  await userEvent.tab();

  await waitFor(() => {
    expect(getByText("Dirty: true")).not.toBeNull();
    expect(getByText("Valid: true")).not.toBeNull();
  });
});

it("wraps the form in a form tag when the onSubmit is set", () => {
  const { getByTestId } = render(<Form onSubmit={jest.fn()}>Foo</Form>);
  expect(getByTestId("atlantis-form")).toBeInstanceOf(HTMLFormElement);
});

it("wraps the form in a div tag when the onSubmit is not set", () => {
  const { getByTestId } = render(<Form>Foo</Form>);
  expect(getByTestId("atlantis-form")).toBeInstanceOf(HTMLDivElement);
});

it("submit method can be used to successfully submit the form", async () => {
  const submitHandler = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockFormValidate onSubmit={submitHandler} />,
  );

  const input = getByLabelText("test form");
  await userEvent.type(input, "Bo");
  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});

it("submit method can be used to trigger validation from outside the form", async () => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockFormValidate onSubmit={submitHandler} />);

  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(getByText("validation error")).not.toBeNull();
    expect(getByText("validation error")).toBeInstanceOf(HTMLParagraphElement);
  });
});

it("should focus on the first errored field", async () => {
  const { getByLabelText, getByText } = render(
    <MockForm onSubmit={jest.fn()} />,
  );

  const input = getByLabelText("test form");
  const inputTwo = getByLabelText("test input");

  await userEvent.click(inputTwo);
  await waitFor(() => {
    expect(inputTwo).toHaveFocus();
  });

  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(input).toHaveFocus();
  });

  await userEvent.type(input, "hello");
  await userEvent.click(getByText("submit"));

  await waitFor(() => {
    expect(inputTwo).toHaveFocus();
  });
});

interface MockFormValidateProps {
  onSubmit(): void;
  onStateChange?(): void;
}

function MockFormValidate({ onSubmit }: MockFormValidateProps) {
  const formRef = useRef() as MutableRefObject<FormRef>;

  return (
    <>
      <Form onSubmit={onSubmit} ref={formRef}>
        <InputText
          placeholder="test form"
          name="test"
          validations={{
            required: {
              value: true,
              message: "validation error",
            },
          }}
        />
      </Form>
      <button onClick={() => formRef.current.submit()}>submit</button>
    </>
  );
}

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
      <InputText
        placeholder="test input"
        name="testInput"
        validations={{
          required: {
            value: true,
            message: "validation error when required",
          },
          minLength: {
            value: 3,
            message: "two short.",
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
