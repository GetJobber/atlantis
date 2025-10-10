import AutocompleteContent from "./v1/Autocomplete.stories.mdx";
import Props from "./v1/Autocomplete.props.json";
import RebuiltContent from "./v2/AutocompleteV2.stories.mdx";
import Notes from "./v1/AutocompleteNotes.mdx";
import RebuiltNotes from "./v2/AutocompleteV2Notes.mdx";
import originalExample from "./v1/example";
import RebuiltProps from "./v2/AutocompleteV2.props.json";
import rebuiltExample from "./v2/example";
import { VersionedContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  v1: {
    content: () => <AutocompleteContent />,
    props: Props,
    component: {
      element: originalExample,
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
    notes: () => <Notes />,
  },
  v2: {
    content: () => <RebuiltContent />,
    props: RebuiltProps,
    component: {
      element: rebuiltExample,
    },
    title: "Autocomplete V2",
    links: [
      {
        label: "Storybook",
        url: getStorybookUrl(
          "?path=/story/components-forms-and-inputs-autocomplete-web-v2--flat",
        ),
      },
    ],
    notes: () => <RebuiltNotes />,
  },
} as const satisfies VersionedContentExport;
