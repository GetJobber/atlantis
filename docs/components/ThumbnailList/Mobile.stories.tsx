import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThumbnailList } from "@jobber/components-native";

export default {
  title: "Components/Images and Icons/ThumbnailList/Mobile",
  component: ThumbnailList,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof ThumbnailList>;

const BasicTemplate: ComponentStory<typeof ThumbnailList> = args => (
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  files,
  rowCount: 2,
};
