import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Gallery } from ".";

afterEach(cleanup);

const files = [
  {
    key: "abc",
    name: "myballisbigandroundIamrollingitontheground.png",
    type: "image/png",
    size: 213402324,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "def",
    name: "iamanimage.png",
    type: "image/png",
    size: 124525234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "efg",
    name: "upanddown.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "jkl",
    name: "kramer.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "mno",
    name: "boston.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  },
];

describe("when the Gallery is large", () => {
  it("displays large thumbnails", async () => {
    const { findAllByTestId } = render(<Gallery files={files} size="large" />);

    const internalThumbnails = await findAllByTestId("internalThumbnailImage");

    expect(internalThumbnails[0].parentElement.className).toContain("large");
  });
});

describe("when the Gallery has a maximum", () => {
  it("only displays the thumbnails up to the maximum", async () => {
    const maxImages = 2;
    const { findAllByTestId } = render(
      <Gallery max={maxImages} files={files} />,
    );

    expect(await findAllByTestId("internalThumbnailImage")).toHaveLength(
      maxImages,
    );
  });

  describe("when the plus button is clicked", () => {
    it("displays the rest of the images", async () => {
      const maxImages = 2;
      const { getByText, findAllByTestId } = render(
        <Gallery max={maxImages} files={files} />,
      );

      fireEvent.click(getByText(`+ ${files.length - maxImages}`));

      const internalThumbnails = await findAllByTestId(
        "internalThumbnailImage",
      );

      expect(internalThumbnails.length).toEqual(files.length);
    });
  });

  describe("when the a Gallery thumbnail is clicked", () => {
    it("opens the lightbox", async () => {
      const { findAllByTestId, getByLabelText } = render(
        <Gallery files={files} />,
      );

      const internalThumbnails = await findAllByTestId(
        "internalThumbnailImage",
      );
      fireEvent.click(internalThumbnails[0]);

      expect(getByLabelText("Lightbox")).toBeInTheDocument();
    });
  });
});
