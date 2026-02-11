import Content, { toc } from "./Toast.stories.mdx";
import Props from "./Toast.props.json";
import MobileProps from "./Toast.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Button
      label="Show toast"
      onClick={() => showToast({ message: "Showed toast" })}
    />`,
    mobileElement: `<><Button
        label="Show toast"
        onPress={
        () => {
        alert('A toast shows on your mobile device!')
        showToast({ message: "Showed toast" })
        }}
      />
      <Toast /></>
    `,
  },
  title: "Toast",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-status-and-feedback-toast--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
