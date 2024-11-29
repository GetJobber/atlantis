import { InputDate as InputDateRoot } from "@jobber/components";
import InputDateContent from "@atlantis/docs/components/InputDate/InputDate.stories.mdx";
import { useState } from "react";
import Props from "./InputDate.props.json";
import { ContentExport } from "../../types/content";

const InputDate = () => {
  const [date, setDate] = useState(new Date());

  return <InputDateRoot value={date} onChange={setDate} />;
};

export default {
  content: () => <InputDateContent />,
  props: Props,
  component: {
    element: InputDate,
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
