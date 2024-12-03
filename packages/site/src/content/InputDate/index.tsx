import InputDateContent from "@atlantis/docs/components/InputDate/InputDate.stories.mdx";
import Props from "./InputDate.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputDateContent />,
  props: Props,
  component: {
    element: `const [date, setDate] = useState(new Date());

return <InputDate value={date} onChange={setDate} />;
    `,
    defaultProps: {},
  },
  title: "InputDate",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputDate-web--docs",
    },
  ],
} as const satisfies ContentExport;
