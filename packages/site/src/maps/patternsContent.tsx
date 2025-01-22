import DisabledStateDocs from "@atlantis/docs/patterns/disabled-states.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const patternsContentMap: ContentMapItems = {
  "disabled-states": {
    intro: "Disabled States",
    title: "Disabled States",
    content: () => <DisabledStateDocs />,
  },
};
