import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab, Tabs } from "@jobber/components/Tabs";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Typography } from "@jobber/components/Typography";
import { Icon } from "@jobber/components/Icon";
import { StatusIndicator } from "@jobber/components/StatusIndicator";
import { Flex } from "@jobber/components/Flex";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

interface TabsStoryArgs {
  defaultTab?: React.ComponentProps<typeof Tabs>["defaultTab"];
  label?: React.ComponentProps<typeof Tab>["label"];
}

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  subcomponents: { Tab },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<TabsStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <Tabs>
    <Tab label={args?.label ?? "Eggs"}>
      🍳 Some eggs are laid by female animals of many different species,
      including birds, reptiles, amphibians, mammals, and fish, and have been
      eaten by humans for thousands of years.
    </Tab>
    <Tab label="Cheese">
      🧀 Cheese is a dairy product derived from milk that is produced in a wide
      range of flavors, textures, and forms by coagulation of the milk protein
      casein.
    </Tab>
    <Tab label="Berries">
      🍓 A berry is a small, pulpy, and often edible fruit. Typically, berries
      are juicy, rounded, brightly colored, sweet, sour or tart, and do not have
      a stone or pit.
    </Tab>
  </Tabs>
);

const WithDefaultTabTemplate = (args: Story["args"]) => (
  <Tabs defaultTab={args?.defaultTab}>
    <Tab label="Eggs">
      🍳 Some eggs are laid by female animals of many different species,
      including birds, reptiles, amphibians, mammals, and fish, and have been
      eaten by humans for thousands of years.
    </Tab>
    <Tab label="Cheese">
      🧀 Cheese is a dairy product derived from milk that is produced in a wide
      range of flavors, textures, and forms by coagulation of the milk protein
      casein.
    </Tab>
    <Tab label="Berries">
      🍓 A berry is a small, pulpy, and often edible fruit. Typically, berries
      are juicy, rounded, brightly colored, sweet, sour or tart, and do not have
      a stone or pit.
    </Tab>
  </Tabs>
);

const WithTabChangeCallbackTemplate = (args: Story["args"]) => {
  const [tab, setTab] = useState(args?.defaultTab ?? 0);

  return (
    <div>
      <p>Active tab index: {tab}</p>
      <Tabs onTabChange={setTab}>
        <Tab label="Eggs">
          🍳 Some eggs are laid by female animals of many different species,
          including birds, reptiles, amphibians, mammals, and fish, and have
          been eaten by humans for thousands of years.
        </Tab>
        <Tab label="Cheese">
          🧀 Cheese is a dairy product derived from milk that is produced in a
          wide range of flavors, textures, and forms by coagulation of the milk
          protein casein.
        </Tab>
        <Tab label="Berries">
          🍓 A berry is a small, pulpy, and often edible fruit. Typically,
          berries are juicy, rounded, brightly colored, sweet, sour or tart, and
          do not have a stone or pit.
        </Tab>
      </Tabs>
    </div>
  );
};

const WithCustomReactNodeTemplate = () => {
  return (
    <Tabs>
      <Tab
        label={
          <Flex template={["shrink", "shrink"]} gap="small" align="center">
            <Typography element={"span"} fontWeight={"semiBold"}>
              Inline Label
            </Typography>
            <InlineLabel color="red">{"+99"}</InlineLabel>
          </Flex>
        }
      >
        Here is an example of using an Inline Label component in the Tab label!
      </Tab>
      <Tab
        label={
          <Flex
            template={["shrink", "shrink", "shrink"]}
            gap="small"
            align="center"
          >
            <Icon name={"happyFace"} />
            <Typography element={"span"} fontWeight={"semiBold"}>
              Icons
            </Typography>
            <Icon name={"thumbsUp"} />
          </Flex>
        }
      >
        Here is an example of using some Icon components in the tab label!
      </Tab>
      <Tab
        label={
          <Flex template={["shrink", "shrink"]} gap="small" align="center">
            <Typography element={"span"} fontWeight={"semiBold"}>
              Status Label
            </Typography>
            <StatusIndicator status={"informative"} />
          </Flex>
        }
      >
        Here is an example of using a Status Indicator component in the Tab
        label!
      </Tab>
    </Tabs>
  );
};

const ControlledTemplate = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <p>Active tab index: {activeTab}</p>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <Tab label="Eggs">
          🍳 Some eggs are laid by female animals of many different species,
          including birds, reptiles, amphibians, mammals, and fish, and have
          been eaten by humans for thousands of years.
        </Tab>
        <Tab label="Cheese">
          🧀 Cheese is a dairy product derived from milk that is produced in a
          wide range of flavors, textures, and forms by coagulation of the milk
          protein casein.
        </Tab>
        <Tab label="Berries">
          🍓 A berry is a small, pulpy, and often edible fruit. Typically,
          berries are juicy, rounded, brightly colored, sweet, sour or tart, and
          do not have a stone or pit.
        </Tab>
      </Tabs>
    </div>
  );
};

const DynamicTabsTemplate = (args: Story["args"]) => {
  const [showCheese, setShowCheese] = useState(false);

  const toggleCheese = () => {
    setShowCheese(!showCheese);
  };

  return (
    <Content>
      <Button onClick={toggleCheese}>Toggle Cheese Tab</Button>
      <Tabs>
        <Tab label={args?.label ?? "Eggs"}>
          🍳 Some eggs are laid by female animals of many different species,
          including birds, reptiles, amphibians, mammals, and fish, and have
          been eaten by humans for thousands of years.
        </Tab>
        {showCheese && (
          <Tab label="Cheese">
            🧀 Cheese is a dairy product derived from milk that is produced in a
            wide range of flavors, textures, and forms by coagulation of the
            milk protein casein.
          </Tab>
        )}
        <Tab label="Berries">
          🍓 A berry is a small, pulpy, and often edible fruit. Typically,
          berries are juicy, rounded, brightly colored, sweet, sour or tart, and
          do not have a stone or pit.
        </Tab>
      </Tabs>
    </Content>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    label: "Eggs",
  },
};

export const WithDefaultTab: Story = {
  render: WithDefaultTabTemplate,
  args: {
    defaultTab: 1,
  },
};

export const WithTabChangeCallback: Story = {
  render: WithTabChangeCallbackTemplate,
  args: {
    defaultTab: 1,
  },
};

export const WithCustomReactNode: Story = {
  render: WithCustomReactNodeTemplate,
};

export const Controlled: Story = {
  render: ControlledTemplate,
};

export const DynamicTabs: Story = {
  render: DynamicTabsTemplate,
  args: {
    label: "Eggs",
  },
};
