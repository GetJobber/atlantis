import { useParams } from "react-router";
import { ContentView } from "../pages/ContentView";
import { contentMap } from "../maps";

// STODO: Overall great component, nice and easy.
// Terrible error handling though when type/name are not set
// You get a blank page and an error message in the console.
// Can we improve the error handling? Maybe display an error page if type/name aren't set?

/**
 * Pulls information from the URL and uses it to load the correct content
 *
 * @returns ReadNode
 */
export const ContentLoader = () => {
  const { name, type } = useParams<{ name: string; type: string }>();

  const content = contentMap[type][name];

  return (
    <ContentView
      intro={content.intro}
      title={content.title}
      content={content.content}
    />
  );
};
