import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureSwitch } from "@jobber/components/FeatureSwitch";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Selections/FeatureSwitch",
  component: FeatureSwitch,
} satisfies Meta<typeof FeatureSwitch>;
export default meta;
type FeatureSwitchStoryArgs = Pick<
  React.ComponentProps<typeof FeatureSwitch>,
  "title" | "description" | "hasSaveIndicator"
>;
type Story = StoryObj<FeatureSwitchStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  const [featureEnabled, setFeatureEnabled] = useState(true);

  function handleSwitch(newValue: boolean) {
    setFeatureEnabled(newValue);
  }

  return (
    <FeatureSwitch
      title={args?.title ?? "Quote follow-up"}
      description={
        args?.description ??
        "Send a notification to your client following up on an outstanding quote."
      }
      hasSaveIndicator={args?.hasSaveIndicator ?? true}
      enabled={featureEnabled}
      onSwitch={handleSwitch}
      onEdit={() => console.log("You clicked edit")}
    >
      <Text>Extra feature content and information</Text>
    </FeatureSwitch>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    title: "Quote follow-up",
    description:
      "Send a notification to your client following up on an outstanding quote.",
    hasSaveIndicator: true,
  },
};
