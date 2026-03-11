import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { GalleryFile } from "@jobber/components/Gallery";
import { Gallery } from "@jobber/components/Gallery";

const meta = {
  title: "Components/Images and Icons/Gallery",
  component: Gallery,
} satisfies Meta<typeof Gallery>;
export default meta;
type Story = StoryObj<
  Pick<
    React.ComponentProps<typeof Gallery>,
    "files" | "size" | "max" | "onDelete"
  >
>;

const BasicTemplate = (args: Story["args"]) => (
  <Gallery
    files={args?.files ?? files}
    size={args?.size}
    max={args?.max}
    onDelete={args?.onDelete}
  />
);

const files: GalleryFile[] = [
  {
    key: "abc",
    name: "myballisbigandroundIamrollingitontheground.png",
    type: "image/png",
    size: 213402324,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "def",
    name: "iamanimage.png",
    type: "image/png",
    size: 124525234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "efg",
    name: "upanddown.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "jkl",
    name: "kramer.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "mno",
    name: "boston.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "pqr",
    name: "pizzaisgood.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "pQ=",
    name: "avatar.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "fGr",
    name: "whatevenisthat.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
  {
    key: "AM=",
    name: "stairs.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    thumbnailSrc: "https://picsum.photos/250",
    src: "https://picsum.photos/550",
  },
];

// This is just a bit of a smoke test to confirm that the Gallery component still
// functions as expected when it receives a promise for the src.
function convertFileSrcToPromises(fileToConvert: GalleryFile[]) {
  return fileToConvert.map(file => ({
    ...file,
    src: () =>
      typeof file.src === "string" ? Promise.resolve(file.src) : file.src(),
  }));
}

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    files,
  },
};

export const MaxFiles: Story = {
  render: BasicTemplate,
  args: {
    files: convertFileSrcToPromises(files),
    max: 3,
  },
};
