import Content from "./InputGroup.stories.mdx";
import Props from "./InputGroup.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputgroup--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
