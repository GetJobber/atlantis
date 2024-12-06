import ChipsContent from "@atlantis/docs/components/Chips/Chips.stories.mdx";
import Props from "./Chips.props.json";
import MobileProps from "./Chips.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <ChipsContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `const [selected, setSelected] = useState();

  return (
    <Content>
      <Text>
        You are <u>{selected ? selected : "_______"}</u>
      </Text>
      <Chips selected={selected} onChange={setSelected} type="singleselect">
        <Chip label="Amazing" value="Amazing" />
        <Chip label="Wonderful" value="Wonderful" />
        <Chip label="Brilliant" value="Brilliant" />
        <Chip label="Magnificent" value="Magnificent" />
      </Chips>
    </Content>
  );
    `,
    mobileElement: `<Chip
        label={"Active chip"}
        onPress={function onPress() {
          return alert("hi!");
        }}
        accessibilityLabel={"Active chip"}
        isActive={true}
      />
    `,
  },
  title: "Chips",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Chips-web--docs",
    },
  ],
} as const satisfies ContentExport;
