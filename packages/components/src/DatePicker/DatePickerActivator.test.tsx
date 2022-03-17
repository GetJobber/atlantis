import React from "react";
import { render } from "@testing-library/react";
import { DatePickerActivator } from "./DatePickerActivator";
import { Button } from "../Button";

it("renders a button by default", () => {
  const { getByRole, getByTestId } = render(<DatePickerActivator />);
  expect(getByRole("button")).toBeInTheDocument();
  expect(getByTestId("calendar")).toBeInTheDocument();
});

it("renders the activator with fullWidth if it's a valid element", () => {
  const { getByText, getByRole } = render(
    <DatePickerActivator
      activator={<Button fullWidth={true} label="activate me" />}
      fullWidth={true}
    />,
  );
  expect(getByText("activate me")).toBeInTheDocument();
  expect(getByRole("button")).toHaveClass("fullWidth");
});

it("renders the activator if it's a function returning an element", () => {
  const { getByText } = render(
    <DatePickerActivator activator={() => <div>activate me </div>} />,
  );
  expect(getByText("activate me")).toBeInTheDocument();
});

it("removes fullWidth and activator props if a basic html element is the activator", () => {
  const { getByText } = render(
    <DatePickerActivator activator={<div>activate me</div>} fullWidth={true} />,
  );
  expect(getByText("activate me")).toBeInTheDocument();
  expect(getByText("activate me")).not.toHaveAttribute("fullWidth");
});
