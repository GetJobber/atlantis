import { FormatEmail } from "@jobber/components";
import FormatEmailContent from "@atlantis/docs/components/FormatEmail/FormatEmail.stories.mdx";
import Props from "./FormatEmail.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <FormatEmailContent />,
  props: Props,
  component: {
    element: FormatEmail,
    defaultProps: { email: "myemail@address.me" },
  },
  title: "FormatEmail",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormatEmail-web--docs",
    },
  ],
} as const satisfies ContentExport;
