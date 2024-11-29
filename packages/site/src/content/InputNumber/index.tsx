import { InputNumber as InputNumberRoot } from "@jobber/components";
import Content from "@atlantis/docs/components/InputNumber/InputNumber.stories.mdx";
import { useState } from "react";
import Props from "./InputNumber.props.json";
import { ContentExport } from "../../types/content";

export const InputNumber = () => {
  const [value, setValue] = useState(3);

  return (
    <InputNumberRoot
      value={value}
      onChange={(newValue: number) => setValue(newValue)}
    />
  );
};

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputNumber,
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
