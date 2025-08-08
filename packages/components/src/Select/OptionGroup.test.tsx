import React from "react";
import { render } from "@testing-library/react";
import { Select } from "./index";

describe("OptionGroup", () => {
  it("renders with a label", () => {
    const { container } = render(
      <select>
        <Select.OptionGroup label="Test Group">
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = container.querySelector("optgroup");
    expect(optgroup).toBeInTheDocument();
    expect(optgroup).toHaveAttribute("label", "Test Group");
  });

  it("renders children options", () => {
    const { container } = render(
      <select>
        <Select.OptionGroup label="Test Group">
          <Select.Option value="option1">Option 1</Select.Option>
          <Select.Option value="option2">Option 2</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const options = container.querySelectorAll("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("Option 1");
    expect(options[1]).toHaveTextContent("Option 2");
  });

  it("supports disabled state", () => {
    const { container } = render(
      <select>
        <Select.OptionGroup label="Disabled Group" disabled>
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = container.querySelector("optgroup");
    expect(optgroup).toHaveAttribute("disabled");
  });

  it("works without disabled attribute when not specified", () => {
    const { container } = render(
      <select>
        <Select.OptionGroup label="Enabled Group">
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = container.querySelector("optgroup");
    expect(optgroup).not.toHaveAttribute("disabled");
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
    const { container } = render(
      <select>
        <Select.OptionGroup
          label="Styled Group"
          UNSAFE_style={{ fontWeight: "bold" }}
        >
          <Select.Option value="test">Test Option</Select.Option>
        </Select.OptionGroup>
      </select>,
    );

    const optgroup = container.querySelector("optgroup");
    expect(optgroup).toHaveStyle({ fontWeight: "bold" });
  });
});
