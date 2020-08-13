import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { InputFile } from ".";

afterEach(cleanup);

const testFile = new File(["🔱 Atlantis"], "atlantis.png", {
  type: "image/png",
});

it("renders a InputFile", () => {
  const tree = renderer
    .create(<InputFile getUploadParams={fetchUploadParams} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an InputFile with multiple uploads", () => {
  const tree = renderer
    .create(<InputFile multiple={true} getUploadParams={fetchUploadParams} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an InputFile with only images allowed", () => {
  const tree = renderer
    .create(
      <InputFile allowedTypes="images" getUploadParams={fetchUploadParams} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an InputFile with multiple images allowed", () => {
  const tree = renderer
    .create(
      <InputFile
        allowedTypes="images"
        multiple={true}
        getUploadParams={fetchUploadParams}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("properly notifies upload callbacks", async () => {
  const handleStart = jest.fn();
  const handleProgress = jest.fn();
  const handleComplete = jest.fn();

  const { container } = render(
    <InputFile
      getUploadParams={fetchUploadParams}
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
    expect(handleStart).toHaveBeenLastCalledWith({
      ...baseMatch,
      progress: 0,
    });
    expect(handleProgress).toHaveBeenLastCalledWith(baseMatch);
    expect(handleComplete).toHaveBeenLastCalledWith({
      ...baseMatch,
      progress: 1,
    });
  });
});

function fetchUploadParams(file: File) {
  return Promise.resolve({
    key: file.name,
    url: "https://httpbin.org/post",
    fields: { secret: "🤫" },
  });
}
