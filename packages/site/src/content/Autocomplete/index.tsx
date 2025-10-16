import AutocompleteContent from "./Autocomplete.stories.mdx";
import Props from "./Autocomplete.props.json";
import RebuiltContent from "./AutocompleteV2.stories.mdx";
import Notes from "./AutocompleteNotes.mdx";
import RebuiltNotes from "./AutocompleteV2Notes.mdx";
import originalExample from "./exampleV1.ts";
import rebuiltExample from "./exampleV2.ts";
import RebuiltProps from "./AutocompleteV2.props.json";
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
