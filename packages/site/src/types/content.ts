// Define supported platform types (for iframes/rendering)
export type PlatformType = "web" | "mobile";

// Define supported component types (including versions)
export type ComponentType = "web" | "webSupported" | "mobile";

// Define component type configuration
export interface ComponentTypeConfig {
  label: string;
  displayName: string;
  platform: PlatformType; // Which iframe/platform to use
  isVersion?: boolean; // Whether this is a version of another type
  baseType?: ComponentType; // The base type this is a version of
  warningMessage?: string;
}

export const COMPONENT_TYPE_CONFIGS: Record<
  ComponentType,
  ComponentTypeConfig
> = {
  web: {
    label: "Web (Legacy)",
    displayName: "Legacy",
    platform: "web",
  },
  webSupported: {
    label: "Web (Supported)",
    displayName: "Supported",
    platform: "web", // Uses same iframe as web
    isVersion: true,
    baseType: "web",
  },
  mobile: {
    label: "Mobile",
    displayName: "Mobile",
    platform: "mobile",
    warningMessage:
      "Due to distinctions between web and native platform, this may not render accurately in a web browser.",
  },
};

// Generic props structure
export interface ComponentProps {
  description: string;
  displayName: string;
  filePath: string;
  methods: Array<string>;
  props: Record<string, GeneratedProp | undefined>;
  tags: Record<string, GeneratedTag | undefined | string>;
}

export interface ContentExport {
  // Design content (shared across all types)
  content: (props?: unknown) => JSX.Element;

  // Type-specific content
  webContent?: (props?: unknown) => JSX.Element;
  webSupportedContent?: (props?: unknown) => JSX.Element;
  mobileContent?: (props?: unknown) => JSX.Element;

  // Type-specific props
  props?: Array<ComponentProps>;
  webProps?: Array<ComponentProps>;
  webSupportedProps?: Array<ComponentProps>;
  mobileProps?: Array<ComponentProps>;

  // Component elements
  component: {
    // Legacy support
    element?: unknown;
    mobileElement?: unknown;

    // New flexible structure
    web?: unknown;
    webSupported?: unknown;
    mobile?: unknown;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Will be deleted soon, don't worry.
    defaultProps?: any;
  };

  title: string;
  description?: string;

  // Type-specific links
  links: ContentExportLinks[];
  webLinks?: ContentExportLinks[];
  webSupportedLinks?: ContentExportLinks[];
  mobileLinks?: ContentExportLinks[];

  // Type-specific notes
  notes?: () => JSX.Element;
  webNotes?: () => JSX.Element;
  webSupportedNotes?: () => JSX.Element;
  mobileNotes?: () => JSX.Element;
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
