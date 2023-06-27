import { addons } from "@storybook/addons";
import theme from "./theme";
import favicon from "./assets/favicon.svg";
import React from "react";
import { useEffect } from "react";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

addons.setConfig({
  theme,
  sidebar: {
    renderLabel: (api) => {
      const ref = React.useRef();
        useEffect(() => {
          if (api.id.startsWith("components")
            && api.depth === 1
            && ref.current?.parentElement?.getAttribute("aria-expanded") !== "true") {
            ref.current?.click()
          }
        }, [])

      return <span ref={ref}>{api.name}</span>;
    },
  }
});
