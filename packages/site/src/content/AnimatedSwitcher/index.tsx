import {
  AnimatedSwitcher as AnimatedSwitcherRoot,
  Text,
} from "@jobber/components";
import AnimatedSwitcherContent from "@atlantis/docs/components/AnimatedSwitcher/AnimatedSwitcher.stories.mdx";
import Props from "./AnimatedSwitcher.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: AnimatedSwitcherContent,
  props: Props,
  component: {
    element: AnimatedSwitcherRoot,
    defaultProps: {
      initialChild: <Text>Initial!</Text>,
      switchTo: <Text>Swapped!</Text>,
    },
  },
  title: "AnimatedSwitcher",
  description: "AnimatedSwitchers are a ...",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-utilities-animatedswitcher--docs",
      ),
    },
  ],
} as ContentExport;
