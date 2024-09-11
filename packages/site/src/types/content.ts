import { ValueState } from "./services";

export interface ContentExport {
  content: unknown;
  props: unknown;
  component: {
    element: unknown;
    props: Record<string, unknown>;
    code: string;
    defaultProps: ValueState;
  };
  title: string;
  description: string;
  links: { label: string; url: string }[];
}
