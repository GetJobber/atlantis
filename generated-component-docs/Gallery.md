# Gallery

# Gallery

The Gallery will layout a set of thumbnails as a group and allows the user to
tap/click to see them larger.

## Design & usage guidelines

The Gallery can display as many images as the designs call for, but if the
amount of images becomes too great, the `max` prop can be used to constrain the
number of images shown.

The Gallery will set the `size` of the thumbnails it displays to `base` by
default, otherwise the `size` prop can be changed to `large`.

## Responsiveness

Responsiveness of thumbnails are controlled by the Gallery wrapper, thumbnails
do not get resized. In other words, if the device rendering the Gallery is 500px
wide, then taking into account padding it will display roughly three thumbnails
beside each other before wrapping subsequent thumbnails to a new line.

## Accessibility

Each of the thumbnails the Gallery displays are tab navigatable. A hover state
will also slightly dim a particular thumbnail when the cursor hovers over it.

## Mockup

<Figma
  collapsable
  url="https://www.figma.com/file/b7LY6hVMwFOj5maidxPTMB/Design-System-Contribution-%5B-Thumbnail-%2B-Gallery-%5D?node-id=1420%3A19639"
/>

## Web Component Code

```tsx
Gallery ThumbnailList ImageList Carousel Image Thumbnail Photo Web React import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Gallery.module.css";
import type { GalleryFile, GalleryProps } from "./GalleryTypes";
import { LightBox } from "../LightBox";
import { FormatFile } from "../FormatFile";
import { Button } from "../Button";
import { isSafari } from "../utils/getClientBrowser";

export function Gallery({ files, size = "base", max, onDelete }: GalleryProps) {
  const [images, setImages] = useState<{ title: string; url: string }[]>([]);
  const [filesToImageIndex, setFilesToImageIndex] = useState<
    (number | undefined)[]
  >([]);

  React.useEffect(() => {
    generateImagesArray(files).then(result => {
      setImages(result.images);
      setFilesToImageIndex(result.filesToImageIndex);
    });
  }, [files]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayPastMax, setDisplayPastMax] = useState(max ? false : true);

  const visibleFiles = displayPastMax ? files : files.slice(0, max);

  return (
    <>
      <div className={size === "large" ? styles.galleryLarge : styles.gallery}>
        {visibleFiles.map((file, index) => {
          return (
            <FormatFile
              key={file.key}
              file={{
                ...file,
                src: () =>
                  Promise.resolve(file.thumbnailSrc || getFileSrc(file)),
              }}
              display="compact"
              displaySize={size}
              onClick={() => {
                handleThumbnailClicked(index);
              }}
              onDelete={onDelete ? () => onDelete?.(file) : undefined}
            />
          );
        })}

        {max && files.length > max && !displayPastMax && (
          <div
            className={classNames(
              styles.showMoreButton,
              styles[`${size}ShowMoreButton` as keyof typeof styles],
            )}
          >
            <Button
              type="tertiary"
              size={size}
              label={`+ ${files.length - max}`}
              fullWidth
              onClick={() => {
                setDisplayPastMax(true);
              }}
            />
          </div>
        )}
      </div>
      <LightBox
        open={lightboxOpen}
        images={images}
        imageIndex={lightboxIndex}
        onRequestClose={handleLightboxClose}
      />
    </>
  );

  async function handleThumbnailClicked(index: number) {
    if (
      files[index].type.startsWith("image/") &&
      isSupportedImageType(files[index])
    ) {
      handleLightboxOpen(index);
    } else {
      window.open(await getFileSrc(files[index]), "_blank");
    }
  }

  function handleLightboxOpen(index: number) {
    const fileToImageIndex = filesToImageIndex[index];

    if (fileToImageIndex !== undefined) {
      setLightboxIndex(fileToImageIndex);
      setLightboxOpen(true);
    }
  }

  function handleLightboxClose() {
    setLightboxOpen(false);
  }
}

async function getFileSrc(file: GalleryFile) {
  return typeof file.src === "string" ? file.src : file.src();
}

function isSupportedImageType(file: GalleryFile) {
  const userAgent =
    typeof document === "undefined" ? "" : window.navigator.userAgent;
  const nonHeicImage = !file.type.startsWith("image/heic");
  const nonSVGImage = !file.type.startsWith("image/svg");

  return (nonHeicImage || isSafari(userAgent)) && nonSVGImage;
}

async function generateImagesArray(files: GalleryFile[]) {
  const images = [];
  const filesToImageIndex = [];
  let imageIndex = 0;

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.startsWith("image/") && isSupportedImageType(files[i])) {
      images.push({ title: files[i].name, url: await getFileSrc(files[i]) });
      filesToImageIndex.push(imageIndex);
      imageIndex++;
    } else {
      filesToImageIndex.push(undefined);
    }
  }

  return { images, filesToImageIndex };
}

```

## Props

### Web Props

| Prop                                                 | Type                          | Required | Default  | Description                                                                |
| ---------------------------------------------------- | ----------------------------- | -------- | -------- | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| `size`                                               | `"base"                       | "large"` | ❌       | `base`                                                                     | The size of the files and their spacing in the gallery |
| `files`                                              | `GalleryFile[]`               | ✅       | `_none_` | The files for the Gallery to display                                       |
| `max`                                                | `number`                      | ❌       | `_none_` | The max number of thumbnails before no more thumbnails are displayed       |
| unless the user clicks an action to display the rest |
| `onDelete`                                           | `(file: GalleryFile) => void` | ❌       | `_none_` | onDelete callback - this function will be called when the delete action is |
| triggered on a Gallery image                         |

## Categories

- Images & Icons

## Web Test Code

```typescript
Gallery ThumbnailList ImageList Carousel Image Thumbnail Photo Web React Test Testing Jest import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import {
  BREAKPOINT_SIZES,
  mockViewportWidth,
} from "@jobber/hooks/useBreakpoints";
import * as browserUtilities from "@jobber/components/utils/getClientBrowser";
import { Gallery } from ".";
import type { File } from "./GalleryTypes";

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

```

## Component Path

`/components/Gallery`

---

_Generated on 2025-08-21T17:35:16.361Z_
