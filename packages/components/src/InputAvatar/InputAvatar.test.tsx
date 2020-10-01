import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { InputAvatar } from ".";

afterEach(cleanup);

const testFile = new File(["🔱 Atlantis"], "atlantis.png", {
  type: "image/png",
});

function fetchUploadParams(file: File) {
  return Promise.resolve({
    key: file.name,
    url: "https://httpbin.org/post",
    fields: { secret: "🤫" },
  });
}

it("renders a InputAvatar", () => {
  const { container } = render(
    <InputAvatar getUploadParams={fetchUploadParams} />,
  );
  expect(container).toMatchSnapshot();
});

it("renders a InputAvatar with an provided image", () => {
  const { container } = render(
    <InputAvatar
      getUploadParams={fetchUploadParams}
      imageUrl="https://api.adorable.io/avatars/150/jobbler"
    />,
  );
  expect(container).toMatchSnapshot();
});

it("should call the handler with the new value", async () => {
  const changeHandler = jest.fn();
  const { container } = render(
    <InputAvatar
      getUploadParams={fetchUploadParams}
      onChange={changeHandler}
    />,
  );

  const input = container.querySelector("input[type=file]");

  fireEvent.change(input, { target: { files: [testFile] } });

  await waitFor(() => {
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith({
      key: "atlantis.png",
      name: "atlantis.png",
      size: expect.any(Number),
      progress: expect.any(Number),
      src: expect.any(Function),
      type: "image/png",
    });
  });
});
