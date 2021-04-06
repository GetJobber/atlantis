import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { InputFile } from ".";

afterEach(cleanup);

const testFile = new File(["🔱 Atlantis"], "atlantis.png", {
  type: "image/png",
});

it("renders a InputFile", () => {
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
    <InputFile buttonLabel={buttonLabel} getUploadParams={fetchUploadParams} />,
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
    });
    expect(handleProgress).toHaveBeenCalledWith(baseMatch);
    expect(handleComplete).toHaveBeenCalledWith({
      ...baseMatch,
      progress: 1,
    });

    expect(handleStart).toHaveBeenCalledTimes(1);
    expect(handleComplete).toHaveBeenCalledTimes(1);
  });
});

function fetchUploadParams(file: File) {
  return Promise.resolve({
    key: file.name,
    url: "https://httpbin.org/post",
    fields: { secret: "🤫" },
  });
}
