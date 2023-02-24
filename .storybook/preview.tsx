import React from "react";
import { Header } from "./components/Header";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { InlineCode } from "./components/InlineCode";
import { DocsWithSidebar } from "./components/DocsWithSidebar";

import "@jobber/design/foundation.css";
import "@jobber/fonts";
import "./assets/css/preview.css";

export const parameters = {
  viewMode: "docs",
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Introduction", "Components", "Design", "*"],
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
    },
    container: DocsWithSidebar,
  },
};
