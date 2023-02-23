import React from "react";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { InlineCode } from "./components/InlineCode";
import { DocsWithSidebar } from "./components/DocsWithSidebar";

import "@jobber/design/foundation.css";
import "@jobber/fonts";

export const parameters = {
  viewMode: "docs",
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Components", "Design", "*"],
    },
  },
  docs: {
    components: {
      wrapper: props => <Content>{props.children}</Content>,
      h1: props => <Heading {...props} level={1} />,
      h2: props => <Heading {...props} level={2} />,
      h3: props => <Heading {...props} level={3} />,
      p: props => <Text {...props} />,
      inlineCode: props => <InlineCode {...props} />,
    },
    container: DocsWithSidebar,
  },
};
