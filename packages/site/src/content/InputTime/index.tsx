import InputTimeContent from "@atlantis/docs/components/InputTime/InputTime.stories.mdx";
import Props from "./InputTime.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputTimeContent />,
  props: Props,
  component: {
    element: `
      const [time, setTime] = useState();

      const handleChange = (newTime) => {
        setTime(newTime);
      };

      return (
        <Content>
          <Flex template={["grow", "shrink"]}>
            <InputTime
              placeholder={"Start time"}
              clearable={"always"}
              value={time}
              onChange={handleChange}
            />
            <Button label="Reset" size="large" onClick={() => setTime(undefined)} />
          </Flex>
          <pre>{time && time.toString()}</pre>
        </Content>
      );
    `,
  },
  title: "InputTime",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputTime-web--docs",
    },
  ],
} as const satisfies ContentExport;
