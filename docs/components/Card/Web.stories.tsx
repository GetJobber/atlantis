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
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Card>;

const BasicTemplate: ComponentStory<typeof Card> = args => (
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

const ClickTemplate: ComponentStory<typeof Card> = args => (
  <Card {...args}>
    <Content>
      <Heading level={4}>View all</Heading>
      <Text>
        See how our 20+ features can help you organize, impress, and grow.
      </Text>
    </Content>
  </Card>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  header: {
    title: "Company settings",
    action: <Button label="Add New Setting" />,
  },
};

export const WithURL = ClickTemplate.bind({});
WithURL.args = {
  url: "/",
};

export const WithOnClick = ClickTemplate.bind({});
WithOnClick.args = {
  onClick: e => {
    alert("😻");
    console.log(e.currentTarget);
  },
};

export const CustomHeader = BasicTemplate.bind({});
CustomHeader.args = {
  header: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "var(--card--base-padding)",
        gap: "var(--space-base)",
        alignItems: "center",
      }}
    >
      <Heading level={2}>My Form</Heading>
      <Button
        onClick={() => alert("Dismiss")}
        icon="cross"
        type="tertiary"
        ariaLabel="Dismiss"
      />
    </div>
  ),
};
