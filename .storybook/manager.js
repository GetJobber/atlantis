import { addons } from "@storybook/addons";
import React, { useEffect, useRef } from "react";
import { useStorybookApi } from "@storybook/api";
import theme from "./theme";
import favicon from "./assets/favicon.svg";
import "./assets/css/manager.css";
import "@jobber/design/foundation.css";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

addons.setConfig({
  theme,
  sidebar: {
    collapsedRoots: [
      "components",
      "design",
      "content",
      "guides",
      "hooks",
      "packages",
      "changelog",
    ],
    renderLabel: label => {
      const { selectStory } = useStorybookApi();
      const ref = useRef();
      useEffect(() => {
        if (
          label.id.startsWith("components") &&
          label.depth === 1 &&
          ref.current?.parentElement?.getAttribute("aria-expanded") !== "true"
        ) {
          ref.current?.parentElement?.click();
        }
      }, []);

      return (
        <span ref={ref} onClick={handleClick}>
          {label.name}
        </span>
      );

      function handleClick(event) {
        if (
          label.type === "group" &&
          label.depth > 1 &&
          label.children?.length
        ) {
          event.stopPropagation();
          selectStory(label.children[0]);
        }
      }
    },
  },
});
