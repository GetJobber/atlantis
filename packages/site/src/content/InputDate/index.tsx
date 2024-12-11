import InputDateContent from "@atlantis/docs/components/InputDate/InputDate.stories.mdx";
import Props from "./InputDate.props.json";
import MobileProps from "./InputDate.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputDateContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `const [date, setDate] = useState(new Date());

return <InputDate value={date} onChange={setDate} />;
    `,
    mobileElement: `const [date, setDate] = useState(new Date("11/11/2011"));

  return <InputDate value={date} onChange={setDate} />;`,
    defaultProps: {},
  },
  title: "InputDate",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputdate--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
