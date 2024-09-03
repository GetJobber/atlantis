import React, { useEffect } from "react";
import { addons, types } from "@storybook/addons";
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from '@storybook/core-events';
import {lightTheme} from "./theme";
import favicon from "./assets/favicon.svg";
import { Playground } from "./components/Playground";
import ReactGA from "react-ga4";
import {ToggleTheme} from './components/ToggleTheme/ToggleTheme';

import "./assets/css/manager.css";
import "@jobber/design/foundation.css";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);


addons.setConfig({
  theme:lightTheme,
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
  },
});
addons.register('atlantis-theme-toggle', (api) => {
  addons.add('atlantis-theme-toggle-home',{
    title: 'Toggle Theme',
    type: types.TOOL,
    match:({viewMode}) => viewMode === 'story' || viewMode === 'docs',
    render: () => <ToggleTheme api={api} />
  })
})

addons.register("code/tab", () => {
  addons.add("code", {
    type: types.TAB,
    title: "Code",
    route: ({ storyId, refId, ...other }) =>
      `/code/${[refId, storyId].filter(Boolean).join("_")}`,
    match: ({ viewMode }) => viewMode === "code",
    render: ({ active }) => {
      useEffect(() => {
        if (active) {
          // This works around a storybook bug where an ancestor div is marked as hidden and causes the entire
          // toolbar and code tab to be invisible. They fixed the real problem in V8 but did not backport to V7.
          // https://github.com/storybookjs/storybook/issues/25322
          const rootElem = document.querySelector("#storybook-panel-root")
          if (rootElem?.parentElement?.parentElement?.parentElement){
            rootElem.parentElement.parentElement.parentElement.hidden = false;
          }
        }
      }, [active]);

      if (!active) {
        return null;
      }
      return <Playground />;
    },
  });
});

addons.register('google-analytics', (api) => {
  ReactGA.initialize("G-V1N3TQVQB5");

  api.on(STORY_CHANGED, () => {
    const story = api.getCurrentStoryData();
    const urlState = api.getUrlState();
    if (!story || !urlState) return;

    const { title, name } = story;
    const { path, viewMode } = urlState;

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
