import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Tab, Tabs } from "@jobber/components/Tabs";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Typography } from "@jobber/components/Typography";
import { Icon } from "@jobber/components/Icon";
import { StatusIndicator } from "@jobber/components/StatusIndicator";
import { Flex } from "@jobber/components/Flex";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Navigation/Tabs/Web",
  component: Tabs,
  subcomponents: { Tab },
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Tabs": ["Tabs", "Tab"],
        },
      },
    },
  },
} as Meta<typeof Tabs>;

const BasicTemplate: StoryFn<typeof Tab> = args => (
  <Tabs>
    <Tab {...args}>
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

const WithDefaultTabTemplate: StoryFn<typeof Tabs> = args => (
  <Tabs {...args}>
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

const WithTabChangeCallbackTemplate: StoryFn<typeof Tabs> = args => {
  const [tab, setTab] = useState(args.defaultTab ?? 0);

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

const WithCustomReactNodeTemplate: StoryFn<typeof Tabs> = () => {
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

const ControlledTemplate: StoryFn<typeof Tabs> = args => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <p>Active tab index: {activeTab}</p>
      <Tabs {...args} activeTab={activeTab} onTabChange={setActiveTab}>
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

const DynamicTabsTemplate: StoryFn<typeof Tab> = args => {
  const [showCheese, setShowCheese] = useState(false);

  const toggleCheese = () => {
    setShowCheese(!showCheese);
  };

  return (
    <Content>
      <Button onClick={toggleCheese}>Toggle Cheese Tab</Button>
      <Tabs>
        <Tab {...args}>
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

export const Basic = {
  render: BasicTemplate,

  args: {
    label: "Eggs",
  },
};
export const WithDefaultTab = {
  render: WithDefaultTabTemplate,

  args: {
    defaultTab: 1,
  },
};
export const WithTabChangeCallback = {
  render: WithTabChangeCallbackTemplate,

  args: {
    defaultTab: 1,
  },
};
export const WithCustomReactNode = {
  render: WithCustomReactNodeTemplate,
};
export const Controlled = {
  render: ControlledTemplate,
};
export const DynamicTabs = {
  render: DynamicTabsTemplate,

  args: {
    label: "Eggs",
  },
};
