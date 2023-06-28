import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Heading } from "@jobber/components/Heading";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Layouts and Structure/Card/Web",
  component: Card,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof Card>;

const Template1: ComponentStory<typeof Card> = args => (
  <Card {...args}>
    <Content>
      <Heading level={4}>Details</Heading>
      <InputGroup>
        <InputText defaultValue="Quest Provider" placeholder="Company name" />
        <InputText placeholder="Years in business" />
      </InputGroup>
      <Heading level={4}>Contact</Heading>
      <InputGroup>
        <InputText
          prefix={{
            icon: "phone",
          }}
          placeholder="Phone number"
        />
        <InputText
          prefix={{
            icon: "presentation",
          }}
          placeholder="Website"
        />
        <InputText
          prefix={{
            icon: "email",
          }}
          placeholder="Email"
        />
      </InputGroup>
    </Content>
  </Card>
);

const Template2: ComponentStory<typeof Card> = args => (
  <Card {...args}>
    <Content>
      <Heading level={4}>View all</Heading>
      <Text>
        See how our 20+ features can help you organize, impress, and grow.
      </Text>
    </Content>
  </Card>
);

export const Default = Template1.bind({});
Default.args = {
  header: {
    title: "Company settings",
    action: <Button label="Add New Setting" />,
  },
};

export const WithURL = Template2.bind({});
WithURL.args = {
  url: "/",
};

export const WithOnClick = Template2.bind({});
WithOnClick.args = {
  onClick: e => {
    alert("😻");
    console.log(e.currentTarget);
  },
};
