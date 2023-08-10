import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { View } from "react-native";
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
} as ComponentMeta<typeof FormatFile>;

const BasicTemplate: ComponentStory<typeof FormatFile> = args => (
  <View style={{ flex: 1 }}>
    <FormatFile {...args} />
  </View>
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
