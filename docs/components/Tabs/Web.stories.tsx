import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tab, Tabs } from "@jobber/components/Tabs";

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
} as ComponentMeta<typeof Tabs>;

const BasicTemplate: ComponentStory<typeof Tab> = args => (
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "Eggs",
};
