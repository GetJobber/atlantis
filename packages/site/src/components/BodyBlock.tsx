import { Box, Content, Typography } from "@jobber/components";
import { PropsWithChildren } from "react";

interface BodyBlockProps extends PropsWithChildren {
  readonly title: string;
}

export const BodyBlock = ({ children, title }: BodyBlockProps) => {
  return (
    <div
      style={{
        padding: 80,
      }}
    >
      <Content>
        <Typography size="larger" fontWeight="bold">
          {title}
        </Typography>
        <Box direction="row" alignItems="stretch" gap={"base"}>
          {children}
        </Box>
      </Content>
    </div>
  );
};
