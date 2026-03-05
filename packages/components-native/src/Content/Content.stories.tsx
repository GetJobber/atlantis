import React from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Card, Content, Text } from "@jobber/components-native";

export default {
  title: "Components/Layouts and Structure/Content/Mobile",
  component: Content,
  parameters: {
    viewMode: "story",
    backgrounds: {
      default: "surface background",
    },
    viewport: { defaultViewport: "mobile1" },
    previewTabs: { code: { hidden: false } },
  },
} satisfies Meta<typeof Content>;

const BasicTemplate: StoryFn<typeof Content> = args => (
  <Card>
    <Content {...args}>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam
        neque quam nemo dolores illo eaque qui possimus consequuntur libero.
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam
        neque quam nemo dolores illo eaque qui possimus consequuntur libero.
      </Text>
    </Content>
  </Card>
);

export const Vertical = {
  render: BasicTemplate,
  args: {
    direction: "vertical",
  },
};
export const Horizontal = {
  render: BasicTemplate,
  args: {
    direction: "horizontal",
  },
};
