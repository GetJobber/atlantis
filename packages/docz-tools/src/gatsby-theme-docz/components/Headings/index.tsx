/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { PropsWithChildren } from "react";
import { Heading } from "@jobber/components/Heading";
import * as styles from "./styles";

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingsProps {
  readonly id: string;
}

const heading = (level: HeadingLevels) => {
  const Component = ({ id, children }: PropsWithChildren<HeadingsProps>) => {
    return (
      <Box id={id} sx={getLevelStyles()}>
        <Heading level={level}>
          <a href={`#${id}`}>{children}</a>
        </Heading>
      </Box>
    );
  };

  function getLevelStyles() {
    switch (level) {
      case 2:
        return styles.h2;
      case 3:
        return styles.h3;
      case 4:
        return styles.h4;
      case 5:
        return styles.h5;
      case 6:
        return styles.h6;
      default:
        return styles.h1;
    }
  }

  Component.displayName = level;

  return Component;
};

export const h1 = heading(1);
export const h2 = heading(2);
export const h3 = heading(3);
export const h4 = heading(4);
export const h5 = heading(5);
export const h6 = heading(6);
