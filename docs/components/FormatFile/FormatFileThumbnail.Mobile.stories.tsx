import React from "react";
import { View } from "react-native";
import { Meta, StoryFn } from "@storybook/react";
import { FormatFileThumbnail } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/FormatFileThumbnail/Mobile",
  component: FormatFileThumbnail,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as Meta<typeof FormatFileThumbnail>;

const BasicTemplate: StoryFn<typeof FormatFileThumbnail> = args => (
  <FormatFileThumbnail {...args} />
);

export const ImageThumbnail = BasicTemplate.bind({});
ImageThumbnail.args = {
  file: {
    fileName: "image.png",
    contentType: "image/png",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
  size: { width: 100, height: 100 },
};

export const VideoThumbnail = BasicTemplate.bind({});
VideoThumbnail.args = {
  file: {
    fileName: "video.mp4",
    contentType: "video/quicktime",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
  size: { width: 100, height: 100 },
};

export const PDFThumbnail = BasicTemplate.bind({});
PDFThumbnail.args = {
  file: {
    fileName: "document.pdf",
    contentType: "application/pdf",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  },
  size: { width: 100, height: 100 },
};

const imageFile = {
  fileName: "image.png",
  contentType: "image/png",
  url: "https://picsum.photos/250",
  thumbnailUrl: "https://picsum.photos/250",
  fileSize: 1024,
};

const COLUMN_SIZE = 100;
const GAP = 8;

export const ThumbnailGrid: StoryFn = () => (
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      gap: GAP,
    }}
  >
    {Array.from({ length: 9 }).map((_, i) => (
      <FormatFileThumbnail
        key={i}
        file={imageFile}
        size={{ width: COLUMN_SIZE, height: COLUMN_SIZE }}
      />
    ))}
  </View>
);
