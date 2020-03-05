/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx } from "theme-ui";
// import { Heading } from "../../../../../packages/components/src/Heading";
import { Heading } from "@jobber/components/src/Heading";

const margins = {
  1: ["var(--space-larger)", "var(--space-base)"],
  2: ["var(--space-large)", "var(--space-base)"],
  3: ["var(--space-base)", "var(--space-small)"],
  4: ["var(--space-base)", "var(--space-small)"],
  5: ["var(--space-base)", "var(--space-small)"],
  6: ["var(--space-base)", "var(--space-small)"],
};

const heading = level => {
  const Component = props => {
    return (
      <div
        id={props.id}
        sx={{
          marginTop: margins[level][0],
          marginBottom: margins[level][1],
        }}
      >
        <Heading level={level}>
          <a
            href={`#${props.id}`}
            sx={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {props.children}
          </a>
        </Heading>
      </div>
    );
  };

  Component.displayName = level;

  Component.propTypes = {
    id: PropTypes.string,
    children: PropTypes.string,
  };
  return Component;
};

export const h1 = heading(1);
export const h2 = heading(2);
export const h3 = heading(3);
export const h4 = heading(4);
export const h5 = heading(5);
export const h6 = heading(6);
