import { Card as CardRoot, Content, Text } from "@jobber/components";
import CardContent from "@atlantis/docs/components/Card/Card.stories.mdx";
import { PropsWithChildren } from "react";
import Props from "./Card.props.json";
import { ContentExport } from "../../types/content";

export const Card = (props: PropsWithChildren) => {
  return (
    <CardRoot {...props}>
      <Content>
        <Text>
          Stay connected with your team in the field when you put the Jobber app
          in their hands.
        </Text>
      </Content>
    </CardRoot>
  );
};

export default {
  content: () => <CardContent />,
  props: Props,
  component: {
    element: Card,
    defaultProps: { header: { title: "The Jobber App" } },
  },
  title: "Card",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Card-web--docs",
    },
  ],
} as const satisfies ContentExport;
