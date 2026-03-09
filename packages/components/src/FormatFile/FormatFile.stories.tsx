import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormatFile } from "@jobber/components/FormatFile";

const meta = {
  title: "Components/Images and Icons/FormatFile",
  component: FormatFile,
} satisfies Meta<typeof FormatFile>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof FormatFile>>>;

const BasicTemplate = (args: Story["args"]) => (
  <FormatFile
    file={
      args?.file ?? {
        key: "abc",
        name: "image_of_something.png",
        type: "image/png",
        size: 213402324,
        progress: 1,
        src: () => Promise.resolve("https://picsum.photos/250"),
      }
    }
    display={args?.display}
    displaySize={args?.displaySize}
    onDelete={args?.onDelete}
    onClick={args?.onClick}
  />
);

export const Expanded: Story = {
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

export const Collapsed: Story = {
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

export const ExpandedWithDelete: Story = {
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
