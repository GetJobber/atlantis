import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
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

const openSpy = jest.spyOn(window, "open");
openSpy.mockImplementation();

beforeEach(() => {
  openSpy.mockClear();
});

async function setupAndOpenLightbox() {
  const rendered = render(<Gallery files={files} />);

  const internalThumbnails = await rendered.findAllByTestId(
    "internalThumbnailImage",
  );
  fireEvent.click(internalThumbnails[0]);

  return rendered;
}

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
      const { getByLabelText } = await setupAndOpenLightbox();

      expect(getByLabelText("Lightbox")).toBeInTheDocument();
    });
  });
});

describe("when the lightbox is already opened", () => {
  describe("when the user clicks close on the lightbox", () => {
    it("should close the lightbox", async () => {
      const { getByLabelText, queryAllByLabelText } =
        await setupAndOpenLightbox();

      fireEvent.click(getByLabelText("Close"));

      await waitFor(() => {
        expect(queryAllByLabelText("Lightbox")).toHaveLength(0);
      });
    });
  });
});

describe("when the delete button is clicked on a gallery item", () => {
  it("calls the onDelete handler for that gallery item", () => {
    const deleteHandler = jest.fn();
    const { getByText, getAllByLabelText } = render(
      <Gallery files={files} onDelete={deleteHandler} />,
    );

    fireEvent.click(getAllByLabelText("Delete File")[0]);

    expect(
      getByText("Are you sure you want to delete this file?"),
    ).toBeInstanceOf(HTMLParagraphElement);

    fireEvent.click(getByText("Delete"));

    expect(deleteHandler).toHaveBeenCalledWith(files[0]);
  });
});

describe("when a non-image is clicked", () => {
  it("should open in a new tab", async () => {
    const pdfSrc = "http://www.africau.edu/images/default/sample.pdf";
    const pdfFile = {
      key: "aytl",
      name: "sample.pdf",
      type: "application/pdf",
      size: 233411234,
      progress: 1,
      src: pdfSrc,
    };
    const { findByTestId } = render(<Gallery files={[pdfFile, ...files]} />);

    const internalPDFImage = await findByTestId("pdf");

    fireEvent.click(internalPDFImage);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(pdfSrc, "_blank");
    });
  });
});
