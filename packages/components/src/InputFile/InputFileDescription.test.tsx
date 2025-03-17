import React from "react";
import { render, screen } from "@testing-library/react";
import { InputFileDescription } from "./InputFileDescription";
import {
  InputFileContentContext,
  InputFileContentContextValue,
} from "./InputFileContentContext";

describe("InputFileDescription", () => {
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

  it("renders nothing when no description is provided in context or children", () => {
    const { container } = renderWithContext(<InputFileDescription />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders description from context", () => {
    renderWithContext(<InputFileDescription />, {
      ...defaultContextValue,
      description: "Context description text",
    });
    expect(screen.getByText("Context description text")).toBeInTheDocument();
  });

  it("renders children over context description", () => {
    renderWithContext(
      <InputFileDescription>Child description text</InputFileDescription>,
      {
        ...defaultContextValue,
        description: "Context description text",
      },
    );
    expect(screen.getByText("Child description text")).toBeInTheDocument();
    expect(
      screen.queryByText("Context description text"),
    ).not.toBeInTheDocument();
  });

  it("defaults to small size and subdued variation", () => {
    renderWithContext(<InputFileDescription />, {
      ...defaultContextValue,
      description: "Description text",
    });
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("small", "textSecondary");
  });

  it("applies custom size prop", () => {
    renderWithContext(<InputFileDescription size="large" />, {
      ...defaultContextValue,
      description: "Description text",
    });
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("large");
  });

  it("applies custom variation prop", () => {
    renderWithContext(<InputFileDescription variation="error" />, {
      ...defaultContextValue,
      description: "Description text",
    });
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("critical");
  });

  it("passes through additional text props", () => {
    renderWithContext(
      <InputFileDescription align="center" maxLines="single" />,
      {
        ...defaultContextValue,
        description: "Description text",
      },
    );
    const textElement = screen.getByText("Description text");
    expect(textElement).toHaveClass("center");
  });
});
