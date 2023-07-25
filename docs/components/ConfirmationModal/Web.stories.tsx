import React, { Ref, useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ConfirmationModal,
  ConfirmationModalRef,
} from "@jobber/components/ConfirmationModal";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Overlays/ConfirmationModal/Web",
  component: ConfirmationModal,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof ConfirmationModal>;

const BasicTemplate: ComponentStory<typeof ConfirmationModal> = args => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} />
      <ConfirmationModal
        {...args}
        open={open}
        confirmLabel="Do it"
        onConfirm={() => alert("✅")}
        onCancel={() => alert("🙅‍♂️")}
        onRequestClose={() => setOpen(false)}
      />
    </>
  );
};

const ControlledTemplate: ComponentStory<typeof ConfirmationModal> = args => {
  const confirmationModalRef = useRef<ConfirmationModalRef>();
  const users = [
    {
      id: 1,
      name: "Bob",
    },
    {
      id: 2,
      name: "Donald",
    },
  ];
  return (
    <>
      {users.map(user => {
        return (
          <Button
            label={`Confirm ${user.name}`}
            key={user.id}
            onClick={() =>
              confirmationModalRef.current.show({
                title: "Should we?",
                message: `Hang out with **${user.name}**?`,
                confirmLabel: "Hangout",
                onConfirm: () => alert("✅"),
              })
            }
          />
        );
      })}
      <ConfirmationModal
        {...args}
        ref={confirmationModalRef as Ref<ConfirmationModalRef>}
      />
    </>
  );
};

const DestructiveTemplate: ComponentStory<typeof ConfirmationModal> = args => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        label="Delete Bob"
        variation="destructive"
        type="secondary"
        onClick={() => setOpen(true)}
      />
      <ConfirmationModal
        {...args}
        open={open}
        confirmLabel="Delete Bob"
        onConfirm={() => alert("Bob has been deleted")}
        onCancel={() => alert("Bob will not be deleted")}
        onRequestClose={() => setOpen(false)}
      />
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Should we?",
  message: `Let's do **something**!`,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  title: "Should we?",
};

export const Destructive = DestructiveTemplate.bind({});
Destructive.args = {
  title: "Delete Bob?",
  message: `Deleting Bob will remove their data from your account for good.`,
  variation: "destructive",
};
