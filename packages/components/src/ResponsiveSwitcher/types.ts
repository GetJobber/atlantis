import { Spaces } from "../sharedHooks/useSpaces";

export interface ResponsiveSwitcherProps {
  readonly children: React.ReactNode;

  /** The minimum width of the top-level children. If this can't be met, the children will break to row. */
  readonly threshold: string;

  /** The amount of space between the children. Semantic tokens are available. */
  readonly gap?: Spaces | (string & NonNullable<unknown>);

  /** The HTML tag to render the container as. Defaults to `div`. */
  as?:
    | "section"
    | "article"
    | "ul"
    | "li"
    | "div"
    | "span"
    | "dl"
    | "dd"
    | "dt";

  /** Useful for dynamic content. If the number of children is greater than this, the children will break to row. */
  readonly limit?: number;
}
