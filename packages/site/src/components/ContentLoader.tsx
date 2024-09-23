import { useParams } from "react-router";
import { ContentView } from "../pages/ContentView";
import { contentMap } from "../maps";

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
