import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Gallery } from "@jobber/components/Gallery";

export default {
  title: "Components/Images and Icons/Gallery/Web",
  component: Gallery,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Gallery>;

const BasicTemplate: ComponentStory<typeof Gallery> = args => (
  <Gallery {...args} />
);

const files = [
  {
    key: "abc",
    name: "myballisbigandroundIamrollingitontheground.png",
    type: "image/png",
    size: 213402324,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "def",
    name: "iamanimage.png",
    type: "image/png",
    size: 124525234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "efg",
    name: "upanddown.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "jkl",
    name: "kramer.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "mno",
    name: "boston.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "pqr",
    name: "pizzaisgood.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "pQ=",
    name: "avatar.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "fGr",
    name: "whatevenisthat.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
  {
    key: "AM=",
    name: "stairs.png",
    type: "image/png",
    size: 233411234,
    progress: 1,
    src: "https://picsum.photos/250",
  },
];

export const Basic = BasicTemplate.bind({});
Basic.args = {
  files,
};

export const MaxFiles = BasicTemplate.bind({});
MaxFiles.args = {
  files,
  max: 3,
};
