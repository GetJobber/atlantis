import AutocompleteContent from "./Autocomplete.stories.mdx";
import AutocompleteV2Content from "./AutocompleteV2.stories.mdx";
import AutocompleteV2Notes from "./AutocompleteV2Notes.mdx";
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
      content: () => <AutocompleteV2Content />,
      // Minimal v2 preview example using version={2}
      component: {
        element: `
const menu = [
  { type: 'options', options: [{ label: 'One' }, { label: 'Two' }, { label: 'Three' }] }
];

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
        `,
      },
      // v2 props (concise subset for site table; full reference lives in Storybook)
      props: [
        {
          description: "",
          displayName: "AutocompleteRebuilt",
          filePath:
            "packages/components/src/Autocomplete/Autocomplete.rebuilt.tsx",
          methods: [],

          props: {
            version: {
              name: "version",
              required: true,
              description: "Use version 2.",
              defaultValue: null,
              type: { name: "2" },
            },

            menu: {
              name: "menu",
              required: true,
              description: "Data model for sections/options/actions.",
              defaultValue: null,
              type: { name: "MenuItem[]" },
            },

            value: {
              name: "value",
              required: false,
              description: "Current selection (single or array when multiple).",
              defaultValue: null,
              type: { name: "OptionLike | OptionLike[] | undefined" },
            },

            onChange: {
              name: "onChange",
              required: true,
              description: "Called when a selection is committed.",
              defaultValue: null,
              type: { name: "(value) => void" },
            },

            inputValue: {
              name: "inputValue",
              required: true,
              description: "Controlled input text.",
              defaultValue: null,
              type: { name: "string" },
            },

            onInputChange: {
              name: "onInputChange",
              required: true,
              description: "Called when the input text changes.",
              defaultValue: null,
              type: { name: "(text: string) => void" },
            },

            multiple: {
              name: "multiple",
              required: false,
              description: "Enable multiple selections (experimental UI).",
              defaultValue: null,
              type: { name: "boolean" },
            },

            allowFreeForm: {
              name: "allowFreeForm",
              required: false,
              description: "Allow committing text not present in options.",
              defaultValue: null,
              type: { name: "boolean" },
            },

            createFreeFormValue: {
              name: "createFreeFormValue",
              required: false,
              description: "Factory to convert free-form text to a value.",
              defaultValue: null,
              type: { name: "(text: string) => OptionLike" },
            },

            filterOptions: {
              name: "filterOptions",
              required: false,
              description: "Custom filter function or false to opt-out.",
              defaultValue: null,
              type: { name: "((opts, input) => opts) | false" },
            },

            debounce: {
              name: "debounce",
              required: false,
              description: "Debounce for filtering (ms). Default 300.",
              defaultValue: null,
              type: { name: "number" },
            },

            getOptionLabel: {
              name: "getOptionLabel",
              required: false,
              description: "Map option to label for filtering and display.",
              defaultValue: null,
              type: { name: "(option) => string" },
            },

            inputEqualsOption: {
              name: "inputEqualsOption",
              required: false,
              description: "Custom equality between input text and option.",
              defaultValue: null,
              type: { name: "(text, option) => boolean" },
            },

            customRenderOption: {
              name: "customRenderOption",
              required: false,
              description: "Render function for an option row.",
              defaultValue: null,
              type: { name: "(args) => ReactNode" },
            },

            customRenderSection: {
              name: "customRenderSection",
              required: false,
              description: "Render function for a section header.",
              defaultValue: null,
              type: { name: "(section) => ReactNode" },
            },

            customRenderAction: {
              name: "customRenderAction",
              required: false,
              description: "Render function for an action row.",
              defaultValue: null,
              type: { name: "(args) => ReactNode" },
            },

            customRenderHeader: {
              name: "customRenderHeader",
              required: false,
              description: "Render function for persistent header.",
              defaultValue: null,
              type: { name: "(args) => ReactNode" },
            },

            customRenderFooter: {
              name: "customRenderFooter",
              required: false,
              description: "Render function for persistent footer.",
              defaultValue: null,
              type: { name: "(args) => ReactNode" },
            },

            emptyStateMessage: {
              name: "emptyStateMessage",
              required: false,
              description:
                "Message/node when no options remain after filtering.",
              defaultValue: null,
              type: { name: "ReactNode | false" },
            },

            emptyActions: {
              name: "emptyActions",
              required: false,
              description:
                "Actions to show when list is empty (array or function).",
              defaultValue: null,
              type: { name: "Action[] | (({ inputValue }) => Action[])" },
            },

            openOnFocus: {
              name: "openOnFocus",
              required: false,
              description: "Open menu on input focus (default true).",
              defaultValue: null,
              type: { name: "boolean" },
            },

            readOnly: {
              name: "readOnly",
              required: false,
              description:
                "When true, disable interactions (still fires focus/blur).",
              defaultValue: null,
              type: { name: "boolean" },
            },

            loading: {
              name: "loading",
              required: false,
              description: "Show loading state in the menu.",
              defaultValue: null,
              type: { name: "boolean" },
            },
          },

          tags: {},
        },
      ],
      // Implement tab content
      notes: () => <AutocompleteV2Notes />,
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
