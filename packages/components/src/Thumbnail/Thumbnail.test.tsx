import { render } from "@testing-library/react";
import React from "react";
import { FileUpload } from "@jobber/components/InputFile";
import { Thumbnail } from "./Thumbnail";
import * as browserUtilities from "../utils/getClientBrowser";

afterEach(() => {
  jest.clearAllMocks();
});

function renderInternalThumbnail(file: FileUpload) {
  return render(<Thumbnail compact={false} size={"base"} file={file} />);
}

describe("Thumbnail", () => {
  it("renders the appropriate thumbnail for an image", async () => {
    const file: FileUpload = {
      key: "abc",
      name: "image_of_something.png",
      type: "image/png",
      size: 213402324,
      progress: 1,
      src: () => Promise.resolve("https://picsum.photos/250"),
    };
    const { findByAltText } = renderInternalThumbnail(file);
    const imageElement = await findByAltText("image_of_something.png");
    expect(imageElement).toHaveAttribute("src", "https://picsum.photos/250");
  });

  it("renders the appropriate thumbnail(icon) for an HEIC image not in Safari", async () => {
    const file: FileUpload = {
      key: "abc",
      name: "heic_image_of_something.heic",
      type: "image/heic",
      size: 213402324,
      progress: 1,
      src: () => Promise.resolve("https://picsum.photos/250"),
    };
    const { findByTestId } = renderInternalThumbnail(file);
    expect(await findByTestId("image")).toBeDefined();
  });

  it("renders the HEIC image thumbnail in Safari", async () => {
    jest.spyOn(browserUtilities, "isSafari").mockReturnValue(true);
    const file: FileUpload = {
      key: "abc",
      name: "heic_image_of_something.heic",
      type: "image/heic",
      size: 213402324,
      progress: 1,
      src: () => Promise.resolve("https://picsum.photos/250"),
    };
    const { findByAltText } = renderInternalThumbnail(file);
    const imageElement = await findByAltText("heic_image_of_something.heic");
    expect(imageElement).toHaveAttribute("src", "https://picsum.photos/250");
  });

  it("renders the appropriate thumbnail for a video", async () => {
    const file: FileUpload = {
      key: "abc",
      name: "video_of_something.mp4",
      type: "video/mp4",
      size: 413402324,
      progress: 1,
      src: () =>
        Promise.resolve(
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        ),
    };
    const { findByTestId } = renderInternalThumbnail(file);
    expect(await findByTestId("video")).toBeDefined();
  });

  it("renders the appropriate thumbnail for a pdf", async () => {
    const file: FileUpload = {
      key: "abc",
      name: "pdf_of_something.pdf",
      type: "application/pdf",
      size: 413402324,
      progress: 1,
      src: () => Promise.resolve("someAPI.com/pdf_of_something.pdf"),
    };
    const { findByTestId } = renderInternalThumbnail(file);
    expect(await findByTestId("pdf")).toBeDefined();
  });

  it("renders the appropriate thumbnail for an excel file", async () => {
    const file: FileUpload = {
      key: "abc",
      name: "excel_of_something.xlsx",
      type: "application/vnd.ms-excel",
      size: 413402324,
      progress: 1,
      src: () => Promise.resolve("someAPI.com/excel_of_something.xlsx"),
    };
    const { findByTestId } = renderInternalThumbnail(file);
    expect(await findByTestId("excel")).toBeDefined();
  });
});
