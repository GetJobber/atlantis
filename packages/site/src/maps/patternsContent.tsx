import InteractionDocs from "@atlantis/docs/patterns/interaction.stories.mdx";
import EmptyStateDocs from "@atlantis/docs/patterns/empty-states.stories.mdx";
import DisabledStateDocs from "@atlantis/docs/patterns/disabled-states.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const patternsContentMap: ContentMapItems = {
  interaction: {
    intro: "Interaction",
    title: "Interaction",
    content: () => <InteractionDocs />,
  },
  "empty-states": {
    intro: "Empty States",
    title: "Empty States",
    content: () => <EmptyStateDocs />,
  },
  "disabled-states": {
    intro: "Disabled States",
    title: "Disabled States",
    content: () => <DisabledStateDocs />,
  },
};
