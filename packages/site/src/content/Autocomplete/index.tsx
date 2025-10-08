import AutocompleteContent from "./Autocomplete.stories.mdx";
import Props from "./Autocomplete.props.json";
import Notes from "./AutocompleteNotes.mdx";
import { autocompleteElementV1 } from "./exampleElements";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AutocompleteContent />,
  props: Props,
  component: {
    element: autocompleteElementV1,
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
} as const satisfies ContentExport;
