import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { ThumbnailList } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/ThumbnailList/Mobile",
  component: ThumbnailList,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof ThumbnailList>;

const BasicTemplate: StoryFn<typeof ThumbnailList> = args => (
  <ThumbnailList {...args} />
);

const files = [
  {
    contentType: "image/png",
    fileName: "image.png",
    thumbnailUrl: "https://picsum.photos/250",
    url: "https://picsum.photos/250",
    fileSize: 1024,
  },
  {
    contentType: "image/png",
    fileName: "atlantis.png",
    thumbnailUrl: "https://picsum.photos/250",
    url: "https://picsum.photos/250",
    fileSize: 1024,
  },
  {
    contentType: "image/png",
    fileName: "components.png",
    thumbnailUrl: "https://picsum.photos/250",
    url: "https://picsum.photos/250",
    fileSize: 1024,
  },
  {
    contentType: "image/png",
    fileName: "storybook.png",
    thumbnailUrl: "https://picsum.photos/250",
    url: "https://picsum.photos/250",
    fileSize: 1024,
  },
  {
    contentType: "image/png",
    fileName: "storybook2.png",
    thumbnailUrl: "https://picsum.photos/250",
    url: "https://picsum.photos/250",
    fileSize: 1024,
  },
  {
    contentType: "image/png",
    fileName: "components2.png",
    thumbnailUrl: "https://picsum.photos/250",
    url: "https://picsum.photos/250",
    fileSize: 1024,
  },
];

export const Basic = {
  render: BasicTemplate,
  args: {
    files,
    rowCount: 2,
  },
};
