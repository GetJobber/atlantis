import { componentList } from "../componentList";
import { designList } from "../designList";

const componentEntries = componentList.map(({ title }) => [title, title]);
const designEntries = designList.map(({ title, to }) => [
  title,
  to.replace("/design/", "design/"),
]);

export const componentMap = Object.fromEntries([
  ...componentEntries,
  ...designEntries,
]) as Record<string, string>;

export const getComponentPath = (componentName: string): string => {
  const mapped = componentMap[componentName];
  if (!mapped) return "/components";

  return mapped.startsWith("design/") ? `/${mapped}` : `/components/${mapped}`;
};
