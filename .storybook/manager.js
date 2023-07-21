import React from "react";
import { addons, types } from "@storybook/addons";
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from '@storybook/core-events';
import { SidebarLabel } from "./components/SidebarLabel";
import theme from "./theme";
import favicon from "./assets/favicon.svg";
import { Playground } from "./components/Playground";
import ReactGA from "react-ga4";

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
  addons.add("code", {
    type: types.TAB,
    title: "Code",
    route: ({ storyId, refId }) =>
      `/code/${[refId, storyId].filter(Boolean).join("_")}`,
    match: ({ viewMode }) => viewMode === "code",
    render: ({ key, active }) => <>{active && <Playground key={key} />}</>,
  });
});

addons.register('google-analytics', (api) => {
  ReactGA.initialize("G-V1N3TQVQB5");

  api.on(STORY_CHANGED, () => {
    const { title, name } = api.getCurrentStoryData();
    const { path, viewMode } = api.getUrlState();
    ReactGA.send({ hitType: "pageview", page: path, title: `${title} - ${name} - ${viewMode}` });
  });

  api.on(STORY_ERRORED, ({ description }) => {
    ReactGA.event({
      category: "story error",
      action: description,
    });
  });

  api.on(STORY_MISSING, (id) => {
    ReactGA.event({
      action: `attempted to render ${id}, but it is missing`,
      category: "story missing",
    });
  });
});
