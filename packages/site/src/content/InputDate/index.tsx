import InputDateContent from "@atlantis/docs/components/InputDate/InputDate.stories.mdx";
import Props from "./InputDate.props.json";
import MobileProps from "./InputDate.props-mobile.json";
import Notes from "./InputDateNotes.mdx";
import { ContentExport } from "../../types/content";

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
      url: "http://localhost:6006/?path=/docs/components-utilities-InputDate-web--docs",
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
