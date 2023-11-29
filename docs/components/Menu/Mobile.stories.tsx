import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Menu } from "@jobber/components-native";
import { IconNames } from "@jobber/design";

export default {
  title: "Components/Navigation/Menu/Mobile",
  component: Menu,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as ComponentMeta<typeof Menu>;

const BasicTemplate: ComponentStory<typeof Menu> = args => {
  const [selected, setSelected] = useState(0);

  const menuOptions = [
    {
      label: "Option one",
      icon: selected === 1 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(1),
    },
    {
      label: "Option two",
      icon: selected === 2 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(2),
    },
    {
      label: "Option three",
      icon: selected === 3 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(3),
    },
  ];

  return <Menu {...args} menuOptions={menuOptions} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
