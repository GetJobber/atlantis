import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Gallery, GalleryFile } from "@jobber/components/Gallery";

export default {
  title: "Components/Images and Icons/Gallery/Web",
  component: Gallery,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Gallery>;

const BasicTemplate: ComponentStory<typeof Gallery> = args => (
  <Gallery {...args} />
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  files,
};

export const MaxFiles = BasicTemplate.bind({});
MaxFiles.args = {
  files: convertFileSrcToPromises(files),
  max: 3,
};
