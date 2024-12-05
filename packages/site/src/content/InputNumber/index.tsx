import Content from "@atlantis/docs/components/InputNumber/InputNumber.stories.mdx";
import Props from "./InputNumber.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [value, setValue] = useState(3);

  return (
    <InputNumber
      value={value}
      onChange={(newValue: number) => setValue(newValue)}
    />
  );`,
    defaultProps: {},
  },
  title: "InputNumber",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputNumber-web--docs",
    },
  ],
} as const satisfies ContentExport;
