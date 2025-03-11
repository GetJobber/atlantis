import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileHintText } from "./InputFileHintText";
import {
  InputFileContentContext,
  InputFileContentContextValue,
} from "./InputFileContentContext";

describe("InputFileHintText", () => {
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

  it("renders with default hint text for a single file", () => {
    renderWithContext(<InputFileHintText />);
    expect(
      screen.getByText("Select or drag a file here to upload"),
    ).toBeInTheDocument();
  });

  it("renders with default hint text for multiple files", () => {
    renderWithContext(<InputFileHintText />, {
      ...defaultContextValue,
      allowMultiple: true,
    });
    expect(
      screen.getByText("Select or drag files here to upload"),
    ).toBeInTheDocument();
  });

  it("uses 'an' for Image file type", () => {
    renderWithContext(<InputFileHintText />, {
      ...defaultContextValue,
      fileType: "Image",
    });
    expect(
      screen.getByText("Select or drag an image here to upload"),
    ).toBeInTheDocument();
  });

  it("renders with custom hint text from context", () => {
    renderWithContext(<InputFileHintText />, {
      ...defaultContextValue,
      hintText: "Custom hint text",
    });
    expect(screen.getByText("Custom hint text")).toBeInTheDocument();
  });

  it("renders children over context hint text", () => {
    renderWithContext(
      <InputFileHintText>Override hint text</InputFileHintText>,
      {
        ...defaultContextValue,
        hintText: "Context hint text",
      },
    );
    expect(screen.getByText("Override hint text")).toBeInTheDocument();
    expect(screen.queryByText("Context hint text")).not.toBeInTheDocument();
  });

  it("applies custom size prop", () => {
    renderWithContext(<InputFileHintText size="large" />);
    const textElement = screen.getByText(
      "Select or drag a file here to upload",
    );
    expect(textElement).toHaveClass("large");
  });

  it("defaults to small size", () => {
    renderWithContext(<InputFileHintText />);
    const textElement = screen.getByText(
      "Select or drag a file here to upload",
    );
    expect(textElement).toHaveClass("small");
  });

  it("passes through additional text props", () => {
    renderWithContext(<InputFileHintText align="center" variation="subdued" />);
    const textElement = screen.getByText(
      "Select or drag a file here to upload",
    );
    expect(textElement).toHaveClass("center", "textSecondary");
  });
});
