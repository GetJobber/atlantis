export interface CommonAtlantisProps {
  /** Standard HTML data attributes. Accepts anything in a {{"data-key":"value"}} format. */
  data?: { [key: `data-${string}`]: string };
  /** Standard HTML aria attributes. Accepts all standard HTML aria attributes. */
  aria?: React.AriaAttributes;
  /** Standard HTML role attribute. */
  role?: React.AriaRole;
  /** Standard HTML id attribute. */
  id?: string;
}
export type CommonAllowedElements =
  | "section"
  | "article"
  | "ul"
  | "li"
  | "div"
  | "span"
  | "dl"
  | "dd"
  | "dt";
