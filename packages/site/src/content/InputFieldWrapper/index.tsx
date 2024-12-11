import Content from "@atlantis/docs/components/InputFieldWrapper/InputFieldWrapper.stories.mdx";
import MobileProps from "./InputFieldWrapper.props-mobile.json";
import Notes from "./InputFieldWrapperNotes.mdx";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<InputFieldWrapper
      placeholder={"Enter a value in cents"}
      prefix={{ icon: "invoice" }}
    />`,
  },
  title: "InputFieldWrapper",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputFieldWrapper-web--docs",
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
