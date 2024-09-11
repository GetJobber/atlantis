import { Box, Card, Content, Typography } from "@jobber/components";
import { useHistory } from "react-router-dom";
import { PropsWithChildren, ReactNode } from "react";
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
        height: "calc(100% - 57px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d9d9d9",
      }}
    >
      {children}
    </div>
  );
};

export const ContentCard = ({ title, to, component }: ContentCardProps) => {
  const history = useHistory();

  return (
    <div
      style={{
        maxWidth: "300px",
        width: "100%",
        height: "300px",
        display: "flex",
      }}
    >
      <Card onClick={() => history.push(to)}>
        {!component ? (
          <img style={{ width: "100%" }} src={image} />
        ) : (
          <ComponentWrapper>{component()}</ComponentWrapper>
        )}
        <Content>
          <Box direction="row" alignItems="center">
            <Typography size="large">{title}</Typography>
          </Box>
        </Content>
      </Card>
    </div>
  );
};
