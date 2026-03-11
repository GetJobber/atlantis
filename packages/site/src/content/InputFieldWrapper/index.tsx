import Content from "./InputFieldWrapper.stories.mdx";
import MobileProps from "./InputFieldWrapper.props-mobile.json";
import Notes from "./InputFieldWrapperNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-private-inputfieldwrapper--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
