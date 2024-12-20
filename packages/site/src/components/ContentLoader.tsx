import { useLocation, useParams } from "react-router";
import { ContentView } from "../layout/ContentView";
import { contentMap } from "../maps";

/**
 * Pulls information from the URL and uses it to load the correct content
 *
 * @returns ReadNode
 */
export const ContentLoader = () => {
  let type = "content";
  const { name } = useParams<{ name: string }>();
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
    default:
      type = "content";
  }

  const content = contentMap[type][name];

  return (
    <ContentView
      title={content.title}
      key={`${type}-${name}`}
      content={content.content}
    />
  );
};
