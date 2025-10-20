import Content from "./InputNumber.stories.mdx";
import Props from "./InputNumber.props.json";
import MobileProps from "./InputNumber.props-mobile.json";
import Notes from "./InputNumberNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputnumber--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
