import React from "react";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { Header } from "./components/Header";
import { InlineCode } from "./components/InlineCode";
import { DocsWithSidebar } from "./components/DocsWithSidebar";
import { CustomCanvas } from "./components/CustomCanvas";

import "@jobber/design/foundation.css";
import "./assets/css/preview.css";

try {
  require("@jobber/fonts");
} catch {
  console.log("Jobber fonts not found");
}

export const parameters = {
  viewMode: "docs",
  controls: {
    expanded: true,
    sort: "alpha",
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Introduction", "Components", "Design", "*", "Changelog"],
    },
  },
  docs: {
    components: {
      wrapper: props => <Content>{props.children}</Content>,
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
