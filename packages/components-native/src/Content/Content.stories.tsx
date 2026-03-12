import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Card, Content, Text } from "@jobber/components-native";

const meta = {
  title: "Components/Layouts and Structure/Content",
  component: Content,
  args: {
    children: null,
  },
  parameters: {
    backgrounds: {
      default: "surface background",
    },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Content>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => (
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

export const Vertical: Story = {
  render: BasicTemplate,
  args: {
    direction: "vertical",
  },
};

export const Horizontal: Story = {
  render: BasicTemplate,
  args: {
    direction: "horizontal",
  },
};
