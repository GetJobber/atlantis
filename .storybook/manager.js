import React from "react";
import { addons, types } from "@storybook/addons";
import theme from "./theme";
import favicon from "./assets/favicon.svg";
import { Playground } from "./components/Playground";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

addons.setConfig({
  theme,
});

addons.register("playground/tab", () => {
  addons.add("playground-tab", {
    type: types.TAB,
    title: "Playground",
    route: ({ storyId, refId }) =>
      `/playground/${[refId, storyId].filter(Boolean).join("_")}`,
    match: ({ viewMode }) => viewMode === "playground",
    render: ({ key, active }) => <>{active && <Playground key={key} />}</>,
  });
});
