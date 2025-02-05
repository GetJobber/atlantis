import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import {
  BREAKPOINT_SIZES,
  mockViewportWidth,
} from "@jobber/hooks/useBreakpoints";
import * as browserUtilities from "@jobber/components/utils/getClientBrowser";
import { Gallery } from ".";
import { File } from "./GalleryTypes";

const files: File[] = [
  {
    key: "abc",
    name: "myballisbigandroundIamrollingitontheground.png",
    type: "image/png",
    size: 213402324,
    progress: 1,
    thumbnailSrc: "https://source.unsplash.com/50x50",
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "def",
    name: "iamanimage.png",
    type: "image/png",
    size: 124525234,
    progress: 1,
    thumbnailSrc: "https://source.unsplash.com/50x50",
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "efg",
    name: "upanddown.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://source.unsplash.com/50x50",
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "jkl",
    name: "kramer.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://source.unsplash.com/50x50",
    src: "https://source.unsplash.com/250x250",
  },
  {
    key: "mno",
    name: "boston.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://source.unsplash.com/50x50",
    src: "https://source.unsplash.com/250x250",
  },
];

function convertFileSrcToPromises(fileToConvert: File[]): File[] {
  return fileToConvert.map(file => ({
    ...file,
    src: () =>
      Promise.resolve(typeof file.src === "string" ? file.src : file.src()),
  }));
}

const openSpy = jest.spyOn(window, "open");
openSpy.mockImplementation();

beforeEach(() => {
  openSpy.mockClear();
});

const { setViewportWidth } = mockViewportWidth();

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

    expect(internalThumbnails[0].parentElement?.className).toContain("large");
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
    setViewportWidth(BREAKPOINT_SIZES.lg);
    it("opens the lightbox", async () => {
      const { getByLabelText } = await setupAndOpenLightbox();

      expect(getByLabelText("Lightbox")).toBeInTheDocument();
    });
  });
});

describe("when the lightbox is already opened", () => {
  describe("when the user clicks close on the lightbox", () => {
    setViewportWidth(BREAKPOINT_SIZES.lg);
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
  it("calls the onDelete handler for that gallery item", async () => {
    const deleteHandler = jest.fn();
    const { getByText, getAllByLabelText } = render(
      <Gallery files={files} onDelete={deleteHandler} />,
    );

    fireEvent.click(getAllByLabelText("Delete File")[0]);

    expect(
      getByText("Are you sure you want to delete this file?"),
    ).toBeInstanceOf(HTMLParagraphElement);

    await act(async () => {
      fireEvent.click(getByText("Delete"));
    });

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

it("renders the appropriate thumbnail(icon) for an HEIC image not in Safari", async () => {
  const heicFile = {
    key: "123",
    name: "sample.heic",
    type: "image/heic",
    size: 5000,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  };
  const { findByTestId } = render(<Gallery files={[heicFile]} />);

  expect(await findByTestId("image")).toBeDefined();
});

it("renders the HEIC image thumbnail in Safari", async () => {
  jest.spyOn(browserUtilities, "isSafari").mockReturnValue(true);
  const heicFile = {
    key: "123",
    name: "sample.heic",
    type: "image/heic",
    size: 5000,
    progress: 1,
    src: "https://source.unsplash.com/250x250",
  };
  const { findByAltText } = render(<Gallery files={[heicFile]} />);
  const imageElement = await findByAltText("sample.heic");
  expect(imageElement).toHaveAttribute(
    "src",
    "https://source.unsplash.com/250x250",
  );
});

describe("Thumbnails", () => {
  it.each(files.map(file => [file.name, file.thumbnailSrc]))(
    "should use the thumbnailSrc as the image source for %s",
    async (fileName, src) => {
      const { getByAltText } = render(<Gallery files={files} />);
      const thumbnailImage = getByAltText(fileName);

      await waitFor(() => {
        expect(thumbnailImage).toHaveAttribute("src", src);
      });
    },
  );

  it.each(files.map(file => [file.name, file.src]))(
    "should use the src as image source for %s when thumbnailSrc is not provided",
    async (fileName, src) => {
      const { getByAltText } = render(
        <Gallery
          files={files.map(file => ({ ...file, thumbnailSrc: undefined }))}
        />,
      );
      const thumbnailImage = getByAltText(fileName);

      await waitFor(() => {
        expect(thumbnailImage).toHaveAttribute("src", src);
      });
    },
  );
});

describe("when the src is a promise", () => {
  it("should correctly displays thumbnails", async () => {
    const { findAllByTestId } = render(
      <Gallery files={convertFileSrcToPromises(files)} />,
    );

    const internalThumbnails = await findAllByTestId("internalThumbnailImage");

    expect(internalThumbnails.length).toEqual(files.length);
  });
});
