export interface ContentExport {
  content: (props?: unknown) => JSX.Element;
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
  component: {
    element?: unknown;
    mobileElement?: unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Will be deleted soon, don't worry.
    defaultProps?: any;
  };
  title: string;
  description?: string;
  links: ContentExportLinks[];
  notes?: () => JSX.Element;
  /**
   * Optional versions for a component (e.g., v1 vs v2). When present, the docs UI can
   * render a version selector and override per-version fields like content, props,
   * notes, links, and component preview code.
   */
  versions?: VersionExport[];
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

/**
 * Partial overrides to support per-version docs. Any field provided here will
 * override the top-level field when this version is active. Unset fields fall back
 * to the top-level definition to remain backward compatible.
 */
export interface VersionExport {
  /**
   * Label to display in the version selector (e.g., "Web v1", "Web v2 (Rebuilt)")
   */
  label: string;

  content?: (props?: unknown) => JSX.Element;
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
  component?: {
    element?: unknown;
    mobileElement?: unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches ContentExport
    defaultProps?: any;
  };
  title?: string;
  description?: string;
  links?: ContentExportLinks[];
  notes?: () => JSX.Element;
}
