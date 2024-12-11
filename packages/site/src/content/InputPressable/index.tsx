import Content from "@atlantis/docs/components/InputPressable/InputPressable.stories.mdx";
import MobileProps from "./InputPressable.props-mobile.json";
import Notes from "./InputPressableNotes.mdx";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<InputPressable
      placeholder={"Placeholder"}
      value={"Mango"}
      onPress={() => {
        alert("👍")
      }}
    />`,
  },
  title: "InputPressable",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputPressable-web--docs",
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
