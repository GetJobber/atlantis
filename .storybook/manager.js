import React from "react";
import { addons, types } from "@storybook/addons";
import { SidebarLabel } from "./components/SidebarLabel";
import theme from "./theme";
import favicon from "./assets/favicon.svg";
import { Playground } from "./components/Playground";

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
    renderLabel: SidebarLabel,
  },
});

addons.register("code/tab", () => {
  addons.add("code-tab", {
    type: types.TAB,
    title: "Code",
    route: ({ storyId, refId }) =>
      `/code/${[refId, storyId].filter(Boolean).join("_")}`,
    match: ({ viewMode }) => viewMode === "code",
    render: ({ key, active }) => <>{active && <Playground key={key} />}</>,
  });
});
