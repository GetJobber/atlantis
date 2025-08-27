import Content from "./SegmentedControl.stories.mdx";
import Props from "./SegmentedControl.props.json";
import Notes from "./SegmentedControlNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [activeOption, setActiveOption] = useState("week");
    const options = [{label:'Week',value:'week'},{label:'Months',value:'months'},{label:'Year',value:'year'}]
  return (
    <Content>
      <Text>
        Control the state without interacting with the SegmentedControl
        directly. Navigate through the options and reset state via the button.
      </Text>
      <Typography>Current activeOption: {activeOption}</Typography>
      <SegmentedControl
        selectedValue={activeOption}
        onSelectValue={setActiveOption}
        options={[]}
      >
        {options.map((option) => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
      <Button label="Reset to Week" onClick={() => setActiveOption("week")} />
    </Content>
  );`,
    defaultProps: {},
  },
  title: "SegmentedControl",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-selections-segmentedcontrol--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
