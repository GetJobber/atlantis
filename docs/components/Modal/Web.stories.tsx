import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Modal } from "@jobber/components/Modal";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Tab, Tabs } from "@jobber/components/Tabs";

export default {
  title: "Components/Overlays/Modal/Web",
  component: Modal,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Modal>;

const BasicTemplate: ComponentStory<typeof Modal> = args => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal
        {...args}
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <Content>
          <Text>It&apos;s harder, better, faster, and stronger! 🤖</Text>
        </Content>
      </Modal>
      <Button label="Open Modal" onClick={() => setModalOpen(true)} />
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "We've updated Jobber",
};

const ActionTemplate: ComponentStory<typeof Modal> = args => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal
        {...args}
        open={modalOpen}
        primaryAction={{ label: "Submit", onClick: handlePrimaryAction }}
        secondaryAction={{
          label: "Cancel",
          onClick: handleSecondaryAction,
        }}
        tertiaryAction={{ label: "Delete", onClick: handleTertiaryAction }}
        onRequestClose={toggleModal}
      >
        <Tabs>
          <Tab label="this is a test">
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
          <Tab label="this is a test">
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
          <Tab label="this is a test">
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
      </Modal>
      <Button label="Open Modal" onClick={toggleModal} />
    </>
  );

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function handlePrimaryAction() {
    setModalOpen(false);
  }

  function handleSecondaryAction() {
    setModalOpen(false);
  }

  function handleTertiaryAction() {
    alert("❌");
  }
};

export const ActionTypes = ActionTemplate.bind({});
ActionTypes.args = {
  title: "Atlantis Modals are Action Packed!",
};
