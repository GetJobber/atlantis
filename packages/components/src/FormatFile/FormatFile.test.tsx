import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { FormatFile } from ".";
import { GLIMMER_TEST_ID } from "../Glimmer";

it("renders a FormatFile", () => {
  const testFile = {
    key: "123",
    name: "Funky Corn",
    type: "audio/ogg",
    size: 1024,
    progress: 1,
    src: () => Promise.resolve("https://audio/somesound.ogg"),
  };
  const { container } = render(<FormatFile file={testFile} />);
  expect(container).toMatchSnapshot();
});

it("renders an image when provided as src", async () => {
  const url = "not_actually_a_url";
  const testFile = {
    key: "234",
    name: "Onion",
    type: "image/png",
    size: 102432,
    progress: 0.1,
    src: () => Promise.resolve(url),
  };

  const { getByAltText } = render(<FormatFile file={testFile} />);

  expect(getByAltText(testFile.name)).not.toHaveAttribute("src");
  fireEvent.load(getByAltText(testFile.name));

  await waitFor(() => {
    expect(getByAltText(testFile.name)).toHaveAttribute("src", url);
  });
});

it("renders a skeleton loader when the provided image has not fully loaded", async () => {
  const url = "not_actually_a_url";
  const testFile = {
    key: "234",
    name: "Onion",
    type: "image/png",
    size: 102432,
    progress: 1,
    src: () => Promise.resolve(url),
  };

  const { getByTestId, queryByTestId, getByAltText } = render(
    <FormatFile file={testFile} />,
  );
  expect(getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
  expect(getByAltText(testFile.name)).toHaveClass("hidden");

  fireEvent.load(getByAltText(testFile.name));

  await waitFor(() => {
    expect(queryByTestId(GLIMMER_TEST_ID)).not.toBeInTheDocument();
  });
  expect(getByAltText(testFile.name)).not.toHaveClass("hidden");
});

it("should call the delete handler", async () => {
  const testFile = {
    key: "234",
    name: "TPS Reports",
    type: "application/pdf",
    size: 1022,
    progress: 1,
    src: () => Promise.resolve("https://nature/interesting-article.png"),
  };
  const deleteHandler = jest.fn();
  const { getByLabelText, getByText } = render(
    <FormatFile onDelete={deleteHandler} file={testFile} />,
  );

  await act(async () => {
    fireEvent.click(getByLabelText("Delete File"));
  });

  expect(
    getByText("Are you sure you want to delete this file?"),
  ).toBeInstanceOf(HTMLParagraphElement);

  fireEvent.click(getByText("Delete"));

  expect(deleteHandler).toHaveBeenCalled();
});

describe("when the format file is a thumbnail", () => {
  describe("when the thumbnail is default sized", () => {
    it("renders a FormatFile as a default sized thumbnail", async () => {
      const testFile = {
        key: "368",
        name: "Pink Dolphin",
        type: "image/png",
        src: () => Promise.resolve("https://source.unsplash.com/250x250"),
        size: 1024,
        progress: 1,
      };

      const { findByRole } = render(
        <FormatFile display="compact" file={testFile} />,
      );

      expect(await findByRole("img")).toBeInTheDocument();

      const thumbnailImage = await findByRole("img");

      expect(thumbnailImage.parentElement?.className).toContain("base");
    });
  });

  describe("when the thumbnail is large sized", () => {
    it("renders a FormatFile as a larget sized thumbnail", async () => {
      const testFile = {
        key: "368",
        name: "Pink Dolphin",
        type: "image/png",
        src: () => Promise.resolve("https://source.unsplash.com/250x250"),
        size: 1024,
        progress: 1,
      };
      const { findByRole } = render(
        <FormatFile display="compact" displaySize="large" file={testFile} />,
      );

      expect(await findByRole("img")).toBeInTheDocument();

      const thumbnailImage = await findByRole("img");

      expect(thumbnailImage.parentElement?.className).toContain("large");
    });
  });
});

describe("Image Load Error Callback", () => {
  const errorCallback = jest.fn();
  const testImage = {
    key: "123",
    name: "Funky Corn",
    type: "image/jpeg",
    size: 1024,
    progress: 1,
    src: () => Promise.resolve("https://example.com/funky-corn.jpeg"),
    onImageLoadError: errorCallback,
  };

  afterEach(() => {
    errorCallback.mockClear();
  });

  it("should call the error callback when the image fails to load", async () => {
    render(<FormatFile file={testImage} />);

    fireEvent.error(screen.getByAltText(testImage.name));

    await waitFor(() => {
      expect(errorCallback).toHaveBeenCalled();
    });
  });

  it("should not call the error callback when the image loads successfully", async () => {
    render(<FormatFile file={testImage} />);

    fireEvent.load(screen.getByAltText(testImage.name));

    await waitFor(() => {
      expect(errorCallback).not.toHaveBeenCalled();
    });
  });
});
