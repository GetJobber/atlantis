import Content from "./AutocompleteV2.stories.mdx";
import Props from "./AutocompleteV2.props.json";
import Notes from "./AutocompleteV2Notes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [value, setValue] = useState();
const [inputValue, setInputValue] = useState("");
const menu = [{ 
  type: "section", 
  label: "Services", 
  options: [
    { label: "Drain Cleaning" }, { label: "Pipe Replacement" }, { label: "Sewer Line Repair" }, { label: "Seasonal Refreshment" }, { label: "Window Cleaning" }, { label: "Roof Inspection" }, { label: "Flooring Installation" }, { label: "Baseboard Installation" }, { label: "HVAC Repair" }, { label: "HVAC Installation" }] 
}];

return (
<div style={{width: "100%"}}>
  <Autocomplete
    version={2}
    placeholder="Search"
    value={value}
    onChange={setValue}
    inputValue={inputValue}
    onInputChange={setInputValue}
    menu={menu}
  />
</div>
);`,
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
