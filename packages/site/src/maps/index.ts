import { designContentMap } from "./designContent";
import { patternsContentMap } from "./patternsContent";
import { contentContentMap } from "./contentContent";
import { changelogContentMap } from "./changelogContent";
import { hooksContentMap } from "./hooksContent";
import { guidesContentMap } from "./guidesContent";
import { packagesContentMap } from "./packagesContent";
import { ContentMap } from "../types/maps";

export const contentMap: ContentMap = {
  content: contentContentMap,
  design: designContentMap,
  patterns: patternsContentMap,
  hooks: hooksContentMap,
  changelog: changelogContentMap,
  guides: guidesContentMap,
  packages: packagesContentMap,
};
