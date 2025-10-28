import InteractionDocs from "../content/Patterns/interaction.stories.mdx";
import ErrorDocs from "../content/Patterns/errors.stories.mdx";
import EmptyStateDocs from "../content/Patterns/empty-states.stories.mdx";
import DisabledStateDocs from "../content/Patterns/disabled-states.stories.mdx";
import SettingsDocs from "../content/Patterns/settings.mdx";
import { ContentMapItems } from "../types/maps";

export const patternsContentMap: ContentMapItems = {
  interaction: {
    intro: "Interaction",
    title: "Interaction",
    content: () => <InteractionDocs />,
  },
  errors: {
    intro: "Errors",
    title: "Errors",
    content: () => <ErrorDocs />,
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
  settings: {
    intro: "Settings",
    title: "Settings",
    content: () => <SettingsDocs />,
  },
};
