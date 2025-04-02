import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tiles } from "@jobber/components/Tiles";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Rectangle } from "@jobber/components/Rectangle";

export default {
  title: "Components/Layouts and Structure/Tiles/Web",
  component: Tiles,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Tiles>;

const BasicTemplate: ComponentStory<typeof Tiles> = args => (
  <Tiles {...args}>
    <Card>
      <Rectangle>
        <Text>First tile</Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>Second tile</Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>Third tile</Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>Fourth tile</Text>
      </Rectangle>
    </Card>
  </Tiles>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  space: "base",
  minSize: "30ch",
};

export const CustomSpace = BasicTemplate.bind({});
CustomSpace.args = {
  space: "large",
  minSize: "30ch",
};

export const CustomMinSize = BasicTemplate.bind({});
CustomMinSize.args = {
  space: "base",
  minSize: "40ch",
};

const ContentTemplate: ComponentStory<typeof Tiles> = args => (
  <Tiles {...args}>
    <Card>
      <Rectangle>
        <Text>
          A tile with some longer content to demonstrate how the tiles adjust to
          content
        </Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>
          Another tile with varying content length to show the responsive grid
          layout
        </Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>Short tile</Text>
      </Rectangle>
    </Card>
    <Card>
      <Rectangle>
        <Text>
          This tile has enough content to potentially affect the layout of other
          tiles in the grid
        </Text>
      </Rectangle>
    </Card>
  </Tiles>
);

export const WithContent = ContentTemplate.bind({});
WithContent.args = {
  space: "base",
  minSize: "30ch",
};
