import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FeatureSwitch } from "@jobber/components/FeatureSwitch";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Selections/FeatureSwitch/Web",
  component: FeatureSwitch,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof FeatureSwitch>;

const BasicTemplate: ComponentStory<typeof FeatureSwitch> = args => {
  const [featureEnabled, setFeatureEnabled] = useState(true);
  function handleSwitch(newValue) {
    setFeatureEnabled(newValue);
  }
  return (
    <FeatureSwitch
      {...args}
      enabled={featureEnabled}
      onSwitch={handleSwitch}
      onEdit={() => console.log("You clicked edit")}
    >
      <Text>Extra feature content and information</Text>
    </FeatureSwitch>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "Quote follow-up",
  description:
    "Send a notification to your client following up on an outstanding quote.",
  hasSaveIndicator: true,
};
