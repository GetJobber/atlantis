import AutocompleteContent from "./v1/Autocomplete.stories.mdx";
import Props from "./v1/Autocomplete.props.json";
import RebuiltContent from "./v2/AutocompleteV2.stories.mdx";
import Notes from "./v1/AutocompleteNotes.mdx";
import RebuiltNotes from "./v2/AutocompleteV2Notes.mdx";
import originalExample from "./v1/example";
import RebuiltProps from "./v2/AutocompleteV2.props.json";
import rebuiltExample from "./v2/example";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AutocompleteContent />,
  webRebuiltContent: () => <RebuiltContent />,
  props: Props,
  webRebuiltProps: RebuiltProps,
  component: {
    element: originalExample,
    webRebuiltElement: rebuiltExample,
  },
  title: "Autocomplete",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-forms-and-inputs-autocomplete--docs",
      ),
    },
  ],
  webRebuiltLinks: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-autocomplete-web-v2--flat",
      ),
    },
  ],
  notes: () => <Notes />,
  webRebuiltNotes: () => <RebuiltNotes />,
} as const satisfies ContentExport;
