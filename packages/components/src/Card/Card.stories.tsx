import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Heading } from "@jobber/components/Heading";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { Icon } from "@jobber/components/Icon";
import { Flex } from "@jobber/components/Flex";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Card/Web",
  component: Card,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Card>;

const BasicTemplate: StoryFn<typeof Card> = args => (
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

const ClickTemplate: StoryFn<typeof Card> = args => (
  <Card {...args}>
    <Content>
      <Flex template={["grow", "shrink"]} align="start">
        <Heading level={4}>View all</Heading>
        <Icon size="small" name="arrowRight" />
      </Flex>
      <Text>
        See how our 20+ features can help you organize, impress, and grow.
      </Text>
    </Content>
  </Card>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    header: "Company settings",
  },
};
export const WithURL = {
  render: ClickTemplate,
  args: {
    url: "/",
  },
};
export const WithOnClick = {
  render: ClickTemplate,
  args: {
    onClick: e => {
      alert("😻");
      console.log(e.currentTarget);
    },
  },
};
export const WithElevation = {
  render: BasicTemplate,
  args: {
    header: "Company settings",
    elevation: "base",
  },
};
const WithAccentTemplate: StoryFn<typeof Card> = args => (
  <div
    style={{
      maxWidth: "700px",
      overflow: "auto",
    }}
  >
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
  </div>
);

export const WithAccent = {
  render: WithAccentTemplate,
  args: {
    header: "Company settings",
    accent: "indigoLight",
  },
};
const CustomHeaderTemplate: StoryFn<typeof Card> = args => (
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

export const CustomHeader = {
  render: CustomHeaderTemplate,
};
const HeaderActionTemplate: StoryFn<typeof Card> = () => (
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

export const HeaderAction = {
  render: HeaderActionTemplate,
};
const CompoundComponentTemplate: StoryFn<typeof Card> = args => (
  <Card {...args}>
    <Card.Header>
      <Box padding="base">
        <Flex template={["grow", "shrink"]} align="start">
          <Heading level={4}>Company settings</Heading>
          <Button type="tertiary" icon="cog" ariaLabel="Settings" />
        </Flex>
      </Box>
    </Card.Header>
    <Card.Body>
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
    </Card.Body>
  </Card>
);

export const CompoundComponent = {
  render: CompoundComponentTemplate,
  args: {
    elevation: "base",
  },
};
