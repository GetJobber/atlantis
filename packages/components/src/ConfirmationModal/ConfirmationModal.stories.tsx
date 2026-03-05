import type { Ref } from "react";
import React, { useRef, useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type { ConfirmationModalRef } from "@jobber/components/ConfirmationModal";
import { ConfirmationModal } from "@jobber/components/ConfirmationModal";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Overlays/ConfirmationModal/Web",
  component: ConfirmationModal,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof ConfirmationModal>;

const BasicTemplate: StoryFn<typeof ConfirmationModal> = args => {
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

const ControlledTemplate: StoryFn<typeof ConfirmationModal> = args => {
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

const DestructiveTemplate: StoryFn<typeof ConfirmationModal> = args => {
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

export const Basic = {
  render: BasicTemplate,
  args: {
    title: "Should we?",
    message: `Let's do **something**!`,
  },
};
export const Controlled = {
  render: ControlledTemplate,
  args: {
    title: "Should we?",
  },
};
export const Destructive = {
  render: DestructiveTemplate,
  args: {
    title: "Delete Bob?",
    message: `Deleting Bob will remove their data from your account for good.`,
    variation: "destructive",
  },
};
