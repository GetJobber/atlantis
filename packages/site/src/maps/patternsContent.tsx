import InteractionDocs from "@atlantis/docs/patterns/interaction.stories.mdx";
import DisabledStateDocs from "@atlantis/docs/patterns/disabled-states.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const patternsContentMap: ContentMapItems = {
  interaction: {
    intro: "Interaction",
    title: "Interaction",
    content: () => <InteractionDocs />,
  },
  "disabled-states": {
    intro: "Disabled States",
    title: "Disabled States",
    content: () => <DisabledStateDocs />,
  },
};
