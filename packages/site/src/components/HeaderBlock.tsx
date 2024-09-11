import { Button, Content, Typography } from "@jobber/components";
import { useHistory } from "react-router-dom";

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
    <div
      style={{
        padding: 80,
        color: "var(--color-surface)",
        backgroundColor: "var(--color-brand)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          color: "var(--color-surface)",
          backgroundColor: "var(--color-brand)",
          minHeight: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Content>
          <Typography size="extravagant" fontWeight="bold" fontFamily="display">
            {title}
          </Typography>
          <Typography size="larger">{body}</Typography>
          {to && ctaLabel && (
            <Button
              type="secondary"
              label={ctaLabel}
              onClick={() => history.push(to)}
            />
          )}
        </Content>
      </div>
    </div>
  );
};
