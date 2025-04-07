import React from "react";
import { renderHook } from "@testing-library/react";
import {
  InputFileContentContext,
  useInputFileContentContext,
} from "./InputFileContentContext";

describe("InputFileContentContext", () => {
  it("provides default values when no context is provided", () => {
    const { result } = renderHook(() => useInputFileContentContext());

    expect(result.current).toEqual({
      fileType: "File",
      allowMultiple: false,
      description: undefined,
      hintText: "Select or drag a file here to upload",
      buttonLabel: "Upload File",
      size: "base",
    });
  });

  it("computes the hint text based on fileType and allowMultiple", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Image",
          allowMultiple: true,
          description: undefined,
          hintText: "",
          buttonLabel: "",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.hintText).toBe(
      "Select or drag images here to upload",
    );
  });

  it("computes button label based on fileType and allowMultiple", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Image",
          allowMultiple: true,
          description: undefined,
          hintText: "",
          buttonLabel: "",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.buttonLabel).toBe("Upload Images");
  });

  it("uses provided hint text and button label when available", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Image",
          allowMultiple: true,
          description: undefined,
          hintText: "Custom hint text",
          buttonLabel: "Custom button label",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.hintText).toBe("Custom hint text");
    expect(result.current.buttonLabel).toBe("Custom button label");
  });

  it("handles different file types correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputFileContentContext.Provider
        value={{
          fileType: "Document",
          allowMultiple: false,
          description: undefined,
          hintText: "",
          buttonLabel: "",
          size: "base",
        }}
      >
        {children}
      </InputFileContentContext.Provider>
    );

    const { result } = renderHook(() => useInputFileContentContext(), {
      wrapper,
    });

    expect(result.current.hintText).toBe(
      "Select or drag a document here to upload",
    );
    expect(result.current.buttonLabel).toBe("Upload Document");
  });
});
