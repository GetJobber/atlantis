export interface ContentExport {
  content: unknown;
  props: unknown;
  component: {
    element: unknown;
    defaultProps: Record<string, unknown>;
  };
  title: string;
  description: string;
  links: { label: string; url: string }[];
}
