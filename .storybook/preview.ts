import "@jobber/design/foundation.css";
import { DocsWithSidebar } from "./components/DocsWithSidebar";

export const parameters = {
  viewMode: "docs",
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Patterns", "Components", "Design", "*"],
    },
  },
  docs: {
    container: DocsWithSidebar,
  },
};
