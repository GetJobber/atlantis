import { PropsWithChildren } from "react";
import { Typography } from "@jobber/components";
import { ContentCardWrapper } from "./ContentCardWrapper";
import styles from "./CategoryCardSection.module.css";

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
    <div className={styles.categoryCardSection}>
      <Typography
        element={"h6"}
        fontWeight={"bold"}
        size={"small"}
        textColor={"textSecondary"}
      >
        {category.toUpperCase()}
      </Typography>
      <ContentCardWrapper>{children}</ContentCardWrapper>
    </div>
  );
};
