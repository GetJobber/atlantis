import React from "react";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { AtlantisThemeContextProvider, updateTheme } from "@jobber/components/AtlantisThemeContext";
import { tokens } from "@jobber/design/foundation";
import { Header } from "./components/Header";
import { InlineCode } from "./components/InlineCode";
import { DocsWithSidebar } from "./components/DocsWithSidebar";
import { CustomCanvas } from "./components/CustomCanvas";
import { SBProvider } from "./components/SBProvider";
import { StoryDetails } from "./components/StoryDetails";

import "@jobber/design/foundation.css";
import "@jobber/design/dark.mode.css";
import "./assets/css/preview.css";
import { Unstyled } from "@storybook/addon-docs";
import { Table } from "@storybook/components";

export const parameters = {
  viewMode: "docs",
  previewTabs: { code: { hidden: true } },
  controls: {
    expanded: true,
    sort: "alpha",
  },
  backgrounds: {
    default: "surface",
    values: [
      {
        name: "surface",
        value: tokens["color-surface"],
      },
      {
        name: "surface background",
        value: tokens["color-surface--background"],
      },
      {
        name: "dark",
        value: tokens["color-surface--reverse"],
      },
    ],
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Introduction", "Components", "Design", "*", "Changelog"],
    },
  },
  docs: {
    components: {
      wrapper: props => <Unstyled><Content>{props.children}</Content></Unstyled>,
      h1: props => <Header {...props} level={1} />,
      h2: props => <Header {...props} level={2} isTOC />,
      h3: props => <Header {...props} level={3} />,
      h4: props => <Header {...props} level={4} />,
      h5: props => <Header {...props} level={5} />,
      p: props => <Text {...props} />,
      inlineCode: props => <InlineCode {...props} />,
      table: props => <Table {...props} />,
      Canvas: CustomCanvas,
    },
    container: DocsWithSidebar,
  },
};

export const decorators = [
  Story => (
    <div style={{ backgroundColor: 'var(--color-surface)' }}>
      <SBProvider>
        <Story />
      </SBProvider>
    </div>
  ),
  (Story, context) =>
    <div style={{ backgroundColor: 'var(--color-surface)' }}>
      <StoryDetails Story={Story} context={context} />
    </div>
  ,
  (Story) => {
    // @ts-ignore this is injected so that ToggleTheme.tsx can update the iframe theme
    window.updateTheme = updateTheme;
    return (
      <AtlantisThemeContextProvider>
        <Story />
      </AtlantisThemeContextProvider>
    );
  }
];
