import ChipsContent from "./Chips.stories.mdx";
import Props from "./Chips.props.json";
import Notes from "./ChipsNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ChipsContent />,
  props: Props,
  component: {
    element: `const [selected, setSelected] = useState();

  return (
    <Content>
      <Text>
        You are <u>{selected ? selected : "_______"}</u>
      </Text>
      <Chips selected={selected} onChange={setSelected} type="singleselect">
        <Chip label="Amazing" value="Amazing" />
        <Chip label="Wonderful" value="Wonderful" />
        <Chip label="Brilliant" value="Brilliant" />
        <Chip label="Magnificent" value="Magnificent" />
      </Chips>
    </Content>
  );
    `,
  },
  title: "Chips",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-selections-chips--docs`),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
