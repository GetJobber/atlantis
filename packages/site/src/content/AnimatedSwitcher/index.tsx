import {
  AnimatedSwitcher as AnimatedSwitcherRoot,
  Text,
} from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import AnimatedSwitcherContent from "@atlantis/docs/components/AnimatedSwitcher/AnimatedSwitcher.stories.mdx";
import Props from "./AnimatedSwitcher.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: AnimatedSwitcherContent,
  props: Props,
  component: {
    element: AnimatedSwitcherRoot,
    defaultProps: {
      initialChild: <Text>Initial!</Text>,
      switchTo: <Text>Swapped!</Text>,
    },
    code: `<AnimatedSwitcher />`,
  },
  title: "AnimatedSwitcher",
  description: "AnimatedSwitchers are a ...",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-AnimatedSwitcher-web--docs",
    },
  ],
} as ContentExport;
