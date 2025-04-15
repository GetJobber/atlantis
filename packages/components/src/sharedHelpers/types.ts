export interface CommonAtlantisProps {
  data?: Record<string, string>;
  aria?: Record<string, string>;
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
