import { Disclosure } from "@jobber/components";
import Props from "./Disclosure.props.json";
import Content from "../../../../../docs/components/Disclosure/Disclosure.stories.mdx";

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
