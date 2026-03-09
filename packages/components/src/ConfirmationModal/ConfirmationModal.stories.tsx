import type { ComponentProps } from "react";
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
type Story = StoryObj<typeof ConfirmationModal>;
type ConfirmationModalProps = ComponentProps<typeof ConfirmationModal>;

const BasicTemplate = (args: Story["args"]) => {
  const [open, setOpen] = useState(false);
  const modalArgs = (args ?? {}) as Partial<ConfirmationModalProps>;
  const modalProps: ConfirmationModalProps = {
    title: modalArgs.title,
    message: modalArgs.message ?? `Let's do **something**!`,
    cancelLabel: modalArgs.cancelLabel,
    variation: modalArgs.variation,
    size: modalArgs.size,
    open,
    confirmLabel: "Do it",
    onConfirm: () => alert("✅"),
    onCancel: () => alert("🙅‍♂️"),
    onRequestClose: () => setOpen(false),
  };

  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} />
      <ConfirmationModal {...modalProps} />
    </>
  );
};

const ControlledTemplate = (args: Story["args"]) => {
  const modalArgs = (args ?? {}) as Partial<ConfirmationModalProps>;
  const modalProps: ConfirmationModalProps = {
    title: modalArgs.title,
    message: modalArgs.message ?? "Should we do this?",
    confirmLabel: modalArgs.confirmLabel,
    cancelLabel: modalArgs.cancelLabel,
    variation: modalArgs.variation,
    size: modalArgs.size,
    onConfirm: modalArgs.onConfirm,
    onCancel: modalArgs.onCancel,
    onRequestClose: modalArgs.onRequestClose,
  };
  const confirmationModalRef = useRef<ConfirmationModalRef | null>(null);
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
      <ConfirmationModal {...modalProps} ref={confirmationModalRef} />
    </>
  );
};

const DestructiveTemplate = (args: Story["args"]) => {
  const [open, setOpen] = useState(false);
  const modalArgs = (args ?? {}) as Partial<ConfirmationModalProps>;
  const modalProps: ConfirmationModalProps = {
    title: modalArgs.title ?? "Delete Bob?",
    message:
      modalArgs.message ??
      `Deleting Bob will remove their data from your account for good.`,
    cancelLabel: modalArgs.cancelLabel,
    variation: modalArgs.variation ?? "destructive",
    size: modalArgs.size,
    open,
    confirmLabel: "Delete Bob",
    onConfirm: () => alert("Bob has been deleted"),
    onCancel: () => alert("Bob will not be deleted"),
    onRequestClose: () => setOpen(false),
  };

  return (
    <>
      <Button
        label="Delete Bob"
        variation="destructive"
        type="secondary"
        onClick={() => setOpen(true)}
      />
      <ConfirmationModal {...modalProps} />
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
