import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileButton } from "./InputFileButton";
import { InputFileContentContext } from "./InputFileContentContext";
import { ButtonSize } from "../Button/Button.types";

describe("InputFileButton", () => {
  const defaultContextValue = {
    fileType: "File",
    allowMultiple: false,
    description: undefined,
    hintText: "Select or drag a file here to upload",
    buttonLabel: "Upload File",
    size: "base" as ButtonSize,
  };

  function renderWithContext(
    content: React.ReactElement,
    contextValue = defaultContextValue,
  ) {
    return render(
      <InputFileContentContext.Provider value={contextValue}>
        {content}
      </InputFileContentContext.Provider>,
    );
  }

  it("renders with default props from context", () => {
    renderWithContext(<InputFileButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent("Upload File");
    expect(button.className).toContain("base");
  });

  it("uses provided props over context values", () => {
    renderWithContext(
      <InputFileButton label="Custom Label" size="small" fullWidth />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Custom Label");
    expect(button.className).toContain("small");
    expect(button.className).toContain("fullWidth");
  });

  it("passes through additional button props", () => {
    renderWithContext(<InputFileButton disabled loading variation="work" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("loading");
    expect(button.className).toContain("work");
  });
});
