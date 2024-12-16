import { useLocation, useParams } from "react-router";
import { ContentView } from "../pages/ContentView";
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
    default:
      type = "content";
  }

  const content = contentMap[type][name];

  return (
    <ContentView
      intro={content.intro}
      title={content.title}
      content={content.content}
    />
  );
};
