import Content from "@atlantis/docs/components/InputGroup/InputGroup.stories.mdx";
import Props from "./InputGroup.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const startTime = new Date();
  startTime.setHours(8, 35, 0, 0);

  const endTime = new Date();
  endTime.setHours(22, 55, 0, 0);

  return (
    <InputGroup flowDirection={"vertical"}>
      <InputTime defaultValue={startTime} />
      <InputTime defaultValue={endTime} />
    </InputGroup>
  );`,
    defaultProps: {},
  },
  title: "InputGroup",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputGroup-web--docs",
    },
  ],
} as const satisfies ContentExport;
