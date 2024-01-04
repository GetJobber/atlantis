import React from "react";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { tokens } from "@jobber/design/foundation";
import { Header } from "./components/Header";
import { InlineCode } from "./components/InlineCode";
import { DocsWithSidebar } from "./components/DocsWithSidebar";
import { CustomCanvas } from "./components/CustomCanvas";
import { SBProvider } from "./components/SBProvider";
import { StoryDetails } from "./components/StoryDetails";

import "@jobber/design/foundation.css";
import "./assets/css/preview.css";
import { Unstyled } from "@storybook/addon-docs";

try {
  require("@jobber/fonts");
} catch {
  console.log("Jobber fonts not found");
}

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
      Canvas: CustomCanvas,
    },
    container: DocsWithSidebar,
  },
};

export const decorators = [
  Story => (
    <SBProvider>
      <Story />
    </SBProvider>
  ),
  (Story, context) => <StoryDetails Story={Story} context={context} />,
];
