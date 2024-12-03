import Content from "@atlantis/docs/components/MultiSelect/MultiSelect.stories.mdx";
import Props from "./MultiSelect.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [options, setOptions] = useState([
    { label: "Synced", checked: true },
    { label: "Errors", checked: false },
    { label: "Warnings", checked: true },
    { label: "Ignored", checked: true },
  ]);

  return (
    <MultiSelect
      defaultLabel={"Status"}
      allSelectedLabel={"All statuses"}
      options={options}
      onOptionsChange={setOptions}
    />
  );`,
    defaultProps: {},
  },
  title: "MultiSelect",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-MultiSelect-web--docs",
    },
  ],
} as const satisfies ContentExport;
