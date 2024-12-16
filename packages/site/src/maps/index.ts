import { designContentMap } from "./designContent";
import { contentContentMap } from "./contentContent";
import { changelogContentMap } from "./changelogContent";
import { guidesContentMap } from "./guidesContent";
import { ContentMap } from "../types/maps";

export const contentMap: ContentMap = {
  content: contentContentMap,
  design: designContentMap,
  changelog: changelogContentMap,
  guides: guidesContentMap,
};
