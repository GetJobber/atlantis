import {
  AtlantisThemeContextProvider,
  Box,
  Button,
  Content,
  Heading,
} from "@jobber/components";
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
  imageURL = "/img_collage.jpg",
}: HeaderBlockProps) => {
  const history = useHistory();

  return (
    <Box background="base-blue--900">
      <header
        style={{ backgroundImage: `url(${imageURL})` }}
        className="headerBlock"
      >
        <Content spacing="large">
          <div>
            <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
              <Content spacing="large">
                <Heading level={1}>{title}</Heading>
                <Heading level={4} element={"p"}>
                  {body}
                </Heading>
              </Content>
            </AtlantisThemeContextProvider>
          </div>
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
