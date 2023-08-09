import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof Content>;

const BasicTemplate: ComponentStory<typeof Content> = args => (
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

export const Vertical = BasicTemplate.bind({});
Vertical.args = {
  direction: "vertical",
};

export const Horizontal = BasicTemplate.bind({});
Horizontal.args = {
  direction: "horizontal",
};
