import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Heading } from "@jobber/components/Heading";
import { InputText } from "@jobber/components/InputText";
import { Card } from "@jobber/components/Card";

export default {
  title: "Components/Layouts and Structure/Content/Web",
  component: Content,
  parameters: {
    viewMode: "story",
    backgrounds: {
      default: "surface background",
    },
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Content>;

const BasicTemplate: ComponentStory<typeof Content> = args => (
  <Content {...args}>
    <Card title="About me">
      <Content tagName="section" {...args}>
        <Heading level={2}>Sign up!</Heading>
        <Text>
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
          vestibulum. Nulla vitae elit libero, a pharetra augue. Nullam quis
          risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta
          felis euismod semper. Curabitur blandit tempus porttitor.
        </Text>
        <InputText placeholder="Name" />
        <InputText placeholder="Phone" />
        <InputText placeholder="Email" />
        <InputText
          multiline={true}
          placeholder="Describe yourself"
          name="describeAge"
        />
      </Content>
    </Card>
  </Content>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  spacing: "small",
};
