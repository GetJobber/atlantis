import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { FormatFile } from "@jobber/components/FormatFile";

export default {
  title: "Components/Images and Icons/FormatFile/Web",
  component: FormatFile,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof FormatFile>;

const BasicTemplate: StoryFn<typeof FormatFile> = args => (
  <FormatFile {...args} />
);

export const Expanded = {
  render: BasicTemplate,
  args: {
    file: {
      key: "abc",
      name: "image_of_something.png",
      type: "image/png",
      size: 213402324,
      progress: 1,
      src: () => Promise.resolve("https://picsum.photos/250"),
    },
    display: "expanded",
  },
};
export const Collapsed = {
  render: BasicTemplate,
  args: {
    file: {
      key: "abc",
      name: "myballisbigandroundIamrollingitontheground.png",
      type: "image/png",
      size: 213402324,
      progress: 1,
      src: () => Promise.resolve("https://picsum.photos/250"),
    },
    display: "compact",
    displaySize: "large",
    onDelete: () => alert("Deleted"),
  },
};
export const ExpandedWithDelete = {
  render: BasicTemplate,
  args: {
    file: {
      key: "abc",
      name: "image_of_something.png",
      type: "image/png",
      size: 213402324,
      progress: 1,
      src: () => Promise.resolve("https://picsum.photos/250"),
    },
    display: "expanded",
    onDelete: () => console.log("Deleted"),
    onClick: () => alert("Clicked"),
  },
};
