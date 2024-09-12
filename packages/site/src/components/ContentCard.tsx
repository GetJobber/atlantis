import { Card, Content, Heading } from "@jobber/components";
import { PropsWithChildren, ReactNode } from "react";
import { useHistory } from "react-router";
import image from "../assets/dummy.png";

interface ContentCardProps {
  readonly title: string;
  readonly to: string;
  readonly component?: () => ReactNode;
}

export const ComponentWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "var(--space-large)",
        height: "calc(100% - 57px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export const ContentCard = ({ title, to, component }: ContentCardProps) => {
  const history = useHistory();

  return (
    <Card onClick={() => history.push(to)}>
      {!component ? (
        <img style={{ width: "100%" }} src={image} />
      ) : (
        <ComponentWrapper>{component()}</ComponentWrapper>
      )}
      <Content>
        <Heading level={4}>{title}</Heading>
      </Content>
    </Card>
  );
};
