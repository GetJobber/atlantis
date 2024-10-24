import React from "react";
import { render, waitFor } from "@testing-library/react";
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
      const fetchParams = jest.fn(() => Promise.reject("error"));
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
          allowedTypes={["JPEG", "PNG", "HEIC", "PDF", "DOCX"]}
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
