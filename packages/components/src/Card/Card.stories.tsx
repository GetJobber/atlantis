import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
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

const meta = {
  title: "Components/Layouts and Structure/Card",
  component: Card,
} satisfies Meta<typeof Card>;
export default meta;

type BaseCardStoryProps = Omit<
  React.ComponentProps<typeof Card>,
  "children"
> & {
  children?: React.ReactNode;
};

type BaseCardArgs = BaseCardStoryProps & {
  url?: never;
  onClick?: never;
  external?: never;
};

type LinkCardArgs = BaseCardStoryProps & {
  url: string;
  external?: boolean;
  onClick?: never;
};

type ClickCardArgs = BaseCardStoryProps & {
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void;
  url?: never;
  external?: never;
};

type BaseStory = StoryObj<BaseCardArgs>;
type LinkStory = StoryObj<LinkCardArgs>;
type ClickStory = StoryObj<ClickCardArgs>;

const BasicTemplate = (args: BaseStory["args"]) => (
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

const LinkTemplate = (args: LinkStory["args"]) => {
  const linkProps = args as LinkCardArgs;

  return (
    <Card {...linkProps}>
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
};

const ClickTemplate = (args: ClickStory["args"]) => (
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

export const Basic: BaseStory = {
  render: BasicTemplate,
  args: {
    header: "Company settings",
  },
};

export const WithURL: LinkStory = {
  render: LinkTemplate,
  args: {
    url: "/",
  },
};

export const WithOnClick: ClickStory = {
  render: ClickTemplate,
  args: {
    onClick: e => {
      alert("😻");
      console.log(e.currentTarget);
    },
  },
};

export const WithElevation: BaseStory = {
  render: BasicTemplate,
  args: {
    header: "Company settings",
    elevation: "base",
  },
};

const WithAccentTemplate = (args: BaseStory["args"]) => (
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

export const WithAccent: BaseStory = {
  render: WithAccentTemplate,
  args: {
    header: "Company settings",
    accent: "indigoLight",
  },
};

const CustomHeaderTemplate = (args: BaseStory["args"]) => (
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

export const CustomHeader: BaseStory = {
  render: CustomHeaderTemplate,
};

const HeaderActionTemplate = () => (
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

export const HeaderAction: BaseStory = {
  render: HeaderActionTemplate,
};

const CompoundComponentTemplate = (args: BaseStory["args"]) => (
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

export const CompoundComponent: BaseStory = {
  render: CompoundComponentTemplate,
  args: {
    elevation: "base",
  },
};
