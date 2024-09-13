import { Disclosure } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/Disclosure/Disclosure.stories.mdx";
import Props from "./Disclosure.props.json";

export default {
  content: Content,
  props: Props,
  component: {
    element: Disclosure,
    props: { label: "Disclosure" },
    code: `<Disclosure title="Disclosure">Here are the details contained within the disclosure</Disclosure>`,
    defaultProps: { strings: { label: "Disclosure!" } },
  },
  title: "Disclosure",
  description: "Disclosure is neater.",
  links: [
    {
      label: "Disclosure Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
  ],
};
