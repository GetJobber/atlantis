export interface FrameProps {
  readonly children: React.ReactNode;
  /** The horizontal (width) part of the aspect ratio */
  readonly aspectX?: number;
  /** The vertical (height) part of the aspect ratio */
  readonly aspectY?: number;
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
}
