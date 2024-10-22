import { Card, Content, Heading } from "@jobber/components";
import { useHistory } from "react-router";
import { ComponentWrapper } from "./ComponentWrapper";
import { ContentCardProps } from "../types/components";

/**
 * Opinionated card for displaying links to our content
 *
 * @param param0 {title: string, to: string, component: ReactNode, imageURL: string, onClick: () => void}
 * @returns ReactNode
 */
export const ContentCard = ({
  title,
  to,
  component,
  imageURL,
  onClick,
}: ContentCardProps) => {
  const history = useHistory();

  return (
    <Card
      onClick={() => {
        history.push(to);
        onClick?.();
      }}
    >
      {!component ? (
        <img
          style={{ width: "100%", mixBlendMode: "multiply" }}
          src={imageURL}
        />
      ) : (
        <ComponentWrapper>{component()}</ComponentWrapper>
      )}
      <Content>
        <Heading level={4}>{title}</Heading>
      </Content>
    </Card>
  );
};
