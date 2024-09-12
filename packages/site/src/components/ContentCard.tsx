import { Card, Content, Heading } from "@jobber/components";
import { useHistory } from "react-router";
import { ComponentWrapper } from "./ComponentWrapper";
import { ContentCardProps } from "../types/components";

export const ContentCard = ({
  title,
  to,
  component,
  imageURL,
}: ContentCardProps) => {
  const history = useHistory();

  return (
    <Card onClick={() => history.push(to)}>
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
