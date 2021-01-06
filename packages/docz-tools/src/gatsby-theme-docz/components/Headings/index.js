/** @jsx jsx */
import { jsx } from "theme-ui";
import { Heading } from "@jobber/components/Heading";
import * as styles from "./styles";

const heading = level => {
  const Component = props => {
    const style = { ...styles };

    return (
      <div id={props.id} sx={style[`h${level}`]}>
        <Heading level={level}>
          <a href={`#${props.id}`}>{props.children}</a>
        </Heading>
      </div>
    );
  };

  Component.displayName = level;

  return Component;
};

export const h1 = heading(1);
export const h2 = heading(2);
export const h3 = heading(3);
export const h4 = heading(4);
export const h5 = heading(5);
export const h6 = heading(6);
