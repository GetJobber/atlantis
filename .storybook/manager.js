import { addons, types } from "@storybook/addons";
import { CanvasSourceCode } from "./components/CanvasSourceCode";
import theme from "./theme";
import favicon from "./assets/favicon.svg";

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);

addons.setConfig({
  theme,
});

addons.register("atlantis/panel", () => {
  addons.add("source-code/panel", {
    title: "Source code",
    type: types.PANEL,
    render: CanvasSourceCode,
  });
});
