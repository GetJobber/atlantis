import type { Ref } from "react";
import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ConfirmationModalRef } from "@jobber/components/ConfirmationModal";
import { ConfirmationModal } from "@jobber/components/ConfirmationModal";
import { Button } from "@jobber/components/Button";

const meta = {
  title: "Components/Overlays/ConfirmationModal",
  component: ConfirmationModal,
} satisfies Meta<typeof ConfirmationModal>;
export default meta;

interface ConfirmationModalStoryArgs {
  title?: string;
  message?: string;
  cancelLabel?: string;
  variation?: "work" | "destructive";
  size?: "small" | "large";
}

type Story = StoryObj<ConfirmationModalStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  const [open, setOpen] = useState(false);
  const { title, message = "", cancelLabel, variation, size } = args ?? {};

  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} />
      <ConfirmationModal
        open={open}
        title={title}
        message={message}
        confirmLabel="Do it"
        cancelLabel={cancelLabel}
        variation={variation}
        size={size}
        onConfirm={() => alert("✅")}
        onCancel={() => alert("🙅‍♂️")}
        onRequestClose={() => setOpen(false)}
      />
    </>
  );
};

const ControlledTemplate = (args: Story["args"]) => {
  const confirmationModalRef = useRef<ConfirmationModalRef | null>(null);
  const { title, cancelLabel, variation, size } = args ?? {};
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
              confirmationModalRef.current?.show({
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
        title={title}
        cancelLabel={cancelLabel}
        variation={variation}
        size={size}
        ref={confirmationModalRef as Ref<ConfirmationModalRef>}
      >
        {null}
      </ConfirmationModal>
    </>
  );
};

const DestructiveTemplate = (args: Story["args"]) => {
  const [open, setOpen] = useState(false);
  const { title, message = "", cancelLabel, variation, size } = args ?? {};

  return (
    <>
      <Button
        label="Delete Bob"
        variation="destructive"
        type="secondary"
        onClick={() => setOpen(true)}
      />
      <ConfirmationModal
        open={open}
        title={title}
        message={message}
        confirmLabel="Delete Bob"
        cancelLabel={cancelLabel}
        variation={variation}
        size={size}
        onConfirm={() => alert("Bob has been deleted")}
        onCancel={() => alert("Bob will not be deleted")}
        onRequestClose={() => setOpen(false)}
      />
    </>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    title: "Should we?",
    message: `Let's do **something**!`,
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    title: "Should we?",
  },
};

export const Destructive: Story = {
  render: DestructiveTemplate,
  args: {
    title: "Delete Bob?",
    message: `Deleting Bob will remove their data from your account for good.`,
    variation: "destructive",
  },
};
