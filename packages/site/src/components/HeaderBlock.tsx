import { Box, Button, Content, Typography } from "@jobber/components";
import { useHistory } from "react-router";

interface HeaderBlockProps {
  readonly title: string;
  readonly body: string;
  readonly ctaLabel?: string;
  readonly to?: string;
}

export const HeaderBlock = ({
  title,
  body,
  ctaLabel,
  to,
}: HeaderBlockProps) => {
  const history = useHistory();

  return (
    <Box padding="extravagant" background="base-blue--900">
      <div
        style={{
          width: "100%",
          height: "100%",
          color: "var(--color-base-white)",
          minHeight: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Content spacing="large">
          <Typography
            element={"h1"}
            size="extravagant"
            fontWeight="bold"
            fontFamily="display"
          >
            {title}
          </Typography>
          <Typography size="large">{body}</Typography>
          {to && ctaLabel && (
            <Button
              type="secondary"
              size="large"
              label={ctaLabel}
              onClick={() => history.push(to)}
            />
          )}
        </Content>
      </div>
    </Box>
  );
};