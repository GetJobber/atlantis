import AutocompleteContent from "./Autocomplete.stories.mdx";
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
  versions: [
    {
      label: "Web v1 (Current)",
    },
    {
      label: "Web v2 (Rebuilt)",
      // Design tab content (concise v2 overview)
      content: () => (
        <div>
          <h3>Autocomplete v2 (Rebuilt) — essentials</h3>
          <ul>
            <li>
              <p>
                <strong>Mental model</strong>
              </p>
              <p>
                inputValue + onInputChange control the text; value + onChange
                control the committed selection(s).
              </p>
            </li>
            <li>
              <p>
                <strong>Menu model</strong>
              </p>
              <p>
                Build with menuOptions or menuSection. Supports actions and
                persistent header/footer items.
              </p>
            </li>
            <li>
              <p>
                <strong>allowFreeForm</strong>
              </p>
              <p>
                When true, Enter/Blur can commit the text not in the list via
                createFreeFormValue.
              </p>
            </li>
            <li>
              <p>
                <strong>Commit signals</strong>
              </p>
              <p>
                Enter on active item, click, or blur (rules differ with
                free-form). Typing only updates inputValue.
              </p>
            </li>
            <li>
              <p>
                <strong>Filtering</strong>
              </p>
              <p>
                filterOptions (fn | false). Debounce with debounce (ms, default
                300; 0 disables).
              </p>
            </li>
            <li>
              <p>
                <strong>Custom render</strong>
              </p>
              <p>customRenderOption/Section/Action/Header/Footer.</p>
            </li>
            <li>
              <p>
                <strong>A11y</strong>
              </p>
              <p>
                role &quot;combobox&quot; with aria-*; listbox/options wired via
                aria-activedescendant.
              </p>
            </li>
          </ul>
        </div>
      ),
      // Minimal v2 preview example using version={2}
      component: {
        element: `
const menu = [
  { type: 'options', options: [{ label: 'One' }, { label: 'Two' }, { label: 'Three' }] }
];

function App() {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      version={2}
      menu={menu}
      value={value}
      onChange={setValue}
      inputValue={inputValue}
      onInputChange={setInputValue}
      placeholder="Search"
    />
  );
}
        `,
      },
      // Override props so Web tab reflects v2 (empty for now)
      props: [],
      // Implement tab content (focused notes)
      notes: () => (
        <div>
          <h3>Implementation notes (v2)</h3>
          <ul>
            <li>
              <p>
                <strong>Free-form</strong>
              </p>
              <p>
                With allowFreeForm, Enter on a closed menu or Blur can commit
                inputValue via createFreeFormValue.
              </p>
            </li>
            <li>
              <p>
                <strong>Enter</strong>
              </p>
              <p>
                When the menu is open and an item is active, Enter selects it.
                Otherwise, it only commits in free-form mode.
              </p>
            </li>
            <li>
              <p>
                <strong>Sections & actions</strong>
              </p>
              <p>
                Sections render only when they have visible options after
                filtering. Actions can keep the menu open with
                shouldClose=false.
              </p>
            </li>
            <li>
              <p>
                <strong>Highlighting</strong>
              </p>
              <p>
                Opening highlights the selected option; typing clears highlight;
                deleting with a selection can re-highlight it.
              </p>
            </li>
          </ul>
        </div>
      ),
      // Point to Storybook v2 docs page if available
      links: [
        {
          label: "Storybook (Web v2)",
          url: getStorybookUrl(
            "?path=/docs/components-forms-and-inputs-autocomplete-web-v2--docs",
          ),
        },
      ],
    },
  ],
} as const satisfies ContentExport;
