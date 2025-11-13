import React from "react";
import { View } from "react-native";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  AtlantisThemeContextProvider,
  Button,
  Content,
  Text,
  useAtlantisTheme,
} from "@jobber/components-native";

export default {
  title: "Components/Contexts/AtlantisThemeContext/Mobile",
  component: AtlantisThemeContextProvider,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof AtlantisThemeContextProvider>;

function ChildrenComponent({
  message = "It is possible to have multiple Atlantis Theme providers.",
}: {
  readonly message?: string;
}) {
  const { theme, tokens, setTheme } = useAtlantisTheme();

  return (
    <View
      style={{
        backgroundColor: tokens["color-surface"],
      }}
    >
      <Content>
        <Text>{message}</Text>
        <Text>{`Current theme: ${theme}`}</Text>
        <Text>Tokens can be accessed using tokens[token-name]</Text>
        <Text>{`For example color-surface: ${tokens["color-surface"]}`}</Text>
        <Button label="Set dark theme" onPress={() => setTheme("dark")} />
        <Button label="Set light theme" onPress={() => setTheme("light")} />
      </Content>
    </View>
  );
}

function ForcedDarkThemeComponent() {
  const { tokens } = useAtlantisTheme();

  return (
    <View
      style={{
        backgroundColor: tokens["color-surface"],
      }}
    >
      <Content>
        <Text>This will always be a dark theme</Text>
      </Content>
    </View>
  );
}

const BasicTemplate: ComponentStory<
  typeof AtlantisThemeContextProvider
> = args => {
  return (
    <AtlantisThemeContextProvider {...args}>
      <ChildrenComponent />
    </AtlantisThemeContextProvider>
  );
};

export const Basic = BasicTemplate.bind({});
BasicTemplate.args = {};

const ForceThemeTemplate: ComponentStory<
  typeof AtlantisThemeContextProvider
> = args => {
  return (
    <AtlantisThemeContextProvider {...args}>
      <ChildrenComponent message="It is possible to have a provider ignore Theme Changes" />
      <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
        <ForcedDarkThemeComponent />
      </AtlantisThemeContextProvider>
    </AtlantisThemeContextProvider>
  );
};

export const ForceThemeForProvider = ForceThemeTemplate.bind({});
ForceThemeForProvider.args = {};
