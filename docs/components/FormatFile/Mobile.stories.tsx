import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FormatFile } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/FormatFile/Mobile",
  component: FormatFile,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as Meta<typeof FormatFile>;

const BasicTemplate: StoryFn<typeof FormatFile> = args => (
  <FormatFile {...args} />
);

export const Image = BasicTemplate.bind({});
Image.args = {
  file: {
    fileName: "image.png",
    contentType: "image/png",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
};

export const ImageGrid = BasicTemplate.bind({});
ImageGrid.args = {
  file: {
    fileName: "image.png",
    contentType: "image/png",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
  styleInGrid: true,
};

export const Video = BasicTemplate.bind({});
Video.args = {
  file: {
    fileName: "video.mp4",
    contentType: "video/quicktime",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
};

export const PDF = BasicTemplate.bind({});
PDF.args = {
  file: {
    fileName: "document.pdf",
    contentType: "application/pdf",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
};
