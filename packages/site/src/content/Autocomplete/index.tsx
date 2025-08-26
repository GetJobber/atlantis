import AutocompleteContent from "@atlantis/docs/components/Autocomplete/Autocomplete.stories.mdx";
import Props from "./Autocomplete.props.json";
import Notes from "./AutocompleteNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <AutocompleteContent />,
  props: Props,
  component: {
    element: `

const [value, setValue] = useState();
    const getOptions = () => {
      return [
        { value: 1, label: "Hobbitss" },
        { value: 2, label: "Super heroes" },
        { value: 3, label: "Space wars and treks" },
      ]
    }
  
  return <Autocomplete 
      getOptions={getOptions} 
      initialOptions={[]} 
      placeholder="Autocomplete" 
      value={value}  
      onChange={setValue} 
    />;
  
`,
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
