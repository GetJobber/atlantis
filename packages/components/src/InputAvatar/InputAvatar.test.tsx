import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { InputAvatar } from ".";

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

it("renders", () => {
  const { container } = render(
    <InputAvatar getUploadParams={fetchUploadParams} />,
  );
  expect(container).toMatchSnapshot();
});

it("renders with a provided image", () => {
  const { container } = render(
    <InputAvatar
      getUploadParams={fetchUploadParams}
      imageUrl="https://api.adorable.io/avatars/150/jobbler"
    />,
  );
  expect(container).toMatchSnapshot();
});

it.skip("properly notifies upload callbacks", async () => {
  const changeHandler = jest.fn();
  const completionHandler = jest.fn();
  const { container } = render(
    <InputAvatar
      getUploadParams={fetchUploadParams}
      onChange={changeHandler}
      onUploadComplete={completionHandler}
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

    expect(completionHandler).toHaveBeenCalledTimes(1);
    expect(completionHandler).toHaveBeenCalledWith({
      key: "atlantis.png",
      name: "atlantis.png",
      size: expect.any(Number),
      progress: 1,
      src: expect.any(Function),
      type: "image/png",
    });
  });
});

it("should allow for avatar removal", async () => {
  const changeHandler = jest.fn();
  const { getByText } = render(
    <InputAvatar
      getUploadParams={fetchUploadParams}
      onChange={changeHandler}
      imageUrl="https://api.adorable.io/avatars/150/jobbler"
    />,
  );

  fireEvent.click(getByText("Remove"));

  await waitFor(() => {
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(undefined);
  });
});
