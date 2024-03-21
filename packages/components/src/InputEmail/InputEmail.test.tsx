import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { InputEmail, validationMessage } from ".";

it("shows an error message for an invalid email", async () => {
  const { getByLabelText, getByText } = render(
    <InputEmail placeholder="Foo" />,
  );

  const input = getByLabelText("Foo");

  input.focus();
  fireEvent.change(input, { target: { value: "not an email" } });
  input.blur();

  await waitFor(() => {
    expect(getByText(validationMessage)).toBeInstanceOf(HTMLParagraphElement);
  });
});

it("clears the error message when the email is valid", async () => {
  const { getByLabelText, getByText, queryByText } = render(
    <InputEmail placeholder="Foo" />,
  );

  const input = getByLabelText("Foo");

  input.focus();
  fireEvent.change(input, { target: { value: "not an email" } });
  input.blur();

  await waitFor(() => {
    expect(getByText(validationMessage)).toBeInstanceOf(HTMLParagraphElement);
  });

  await waitFor(() => {
    fireEvent.change(input, { target: { value: "email@email.com" } });
  });

  await waitFor(() => {
    expect(queryByText(validationMessage)).toBeNull();
  });
});

it("Doesn't show validation when you're first typing", async () => {
  const { getByLabelText, getByText, queryByText } = render(
    <InputEmail placeholder="Foo" />,
  );

  const input = getByLabelText("Foo");

  input.focus();
  fireEvent.change(input, { target: { value: "not an email" } });

  await waitFor(() => {
    expect(queryByText(validationMessage)).toBeNull();
  });
  input.blur();

  await waitFor(() => {
    expect(getByText(validationMessage)).toBeInstanceOf(HTMLParagraphElement);
  });
});
