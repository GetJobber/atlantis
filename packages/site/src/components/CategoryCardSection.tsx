import { PropsWithChildren } from "react";
import { Content, Heading } from "@jobber/components";
import { ContentCardWrapper } from "./ContentCardWrapper";

interface CategoryCardSectionProps {
  readonly category: string;
}

/**
 * A very cool grid-based wrapper to make the contents auto-scale in category mode.
 *
 * @param param0 {children: ReactNode}
 * @param category {string}
 * @returns ReactNode
 */
export const CategoryCardSection = ({
  category,
  children,
}: PropsWithChildren<CategoryCardSectionProps>) => {
  return (
    <Content spacing={"large"}>
      <Heading element={"h3"} level={4}>
        {category}
      </Heading>
      <ContentCardWrapper>{children}</ContentCardWrapper>
    </Content>
  );
};
