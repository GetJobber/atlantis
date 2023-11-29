import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormatFile } from "@jobber/components/FormatFile";

export default {
  title: "Components/Images and Icons/FormatFile/Web",
  component: FormatFile,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof FormatFile>;

const BasicTemplate: ComponentStory<typeof FormatFile> = args => (
  <FormatFile {...args} />
);

export const Expanded = BasicTemplate.bind({});
Expanded.args = {
  file: {
    key: "abc",
    name: "image_of_something.png",
    type: "image/png",
    size: 213402324,
    progress: 1,
    src: () => Promise.resolve("https://picsum.photos/250"),
  },
  display: "expanded",
};

export const Collapsed = BasicTemplate.bind({});
Collapsed.args = {
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
};
