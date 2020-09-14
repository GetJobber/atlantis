import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Form } from ".";
import { InputText } from "../InputText";

afterEach(cleanup);

test("calls the submit handler if the form is valid", async done => {
  const submitHandler = jest.fn();
  const { getByText, getByLabelText } = render(
    <MockForm onSubmit={submitHandler} />,
  );

  const input = getByLabelText("test form");
  fireEvent.change(input, { target: { value: "hello" } });
  fireEvent.click(getByText("submit"));

  waitFor(() => {
    expect(submitHandler).toHaveBeenCalledTimes(1);
    done();
  });
});

test("does not call the submit handler if the form is invalid", async done => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  fireEvent.click(getByText("submit"));

  waitFor(() => {
    expect(submitHandler).not.toHaveBeenCalled();
    done();
  });
});

test("renders an error message when field is invalid", async done => {
  const submitHandler = jest.fn();
  const { getByText } = render(<MockForm onSubmit={submitHandler} />);

  fireEvent.click(getByText("submit"));

  waitFor(() => {
    expect(getByText("validation error")).toBeInstanceOf(HTMLParagraphElement);
    done();
  });
});

interface MockFormProps {
  onSubmit(): void;
}

function MockForm({ onSubmit }: MockFormProps) {
  return (
    <Form onSubmit={onSubmit}>
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
      <button type="submit">submit</button>
    </Form>
  );
}
