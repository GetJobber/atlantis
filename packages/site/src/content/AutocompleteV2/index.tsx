import Content from "./AutocompleteV2.stories.mdx";
import Props from "./AutocompleteV2.props.json";
import Notes from "./AutocompleteV2Notes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { autocompleteElementV2 } from "../Autocomplete/exampleElements";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: autocompleteElementV2,
  },
  title: "Autocomplete (v2)",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-autocomplete-web-v2--flat",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
