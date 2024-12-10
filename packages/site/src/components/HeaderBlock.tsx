import { Box, Button, Content, Typography } from "@jobber/components";
import { useHistory } from "react-router";

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
  imageURL = "../public/img_collage.jpg",
}: HeaderBlockProps) => {
  const history = useHistory();

  return (
    <Box background="base-blue--900">
      <header
        style={{ backgroundImage: `url(${imageURL})` }}
        className="headerBlock"
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
          <Typography size="large" fontWeight={"semiBold"}>
            {body}
          </Typography>
          {to && ctaLabel && (
            <Button
              type="secondary"
              size="large"
              label={ctaLabel}
              onClick={() => history.push(to)}
            />
          )}
        </Content>
      </header>
    </Box>
  );
};
