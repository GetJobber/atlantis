import { DatePicker } from "@jobber/components";
import Content from "@atlantis/docs/components/DatePicker/DatePicker.stories.mdx";
import { useState } from "react";
import { showToast } from "@jobber/components/Toast";
import Props from "./DatePicker.props.json";
import { ContentExport } from "../../types/content";

const DatePickerRoot = () => {
  const [date, setDate] = useState(new Date());

  const changeDate = (dateIn: Date) => {
    setDate(dateIn);
    showToast({
      message: "Date changed to: " + date.toLocaleString(),
      variation: "success",
    });
  };

  return <DatePicker selected={date} onChange={changeDate} />;
};

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: DatePickerRoot,
    defaultProps: {},
  },
  title: "DatePicker",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-DatePicker-web--docs",
    },
  ],
} as const satisfies ContentExport;
