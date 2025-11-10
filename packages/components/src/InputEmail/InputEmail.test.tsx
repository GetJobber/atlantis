import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputEmail } from "./InputEmail";
import { validationMessage } from "./InputEmail.types";

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

describe("clearable while-editing", () => {
  it("shows clear when focused and has value; hides on blur", async () => {
    const { getByLabelText, queryByLabelText } = render(
      <InputEmail
        placeholder="Email"
        value="test@example.com"
        clearable="while-editing"
      />,
    );

    const input = getByLabelText("Email");

    await userEvent.click(input);

    const clear = getByLabelText("Clear input");
    expect(clear).toBeVisible();

    await userEvent.tab(); // focus the clear button
    await userEvent.tab(); // blur the clear button

    expect(queryByLabelText("Clear input")).not.toBeInTheDocument();
  });

  it("does not show clear when there is no value", async () => {
    const { queryByLabelText, getByLabelText } = render(
      <InputEmail placeholder="Email" value="" clearable="while-editing" />,
    );
    const input = getByLabelText("Email");

    await userEvent.click(input);

    expect(queryByLabelText("Clear input")).not.toBeInTheDocument();
  });
});

describe("clearable always", () => {
  it("always shows when clearable=always and has value, even blurred", async () => {
    const { getByLabelText } = render(
      <InputEmail placeholder="Email" value="x@y.com" clearable="always" />,
    );
    const input = getByLabelText("Email");

    await userEvent.click(input);
    await userEvent.tab(); // focus the clear button
    await userEvent.tab(); // blur the clear button

    const clear = getByLabelText("Clear input");

    expect(clear).toBeVisible();
  });
});
