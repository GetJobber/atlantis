import Content from "@atlantis/docs/components/InputNumber/InputNumber.stories.mdx";
import Props from "./InputNumber.props.json";
import MobileProps from "./InputNumber.props-mobile.json";
import Notes from "./InputNumberNotes.mdx";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `const [value, setValue] = useState(3);
  return (
    <InputNumber
      value={value}
      onChange={(newValue: number) => setValue(newValue)}
    />
  );`,
    mobileElement: `<InputNumber placeholder={"Quantity"} />`,
  },
  title: "InputNumber",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputNumber-web--docs",
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
