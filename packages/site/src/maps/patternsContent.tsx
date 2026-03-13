import InteractionDocs, {
  toc as interactionToc,
} from "../content/patterns/interaction.stories.mdx";
import ErrorDocs, {
  toc as errorToc,
} from "../content/patterns/errors.stories.mdx";
import EmptyStateDocs, {
  toc as emptyStateToc,
} from "../content/patterns/empty-states.stories.mdx";
import DisabledStateDocs, {
  toc as disabledStateToc,
} from "../content/patterns/disabled-states.stories.mdx";
import SettingsDocs, {
  toc as settingsToc,
} from "../content/patterns/settings.mdx";
import { ContentMapItems } from "../types/maps";

export const patternsContentMap: ContentMapItems = {
  interaction: {
    intro: "Interaction",
    title: "Interaction",
    content: () => <InteractionDocs />,
    toc: interactionToc,
  },
  errors: {
    intro: "Errors",
    title: "Errors",
    content: () => <ErrorDocs />,
    toc: errorToc,
  },
  "empty-states": {
    intro: "Empty States",
    title: "Empty States",
    content: () => <EmptyStateDocs />,
    toc: emptyStateToc,
  },
  "disabled-states": {
    intro: "Disabled States",
    title: "Disabled States",
    content: () => <DisabledStateDocs />,
    toc: disabledStateToc,
  },
  settings: {
    intro: "Settings",
    title: "Settings",
    content: () => <SettingsDocs />,
    toc: settingsToc,
  },
};
