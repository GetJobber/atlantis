import { useLocation, useParams } from "@tanstack/react-router";
import { ContentView } from "../layout/ContentView";
import { contentMap } from "../maps";
import { NotFoundPage } from "../pages/NotFoundPage";

/**
 * Pulls information from the URL and uses it to load the correct content.
 * Used by multiple param routes (content/$name, design/$name, hooks/$name, etc.),
 * so we read params from the current matched route (strict: false).
 */
export const ContentLoader = () => {
  let type = "content";
  const { name } = useParams({ strict: false });
  const location = useLocation();

  switch (true) {
    case location.pathname.startsWith("/design"):
      type = "design";
      break;
    case location.pathname.startsWith("/changelog"):
      type = "changelog";
      break;
    case location.pathname.startsWith("/hooks"):
      type = "hooks";
      break;
    case location.pathname.startsWith("/guides"):
      type = "guides";
      break;
    case location.pathname.startsWith("/packages"):
      type = "packages";
      break;
    case location.pathname.startsWith("/patterns"):
      type = "patterns";
      break;
    default:
      type = "content";
  }

  if (!name) {
    return <NotFoundPage />;
  }

  const content = contentMap[type]?.[name];

  return content ? (
    <ContentView
      key={`${type}-${name}`}
      title={content.title}
      content={content.content}
      noMaxWidth={content.noMaxWidth}
    />
  ) : (
    <NotFoundPage />
  );
};
