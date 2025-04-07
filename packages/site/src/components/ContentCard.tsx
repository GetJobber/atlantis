import {
  AtlantisThemeContextProvider,
  Card,
  Content,
  Heading,
  useAtlantisTheme,
} from "@jobber/components";
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
  const { theme } = useAtlantisTheme();

  return (
    <Card
      elevation="low"
      onClick={() => {
        history.push(to);
        onClick?.();
      }}
    >
      {!component ? (
        <AtlantisThemeContextProvider dangerouslyOverrideTheme="light">
          {imageURL && (
            <div
              style={
                theme === "dark"
                  ? {
                      background: "var(--color-base-blue--200)",
                      borderRadius: "var(--radius-base) var(--radius-base) 0 0",
                    }
                  : {}
              }
            >
              <img
                style={{ width: "100%", mixBlendMode: "multiply" }}
                src={imageURL}
              />
            </div>
          )}
        </AtlantisThemeContextProvider>
      ) : (
        <ComponentWrapper>{component()}</ComponentWrapper>
      )}
      <Content>
        <Heading level={4}>{title}</Heading>
      </Content>
    </Card>
  );
};
