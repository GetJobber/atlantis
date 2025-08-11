import React from "react";
import { render, screen } from "@testing-library/react";
import { Select } from "./index";

describe("Option", () => {
  it("renders with text content", () => {
    render(
      <select>
        <Select.Option value="test">Test Option</Select.Option>
      </select>,
    );

    expect(
      screen.getByRole("option", { name: "Test Option" }),
    ).toBeInTheDocument();
  });

  it("renders with value attribute", () => {
    render(
      <select>
        <Select.Option value="test-value">Test Option</Select.Option>
      </select>,
    );

    const option = screen.getByRole("option", { name: "Test Option" });
    expect(option).toHaveValue("test-value");
  });

  it("supports disabled state", () => {
    render(
      <select>
        <Select.Option value="test" disabled>
          Disabled Option
        </Select.Option>
      </select>,
    );

    const option = screen.getByRole("option", { name: "Disabled Option" });
    expect(option).toBeDisabled();
  });

  it("works without disabled attribute when not specified", () => {
    render(
      <select>
        <Select.Option value="test">Enabled Option</Select.Option>
      </select>,
    );

    const option = screen.getByRole("option", { name: "Enabled Option" });
    expect(option).toBeEnabled();
  });

  it("works without value attribute when not specified", () => {
    render(
      <select>
        <Select.Option>Option without value</Select.Option>
      </select>,
    );

    const option = screen.getByRole("option", { name: "Option without value" });
    expect(option).toHaveValue("Option without value");
  });

  it("renders empty option", () => {
    render(
      <select>
        <Select.Option value="empty"></Select.Option>
      </select>,
    );

    const option = screen.getByRole("option");
    expect(option).toBeInTheDocument();
    expect(option).toHaveValue("empty");
    expect(option).toBeEmptyDOMElement();
  });
});
