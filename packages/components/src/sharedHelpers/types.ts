export interface CommonAtlantisProps {
  /** Standard HTML data attributes. Accepts anything in a {{"data-key":"value"}} format. */
  dataAttributes?: { [key: `data-${string}`]: string };
  /** Standard HTML aria attributes. Accepts all standard HTML aria attributes. */
  ariaAttributes?: React.AriaAttributes;
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
