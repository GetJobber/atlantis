export interface ContentExport {
  content: unknown;
  props: Array<{
    description: string;
    displayName: string;
    filePath: string;
    methods: Array<string>;
    props: Record<string, GeneratedProp | undefined>;
    tags: Record<string, GeneratedTag>;
  }>;
  component: {
    element: unknown;
    defaultProps: Record<
      string,
      string | boolean | JSX.Element | [] | (() => void)
    >;
  };
  title: string;
  description: string;
  links: ContentExportLinks[];
}
interface GeneratedTag {
  name: string;
}
interface GeneratedProp {
  declarations: Array<{ fileName: string; name: string }>;
  defaultValue: null | object;
  description: string;
  name: string;
  parent: { fileName: string; name: string };
  required: boolean;
  type: { name: string };
}

export interface ContentExportLinks {
  label: string;
  url: string;
}