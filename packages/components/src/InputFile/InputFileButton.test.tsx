import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileButton } from "./InputFileButton";
import {
  InputFileContentContext,
  InputFileContentContextValue,
} from "./InputFileContentContext";

describe("InputFileButton", () => {
  const defaultContextValue: InputFileContentContextValue = {
    fileType: "File",
    allowMultiple: false,
    description: undefined,
    hintText: undefined,
    buttonLabel: undefined,
    size: "base",
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

  it("renders with default props", () => {
    renderWithContext(<InputFileButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent("Upload File");
    expect(button).toHaveAttribute("aria-label", "Upload file");
  });

  it("uses custom label when provided", () => {
    renderWithContext(<InputFileButton label="Custom Upload" />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Custom Upload");
  });

  it("uses context button label when no label prop is provided", () => {
    renderWithContext(<InputFileButton />, {
      ...defaultContextValue,
      buttonLabel: "Context Label",
    });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Context Label");
  });

  it("uses context size when no size prop is provided", () => {
    renderWithContext(<InputFileButton />, {
      ...defaultContextValue,
      size: "small",
    });

    const button = screen.getByRole("button");
    expect(button.className).toContain("small");
    expect(button).toHaveAttribute("type", "button");
  });

  it("overrides context size with size prop when provided", () => {
    renderWithContext(<InputFileButton size="small" />, {
      ...defaultContextValue,
      size: "base",
    });

    const button = screen.getByRole("button");
    expect(button.className).toContain("small");
  });

  it("uses plural form in label when allowMultiple is true", () => {
    renderWithContext(<InputFileButton />, {
      ...defaultContextValue,
      allowMultiple: true,
      fileType: "Image",
    });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Upload Images");
  });

  it("uses singular form in label when allowMultiple is false", () => {
    renderWithContext(<InputFileButton />, {
      ...defaultContextValue,
      allowMultiple: false,
      fileType: "Image",
    });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Upload Image");
  });

  it("applies fullWidth prop correctly", () => {
    renderWithContext(<InputFileButton fullWidth={true} />);

    const button = screen.getByRole("button");
    expect(button.className).toContain("fullWidth");
  });

  it("defaults to non-fullWidth when prop is not provided", () => {
    renderWithContext(<InputFileButton />);

    const button = screen.getByRole("button");
    expect(button.className).not.toContain("fullWidth");
  });

  it("passes through additional button props", () => {
    renderWithContext(
      <InputFileButton disabled={true} variation="work" icon="upload" />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("work");
    expect(button.className).toContain("hasIconAndLabel");
  });
});
