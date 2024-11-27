import { Chip, Chips as ChipsRoot } from "@jobber/components";
import ChipsContent from "@atlantis/docs/components/Chips/Chips.stories.mdx";
import { useState } from "react";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import Props from "./Chips.props.json";
import { ContentExport } from "../../types/content";

export const Chips = () => {
  const [selected, setSelected] = useState<string>();

  return (
    <Content>
      <Text>
        You are <u>{selected ? selected : "_______"}</u>
      </Text>
      <ChipsRoot selected={selected} onChange={setSelected} type="singleselect">
        <Chip label="Amazing" value="Amazing" />
        <Chip label="Wonderful" value="Wonderful" />
        <Chip label="Brilliant" value="Brilliant" />
        <Chip label="Magnificent" value="Magnificent" />
      </ChipsRoot>
    </Content>
  );
};

export default {
  content: () => <ChipsContent />,
  props: Props,
  component: {
    element: Chips,
    defaultProps: {},
  },
  title: "Chips",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Chips-web--docs",
    },
  ],
} as const satisfies ContentExport;
