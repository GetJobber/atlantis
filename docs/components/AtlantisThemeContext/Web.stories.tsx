import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  AtlantisThemeContextProvider,
  updateTheme,
  useAtlantisTheme,
} from "@jobber/components/AtlantisThemeContext";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Flex } from "@jobber/components/Flex";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Themes/AtlantisThemeContext/Web",
  component: AtlantisThemeContextProvider,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof AtlantisThemeContextProvider>;

function ChildrenComponent({
  message = "It is possible to have multiple Atlantis Theme providers.",
}: {
  readonly message?: string;
}) {
  const { theme, tokens } = useAtlantisTheme();

  return (
    <Box background="surface" padding="base">
      <Content>
        <Text>{message}</Text>
        <Text size="small">Current theme {theme}</Text>
        <Text size="small">
          Tokens can be accessed using tokens[token-name]
        </Text>
        <Text size="small">
          For example color-surface: {tokens["color-surface"]}
        </Text>
        <Flex
          gap="base"
          align="center"
          direction="row"
          template={["grow", "grow"]}
        >
          <Button label="Set dark theme" onClick={() => updateTheme("dark")} />
          <Button
            label="Set light theme"
            onClick={() => updateTheme("light")}
          />
        </Flex>
      </Content>
    </Box>
  );
}

function SecondProviderUsage({
  message = "ThemeProviders can update the theme for all providers on a page. ",
}: {
  readonly message?: string;
}) {
  const { theme } = useAtlantisTheme();

  return (
    <Box background="surface" padding={"base"}>
      <Content>
        <Text>{message}</Text>
        <Text size="small">Current theme {theme}</Text>
        <div style={{ display: "flex", gap: "8px" }}>
          <InlineLabel color="red">Past due</InlineLabel>
          <InlineLabel color="red">Changes requested</InlineLabel>
          <InlineLabel color="yellow">Unscheduled</InlineLabel>
          <InlineLabel color="yellow">Awaiting response</InlineLabel>
          <InlineLabel color="green">Approved</InlineLabel>
          <InlineLabel color="green">Paid</InlineLabel>
          <InlineLabel color="greyBlue">Draft</InlineLabel>
          <InlineLabel color="greyBlue">Archived</InlineLabel>
          <InlineLabel color="lightBlue">Sent</InlineLabel>
          <InlineLabel color="lightBlue">Converted</InlineLabel>
        </div>
        <Flex
          gap="base"
          align="center"
          direction="row"
          template={["grow", "grow"]}
        >
          <Button
            label="Set dark theme in another provider"
            onClick={() => updateTheme("dark")}
          />
          <Button
            label="Set light theme in another provider"
            onClick={() => updateTheme("light")}
          />
        </Flex>
      </Content>
    </Box>
  );
}

const BasicTemplate: ComponentStory<
  typeof AtlantisThemeContextProvider
> = args => {
  return (
    <>
      <AtlantisThemeContextProvider {...args}>
        <ChildrenComponent />
      </AtlantisThemeContextProvider>
      <AtlantisThemeContextProvider>
        <SecondProviderUsage />
      </AtlantisThemeContextProvider>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
BasicTemplate.args = {};

const ForceThemeTemplate: ComponentStory<
  typeof AtlantisThemeContextProvider
> = args => {
  return (
    <>
      <AtlantisThemeContextProvider {...args}>
        <ChildrenComponent message="It is possible to have a provider ignore Theme Changes" />
      </AtlantisThemeContextProvider>
      <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
        <SecondProviderUsage message="This theme provider will always use the dark theme" />
      </AtlantisThemeContextProvider>
    </>
  );
};

export const ForceThemeForProvider = ForceThemeTemplate.bind({});
ForceThemeForProvider.args = {};

function OverrideTokensComponent({ message }: { readonly message: string }) {
  const { theme, tokens, overrideTokens } = useAtlantisTheme();
  const customBrandColor = overrideTokens?.["custom-brand-color"];

  return (
    <Box background="surface" padding="base">
      <Content>
        <Text>{message}</Text>
        <Text size="small">Current theme: {theme}</Text>
        <Text size="small">Original color-text: {tokens["color-text"]}</Text>
        <Text size="small">Original space-base: {tokens["space-base"]}</Text>
        <div style={{ backgroundColor: "var(--custom-brand-color)" }}>
          <Text size="small">Custom token example: {customBrandColor}</Text>
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <InlineLabel color="red">Notice the custom styling</InlineLabel>
          <InlineLabel color="green">With overridden tokens</InlineLabel>
          <InlineLabel color="lightBlue">Applied throughout</InlineLabel>
        </div>
        <Flex
          gap="base"
          align="center"
          direction="row"
          template={["grow", "grow"]}
        >
          <Button label="Test dark theme" onClick={() => updateTheme("dark")} />
          <Button
            label="Test light theme"
            onClick={() => updateTheme("light")}
          />
        </Flex>
      </Content>
    </Box>
  );
}

const OverrideTokensTemplate: ComponentStory<
  typeof AtlantisThemeContextProvider
> = args => {
  const customTokens = {
    "color-text": "hsl(280, 100%, 50%)",
    "color-critical--onSurface": "blue",
    "color-success--onSurface": "blue",
    "color-informative--onSurface": "blue",
    "color-interactive": "hsl(280, 100%, 50%)",
    "color-interactive--hover": "hsl(280, 85%, 37%)",
    "custom-brand-color": "hsl(120, 81%, 50%)",
  };

  return (
    <>
      <AtlantisThemeContextProvider
        {...args}
        dangerouslyOverrideTokens={customTokens}
      >
        <OverrideTokensComponent message="Provider with overridden tokens" />
      </AtlantisThemeContextProvider>
      <AtlantisThemeContextProvider
        dangerouslyOverrideTheme="dark"
        dangerouslyOverrideTokens={customTokens}
      >
        <OverrideTokensComponent message="Provider with overridden tokens - forced dark" />
      </AtlantisThemeContextProvider>
    </>
  );
};

export const OverrideTokens = OverrideTokensTemplate.bind({});
OverrideTokens.args = {};
