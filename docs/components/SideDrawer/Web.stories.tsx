import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SideDrawer } from "@jobber/components/SideDrawer";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { List } from "@jobber/components/List";
import { Heading } from "@jobber/components/Heading";
import { Tab, Tabs } from "@jobber/components/Tabs";

export default {
  title: "Components/Overlays/SideDrawer/Web",
  component: SideDrawer,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: { hidden: false },
      extraImports: {
        "@jobber/components/Tabs": ["Tabs", "Tab"],
      },
    },
  },
} as ComponentMeta<typeof SideDrawer>;

const BasicTemplate: ComponentStory<typeof SideDrawer> = args => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(args.open);

  return (
    <>
      <Button
        onClick={() => setSideDrawerOpen(true)}
        label="Open Side Drawer"
      />
      <SideDrawer
        open={sideDrawerOpen}
        onRequestClose={() => setSideDrawerOpen(false)}
      >
        <SideDrawer.Title>Side Drawers are here</SideDrawer.Title>

        <Content>
          <Text>You can add a text content.</Text>

          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            obcaecati debitis animi ullam dicta consectetur, dolorem nemo itaque
            enim aperiam!
          </Text>
        </Content>

        <Content>
          <Heading level={3}>Or a List</Heading>
        </Content>

        <List
          items={[
            {
              id: 1,
              icon: "wallet",
              iconColor: "orange",
              content: "Payment for Invoice #39",
              value: "-$300.00",
              caption: "Sep 25, 2019",
              onClick: function onClick() {
                return alert("TODO: Implement onClick");
              },
            },
            {
              id: 3,
              icon: "paidInvoice",
              content: "Invoice #39",
              value: "$300.00",
              caption: "Sep 24, 2019",
              onClick: function onClick() {
                return alert("TODO: Implement onClick");
              },
            },
          ]}
        />

        <Content>
          <Heading level={3}>Even tabs</Heading>
        </Content>

        <Tabs>
          <Tab label={"Eggs"}>
            🍳 Some eggs are laid by female animals of many different species,
            including birds, reptiles, amphibians, mammals, and fish, and have
            been eaten by humans for thousands of years.
          </Tab>
          <Tab label="Cheese">
            🧀 Cheese is a dairy product derived from milk that is produced in a
            wide range of flavors, textures, and forms by coagulation of the
            milk protein casein.
          </Tab>
          <Tab label="Berries">
            🍓 A berry is a small, pulpy, and often edible fruit. Typically,
            berries are juicy, rounded, brightly colored, sweet, sour or tart,
            and do not have a stone or pit.
          </Tab>
        </Tabs>
      </SideDrawer>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  open: true,
};
