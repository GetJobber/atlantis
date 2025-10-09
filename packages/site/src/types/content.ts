export interface ContentExport {
  content: (props?: unknown) => JSX.Element;
  webRebuiltContent?: (props?: unknown) => JSX.Element;
  props?: Array<{
    description: string;
    displayName: string;
    filePath: string;
    methods: Array<string>;
    props: Record<string, GeneratedProp | undefined>;
    tags: Record<string, GeneratedTag | undefined | string>;
  }>;
  mobileProps?: Array<{
    description: string;
    displayName: string;
    filePath: string;
    methods: Array<string>;
    props: Record<string, GeneratedProp | undefined>;
    tags: Record<string, GeneratedTag>;
  }>;
  webRebuiltProps?: Array<{
    description: string;
    displayName: string;
    filePath: string;
    methods: Array<string>;
    props: Record<string, GeneratedProp | undefined>;
    tags: Record<string, GeneratedTag>;
  }>;
  component: {
    element?: unknown;
    mobileElement?: unknown;
    webRebuiltElement?: unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Will be deleted soon, don't worry.
    defaultProps?: any;
  };
  title: string;
  description?: string;
  links: ContentExportLinks[];
  webRebuiltLinks?: ContentExportLinks[];
  notes?: () => JSX.Element;
  webRebuiltNotes?: () => JSX.Element;
}
interface GeneratedTag {
  name: string;
}
interface GeneratedProp {
  defaultValue: null | object;
  description?: string;
  name: string;
  parent?: { fileName: string; name: string };
  required: boolean;
  type: { name: string };
}

export interface ContentExportLinks {
  label: string;
  url: string;
  type?: "web" | "mobile";
}
