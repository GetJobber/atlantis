import Content from "@atlantis/docs/components/Datepicker/Datepicker.stories.mdx";
import Props from "./DatePicker.props.json";
import Notes from "./DatePickerNotes.mdx";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [date, setDate] = useState(new Date());

  const changeDate = (dateIn) => {
    setDate(dateIn);
    showToast({
      message: "Date changed to: " + date.toLocaleString(),
      variation: "success",
    });
  };

  return <DatePicker selected={date} onChange={changeDate} />

    `,
  },
  title: "DatePicker",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-DatePicker-web--docs",
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
