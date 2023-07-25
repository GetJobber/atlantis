import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ConfirmationModal } from "@jobber/components/ConfirmationModal";
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Should we?",
  message: `Let's do **something**!`,
};
