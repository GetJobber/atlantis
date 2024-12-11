import Content from "@atlantis/docs/components/RecurringSelect/RecurringSelect.stories.mdx";
import Props from "./RecurringSelect.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [rule, setRule] = useState<RecurrenceRule>({
    interval: 1,
    type: DurationPeriod.DayOfMonth,
    date: new Set([2, 4, 6, 10, 12, 18, 25, "LAST"]),
  });

  return <RecurringSelect value={rule} onChange={setRule} />`,
    defaultProps: {},
  },
  title: "RecurringSelect",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-selections-recurringselect--docs`,
    },
  ],
} as const satisfies ContentExport;
