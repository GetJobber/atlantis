import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { userEvent } from "@testing-library/user-event";
import { InputFile } from ".";

jest.mock("axios", () => {
  return { request: jest.fn() };
});

beforeEach(() => {
  (axios.request as jest.Mock).mockReturnValue(Promise.resolve());
});

const testFile = new File(["🔱 Atlantis"], "atlantis.png", {
  type: "image/png",
});

// eslint-disable-next-line max-statements
describe("Post Requests", () => {
  function fetchUploadParams(file: File) {
    return Promise.resolve({
      key: file.name,
      url: "https://httpbin.org/post",
      fields: { secret: "🤫" },
    });
  }

  it("renders an InputFile", () => {
    const { container } = render(
      <InputFile getUploadParams={fetchUploadParams} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with multiple uploads", () => {
    const { container } = render(
      <InputFile allowMultiple={true} getUploadParams={fetchUploadParams} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with custom accepted MIME types", () => {
    const { container } = render(
      <InputFile
        allowedTypes={["image/png", "image/jpg", "application/pdf"]}
        getUploadParams={fetchUploadParams}
      />,
    );
    const input = container.querySelector("input[type=file]");
    expect(input).toHaveAttribute(
      "accept",
      "image/png,image/jpg,application/pdf",
    );
  });

  it("renders an InputFile with only images allowed", () => {
    const { container } = render(
      <InputFile allowedTypes="images" getUploadParams={fetchUploadParams} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with multiple images allowed", () => {
    const { container } = render(
      <InputFile
        allowedTypes="images"
        allowMultiple={true}
        getUploadParams={fetchUploadParams}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders an InputFile with proper variations", () => {
    const { container } = render(
      <>
        <InputFile getUploadParams={fetchUploadParams} />
        <InputFile size="small" getUploadParams={fetchUploadParams} />
        <InputFile variation="button" getUploadParams={fetchUploadParams} />
        <InputFile
          variation="button"
          size="small"
          getUploadParams={fetchUploadParams}
        />
      </>,
    );
    expect(container).toMatchSnapshot();
  });

  it("supports custom button label", () => {
    const buttonLabel = "Custom Label";
    const { getByText } = render(
      <InputFile
        buttonLabel={buttonLabel}
        getUploadParams={fetchUploadParams}
      />,
    );
    expect(getByText(buttonLabel)).toBeInstanceOf(HTMLElement);
  });

  it("properly notifies upload callbacks", async () => {
    const fetchParams = jest.fn(fetchUploadParams);
    const handleStart = jest.fn();
    const handleProgress = jest.fn();
    const handleComplete = jest.fn();

    const { container } = render(
      <InputFile
        getUploadParams={fetchParams}
        onUploadStart={handleStart}
        onUploadProgress={handleProgress}
        onUploadComplete={handleComplete}
      />,
    );
    const input = container.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;

    await userEvent.upload(input, testFile);

    const baseMatch = {
      key: "atlantis.png",
      name: "atlantis.png",
      size: expect.any(Number),
      progress: expect.any(Number),
      src: expect.any(Function),
      type: "image/png",
    };

    await waitFor(() => {
      expect(fetchParams).toHaveBeenCalledTimes(1);

      expect(handleStart).toHaveBeenCalledWith({
        ...baseMatch,
        progress: 0,
        uploadUrl: "https://httpbin.org/post",
      });
      expect(axios.request).toHaveBeenCalledWith({
        data: expect.any(FormData),
        headers: { "X-Requested-With": "XMLHttpRequest" },
        method: "POST",
        onUploadProgress: expect.any(Function),
        url: "https://httpbin.org/post",
      });
      expect(handleComplete).toHaveBeenCalledWith({
        ...baseMatch,
        progress: 1,
        uploadUrl: "https://httpbin.org/post",
      });

      expect(handleStart).toHaveBeenCalledTimes(1);
      expect(handleComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe("when component fails to get upload params", () => {
    it("calls onError callback", async () => {
      const fetchParams = jest.fn(() => Promise.reject());
      const handleError = jest.fn();

      const { container } = render(
        <InputFile getUploadParams={fetchParams} onUploadError={handleError} />,
      );
      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          new Error("Failed to get upload params"),
        );
      });
    });

    it("calls onError callback with the passed error if getUploadParams throws an error", async () => {
      const fetchParams = jest.fn(() =>
        Promise.reject(new Error("Custom Error Message")),
      );
      const handleError = jest.fn();

      const { container } = render(
        <InputFile getUploadParams={fetchParams} onUploadError={handleError} />,
      );

      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          new Error("Custom Error Message"),
        );
      });
    });
  });

  describe("when the component fails to upload", () => {
    it("calls onError callback", async () => {
      const fetchParams = jest.fn(fetchUploadParams);
      const handleError = jest.fn();

      (axios.request as jest.Mock).mockRejectedValue(
        new Error("Failed to upload file"),
      );

      const { container } = render(
        <InputFile getUploadParams={fetchParams} onUploadError={handleError} />,
      );
      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          new Error("Failed to upload file"),
        );
      });
    });
  });

  describe("when a validator is provided and validation fails", () => {
    it("shows the validation message", async () => {
      function pngFileValidator(file: File) {
        if (file.name.endsWith(".png")) {
          return {
            code: "wrong-file-type",
            message: "Only .png files are allowed",
          };
        }

        return null;
      }

      const { container } = render(
        <InputFile
          getUploadParams={fetchUploadParams}
          validator={pngFileValidator}
        />,
      );
      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, testFile);

      await waitFor(() => {
        expect(container).toContainHTML("Only .png files are allowed");
      });
    });
  });

  describe("when the number of file uploads exceeds maxFiles", () => {
    it("shows the validation message and does not upload files", async () => {
      const { container, getByText } = render(
        <InputFile
          getUploadParams={fetchUploadParams}
          maxFilesValidation={{ maxFiles: 2, numberOfCurrentFiles: 0 }}
          allowMultiple={true}
        />,
      );

      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      await userEvent.upload(input, [testFile, testFile, testFile]);

      await waitFor(() => {
        expect(
          getByText("Cannot exceed a maximum of 2 files."),
        ).toBeInTheDocument();
      });

      expect(axios.request).not.toHaveBeenCalled();
    });
  });

  describe("when allowedTypes uses FileTypes enum", () => {
    it("sets the correct MIME types for allowedTypes prop", () => {
      const { container } = render(
        <InputFile
          getUploadParams={fetchUploadParams}
          allowedTypes={[
            "JPEG",
            "PNG",
            "HEIC",
            "PDF",
            "DOCX",
            "CSV",
            "WEBP",
            "GIF",
            "AVIF",
          ]}
        />,
      );

      const input = container.querySelector(
        "input[type=file]",
      ) as HTMLInputElement;

      const expectedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/heic",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/csv",
        "image/webp",
        "image/gif",
        "image/avif",
      ].join(",");

      expect(input.accept).toBe(expectedMimeTypes);
    });
  });
});

describe("PUT requests", () => {
  function putUploadParams(file: File) {
    return Promise.resolve({
      key: file.name,
      url: "definitely_fake_url",
      fields: {
        "Content-Type": "sol_badguy",
        "Content-MD5": "dragon_install",
      },
      httpMethod: "PUT" as "PUT" | "POST",
    });
  }

  it("uses the returned fields as headers in a PUT request", async () => {
    const fetchParams = jest.fn(putUploadParams);
    const handleStart = jest.fn();
    const handleProgress = jest.fn();
    const handleComplete = jest.fn();

    const { container } = render(
      <InputFile
        getUploadParams={fetchParams}
        onUploadStart={handleStart}
        onUploadProgress={handleProgress}
        onUploadComplete={handleComplete}
      />,
    );
    const input = container.querySelector(
      "input[type=file]",
    ) as HTMLInputElement;

    await userEvent.upload(input, testFile);

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        data: testFile,
        url: "definitely_fake_url",
        method: "PUT",
        headers: {
          "Content-MD5": "dragon_install",
          "Content-Type": "sol_badguy",
        },
        onUploadProgress: expect.any(Function),
      });
    });
  });
});

describe("Content", () => {
  function fetchUploadParams(file: File) {
    return Promise.resolve({
      key: file.name,
      url: "https://httpbin.org/post",
      fields: { secret: "🤫" },
    });
  }

  it("renders default content in dropzone variation", () => {
    render(
      <InputFile
        description="Description text"
        hintText="Hint text"
        getUploadParams={fetchUploadParams}
      />,
    );

    const button = screen.getByRole("button", {
      name: (accessibleName, element) => {
        return accessibleName === "Upload File" && element.tagName === "BUTTON";
      },
    });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("fullWidth");
    expect(screen.queryByText("Description text")).toBeInTheDocument();
    expect(screen.queryByText("Hint text")).toBeInTheDocument();
  });

  it("renders default content without hint text and description in small size", () => {
    render(
      <InputFile
        description="Description text"
        hintText="Hint text"
        size="small"
        getUploadParams={fetchUploadParams}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: (accessibleName, element) => {
          return (
            accessibleName === "Upload File" && element.tagName === "BUTTON"
          );
        },
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Description text")).not.toBeInTheDocument();
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("renders default content in button variation", () => {
    render(
      <InputFile
        hintText="Hint text"
        description="Description text"
        variation="button"
        getUploadParams={fetchUploadParams}
      />,
    );

    const button = screen.getByRole("button", {
      name: (accessibleName, element) => {
        return accessibleName === "Upload File" && element.tagName === "BUTTON";
      },
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("fullWidth");
    expect(screen.queryByText("Description text")).not.toBeInTheDocument();
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("renders custom content using InputFile subcomponents", () => {
    render(
      <InputFile getUploadParams={fetchUploadParams}>
        <InputFile.DropzoneWrapper>
          <div data-testid="custom-wrapper">
            <InputFile.Button size="large" />
            <InputFile.Description>Custom description</InputFile.Description>
            <InputFile.HintText>Custom hint</InputFile.HintText>
          </div>
        </InputFile.DropzoneWrapper>
      </InputFile>,
    );

    expect(screen.getByTestId("custom-wrapper")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upload File" })).toHaveClass(
      "large",
    );
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.getByText("Custom hint")).toBeInTheDocument();
  });

  it("renders custom content with non-subcomponents", () => {
    render(
      <InputFile getUploadParams={fetchUploadParams}>
        <div data-testid="custom-content">
          <h2>Custom Title</h2>
          <p>Custom instructions</p>
          <span>Additional content</span>
        </div>
      </InputFile>,
    );
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom instructions")).toBeInTheDocument();
    expect(screen.getByText("Additional content")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Upload file" }),
    ).not.toBeInTheDocument();
  });

  it("renders custom content mixing subcomponents and regular elements", () => {
    render(
      <InputFile getUploadParams={fetchUploadParams}>
        <div data-testid="mixed-content">
          <h2>Custom Upload Section</h2>
          <InputFile.Button />
          <div className="custom-section">
            <InputFile.HintText />
            <p>Additional instructions</p>
          </div>
          <InputFile.Description>Important notes</InputFile.Description>
        </div>
      </InputFile>,
    );

    expect(screen.getByTestId("mixed-content")).toBeInTheDocument();
    expect(screen.getByText("Custom Upload Section")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Upload File" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select or drag a file here to upload"),
    ).toBeInTheDocument();
    expect(screen.getByText("Additional instructions")).toBeInTheDocument();
    expect(screen.getByText("Important notes")).toBeInTheDocument();
  });

  it("provides correct context to nested components", () => {
    render(
      <InputFile
        getUploadParams={fetchUploadParams}
        allowMultiple={true}
        description="Context Description"
        hintText="Context Hint"
        allowedTypes="images"
      >
        <InputFile.Button />
        <InputFile.Description />
        <InputFile.HintText />
      </InputFile>,
    );

    expect(screen.getByText("Context Description")).toBeInTheDocument();
    expect(screen.getByText("Context Hint")).toBeInTheDocument();
  });

  it("maintains dropzone functionality with custom content", async () => {
    const handleUploadStart = jest.fn();
    render(
      <InputFile
        getUploadParams={fetchUploadParams}
        onUploadStart={handleUploadStart}
      >
        <div data-testid="custom-content">
          <InputFile.Button />
          <p>Custom text</p>
        </div>
      </InputFile>,
    );

    const input = screen.getByTestId("input-file-input");
    await userEvent.upload(input, testFile);

    await waitFor(() => {
      expect(handleUploadStart).toHaveBeenCalled();
    });
  });

  it("passes the name prop to the underlying input element", () => {
    const { container } = render(
      <InputFile getUploadParams={fetchUploadParams} name="file-upload" />,
    );

    const input = container.querySelector("input[type=file]");
    expect(input).toHaveAttribute("name", "file-upload");
  });
});
