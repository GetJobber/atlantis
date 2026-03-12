import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThumbnailList } from "@jobber/components-native";

const meta = {
  title: "Components/Images and Icons/ThumbnailList",
  component: ThumbnailList,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof ThumbnailList>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => (
  <SafeAreaProvider>
    <Host>
      <ThumbnailList {...args} />
    </Host>
  </SafeAreaProvider>
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

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    files,
    rowCount: 2,
  },
};
