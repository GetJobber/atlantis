import Content from "@atlantis/docs/components/Menu/Menu.stories.mdx";
import Props from "./Menu.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Menu
      items={[
        {
          actions: [
            {
              label: "Edit",
              icon: "edit",
              onClick: function onClick() {
                alert("✏️");
              },
            },
          ],
        },
        {
          header: "Send as...",
          actions: [
            {
              label: "Text message",
              icon: "sms",
              onClick: function onClick() {
                alert("📱");
              },
            },
            {
              label: "Email",
              icon: "email",
              onClick: function onClick() {
                alert("📨");
              },
            },
          ],
        },
      ]}
    />`,
    defaultProps: {},
  },
  title: "Menu",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Menu-web--docs",
    },
  ],
} as const satisfies ContentExport;
