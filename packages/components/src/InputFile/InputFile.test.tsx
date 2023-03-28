import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import axios from "axios";
import { InputFile } from ".";

jest.mock("axios", () => {
  return { request: jest.fn() };
});

beforeEach(() => {
  (axios.request as jest.Mock).mockReturnValue(Promise.resolve());
});

afterEach(cleanup);

const testFile = new File(["🔱 Atlantis"], "atlantis.png", {
  type: "image/png",
});

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
    const input = container.querySelector("input[type=file]");

    fireEvent.change(input, { target: { files: [testFile] } });

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
    const input = container.querySelector("input[type=file]");

    fireEvent.change(input, { target: { files: [testFile] } });

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
