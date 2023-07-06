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
  header: "Company settings",
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

const CustomHeaderTemplate: ComponentStory<typeof Card> = args => (
  <Card
    header={
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "var(--card--base-padding)",
          gap: "var(--space-base)",
          alignItems: "center",
          backgroundColor: "var(--color-surface--reverse)",
        }}
      >
        <Heading level={2}>
          <span style={{ color: "var(--color-text--reverse)" }}>
            The Jobber App
          </span>
        </Heading>
        <Button
          onClick={() => alert("Dismiss")}
          icon="cross"
          type="secondary"
          variation="subtle"
          ariaLabel="Dismiss"
        />
      </div>
    }
    {...args}
  >
    <Content>
      <Text>
        Stay connected with your team in the field when you put the Jobber app
        in their hands.
      </Text>
      <Button label="Get It Now" fullWidth={true} />
    </Content>
  </Card>
);

export const CustomHeader = CustomHeaderTemplate.bind({});

const HeaderActionTemplate: ComponentStory<typeof Card> = () => (
  <Card
    header={{
      title: "The Jobber App",
      action: <Button label="Get It Now" />,
    }}
  >
    <Content>
      <Text>
        Stay connected with your team in the field when you put the Jobber app
        in their hands.
      </Text>
    </Content>
  </Card>
);

export const HeaderAction = HeaderActionTemplate.bind({});
