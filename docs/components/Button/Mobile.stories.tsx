import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  AtlantisThemeContextProvider,
  Button,
  Theme,
} from "@jobber/components-native";

export default {
  title: "Components/Actions/Button/Mobile",
  component: Button,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Button>;

const BasicTemplate: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "New Job",
  onPress: () => alert("👍"),
};

export const Cancel = BasicTemplate.bind({});
Cancel.args = {
  label: "Cancel",
  variation: "cancel",
  onPress: () => alert("I have been cancelled"),
};

export const ThemeToggle: ComponentStory<typeof Button> = () => {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <AtlantisThemeContextProvider dangerouslyOverrideTheme={theme}>
      <Button
        label="Toggle Theme"
        onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </AtlantisThemeContextProvider>
  );
};
