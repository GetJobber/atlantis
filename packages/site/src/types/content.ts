export interface ContentExport {
  content: unknown;
  props: unknown;
  component: {
    element: unknown;
    defaultProps: Record<string, string>;
  };
  title: string;
  description: string;
  links: ContentExportLinks[];
}

export interface ContentExportLinks {
  label: string;
  url: string;
}
