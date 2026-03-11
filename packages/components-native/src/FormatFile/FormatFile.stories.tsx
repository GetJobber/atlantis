import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FormatFile } from "@jobber/components-native";

const meta = {
  title: "Components/Images and Icons/FormatFile",
  component: FormatFile,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof FormatFile>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof FormatFile>>>;

const BasicTemplate = (args: Story["args"]) => (
  <SafeAreaProvider>
    <Host>
      <FormatFile
        file={
          args?.file ?? {
            fileName: "image.png",
            contentType: "image/png",
            url: "https://picsum.photos/250",
            thumbnailUrl: "https://picsum.photos/250",
            fileSize: 1024,
          }
        }
        styleInGrid={args?.styleInGrid}
        accessibilityLabel={args?.accessibilityLabel}
        accessibilityHint={args?.accessibilityHint}
        onTap={args?.onTap}
        onRemove={args?.onRemove}
        onPreviewPress={args?.onPreviewPress}
        bottomSheetOptionsSuffix={args?.bottomSheetOptionsSuffix}
        testID={args?.testID}
        showFileTypeIndicator={args?.showFileTypeIndicator}
        createThumbnail={args?.createThumbnail}
      />
    </Host>
  </SafeAreaProvider>
);

export const Image: Story = {
  render: BasicTemplate,
  args: {
    file: {
      fileName: "image.png",
      contentType: "image/png",
      url: "https://picsum.photos/250",
      thumbnailUrl: "https://picsum.photos/250",
      fileSize: 1024,
    },
  },
};

export const ImageGrid: Story = {
  render: BasicTemplate,
  args: {
    file: {
      fileName: "image.png",
      contentType: "image/png",
      url: "https://picsum.photos/250",
      thumbnailUrl: "https://picsum.photos/250",
      fileSize: 1024,
    },
    styleInGrid: true,
  },
};

export const Video: Story = {
  render: BasicTemplate,
  args: {
    file: {
      fileName: "video.mp4",
      contentType: "video/quicktime",
      url: "https://picsum.photos/250",
      thumbnailUrl: "https://picsum.photos/250",
      fileSize: 1024,
    },
  },
};

export const PDF: Story = {
  render: BasicTemplate,
  args: {
    file: {
      fileName: "document.pdf",
      contentType: "application/pdf",
      url: "https://picsum.photos/250",
      thumbnailUrl: "https://picsum.photos/250",
      fileSize: 1024,
    },
  },
};
