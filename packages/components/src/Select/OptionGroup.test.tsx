import React from "react";
import { render, screen } from "@testing-library/react";
import { Select } from "./index";

describe("OptionGroup", () => {
  it("renders with a label", () => {
    render(
      <select>
        <Select.OptionGroup label="Test Group">
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = screen.getByRole("group", { name: "Test Group" });
    expect(optgroup).toBeInTheDocument();
    expect(optgroup).toHaveAccessibleName("Test Group");
  });

  it("renders children options", () => {
    render(
      <select>
        <Select.OptionGroup label="Test Group">
          <Select.Option value="option1">Option 1</Select.Option>
          <Select.Option value="option2">Option 2</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    expect(
      screen.getByRole("option", { name: "Option 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 2" }),
    ).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(
      <select>
        <Select.OptionGroup label="Disabled Group" disabled>
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = screen.getByRole("group", { name: "Disabled Group" });
    expect(optgroup).toBeDisabled();
  });

  it("works without disabled attribute when not specified", () => {
    render(
      <select>
        <Select.OptionGroup label="Enabled Group">
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = screen.getByRole("group", { name: "Enabled Group" });
    expect(optgroup).toBeEnabled();
  });

  it("applies UNSAFE_className", () => {
    const { container } = render(
      <select>
        <Select.OptionGroup
          label="Custom Group"
          UNSAFE_className="custom-class"
        >
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = container.querySelector("optgroup");
    expect(optgroup).toHaveClass("custom-class");
  });

  it("applies UNSAFE_style", () => {
    render(
      <select>
        <Select.OptionGroup
          label="Styled Group"
          UNSAFE_style={{ fontWeight: "bold" }}
        >
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = screen.getByRole("group", { name: "Styled Group" });
    expect(optgroup).toHaveStyle({ fontWeight: "bold" });
  });
});
