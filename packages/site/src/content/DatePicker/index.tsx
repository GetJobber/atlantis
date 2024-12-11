import Content from "@atlantis/docs/components/Datepicker/Datepicker.stories.mdx";
import Props from "./DatePicker.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-selections-datepicker--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
