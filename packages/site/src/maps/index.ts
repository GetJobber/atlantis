import { designContentMap } from "./designContent";
import { contentContentMap } from "./contentContent";
import { changelogContentMap } from "./changelogContent";
import { hooksContentMap } from "./hooksContent";
import { guidesContentMap } from "./guidesContent";
import { ContentMap } from "../types/maps";

export const contentMap: ContentMap = {
  content: contentContentMap,
  design: designContentMap,
  hooks: hooksContentMap,
  changelog: changelogContentMap,
  guides: guidesContentMap,
};
