import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileHintText } from "./InputFileHintText";
import { InputFileContentContext } from "./InputFileContentContext";
import { ButtonSize } from "../Button/Button.types";

describe("InputFileHintText", () => {
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

  it("renders hint text from context when no children provided", () => {
    renderWithContext(<InputFileHintText />);
    expect(
      screen.getByText("Select or drag a file here to upload"),
    ).toBeInTheDocument();
  });

  it("renders children instead of context hint text when provided", () => {
    renderWithContext(<InputFileHintText>Custom hint text</InputFileHintText>);
    expect(screen.getByText("Custom hint text")).toBeInTheDocument();
    expect(
      screen.queryByText("Select or drag a file here to upload"),
    ).not.toBeInTheDocument();
  });

  it("passes through text props to underlying Text component", () => {
    renderWithContext(<InputFileHintText size="large" variation="subdued" />);
    const textElement = screen.getByText(
      "Select or drag a file here to upload",
    );
    expect(textElement).toHaveClass("large", "textSecondary");
  });
});
