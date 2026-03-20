import { Box, Button, Content, Heading, Text } from "@jobber/components";
import { useNavigate } from "@tanstack/react-router";

interface HeaderBlockProps {
  readonly title: string;
  readonly body: string;
  readonly ctaLabel?: string;
  readonly to?: string;
  readonly imageURL?: string;
}

/**
 * Displays at the top of the home page, and any other main content page.
 *
 * A big block of color with a title, body, and a call to action button.
 *
 * @param param0 {title:string, body:string, ctaLabel:string, to:string}
 * @returns ReactNode
 */
export const HeaderBlock = ({
  title,
  body,
  ctaLabel,
  to,
}: HeaderBlockProps) => {
  const navigate = useNavigate();

  return (
    <Box background="surface--background--subtle">
      <header className="headerBlock">
        <Content spacing="large">
          <div>
            <Content spacing="large">
              <Heading level={1}>{title}</Heading>
              <Text size="large">{body}</Text>
            </Content>
          </div>
          {to && ctaLabel && (
            <Button
              type="primary"
              size="large"
              label={ctaLabel}
              onClick={() => navigate({ to: to })}
            />
          )}
        </Content>
      </header>
    </Box>
  );
};
