export interface CommonAtlantisProps {
  data?: { [key: `data-${string}`]: string };
  aria?: React.AriaAttributes;
  role?: string;
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
