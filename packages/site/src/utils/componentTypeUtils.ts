import {
  COMPONENT_TYPE_CONFIGS,
  ComponentType,
  ComponentTypeConfig,
  ContentExport,
  PlatformType,
} from "../types/content";

/**
 * Get all available component types for a given content export
 */
export function getAvailableComponentTypes(
  content: ContentExport,
): ComponentType[] {
  const types: ComponentType[] = [];

  // Check for web components (legacy and new)
  if (content.component?.element || content.component?.web) {
    types.push("web");
  }

  // Check for webSupported components
  if (content.component?.webSupported) {
    types.push("webSupported");
  }

  // Check for mobile components (legacy and new)
  if (content.component?.mobileElement || content.component?.mobile) {
    types.push("mobile");
  }

  return types;
}

/**
 * Get available platform types (web/mobile) for a content export
 */
export function getAvailablePlatformTypes(
  content: ContentExport,
): PlatformType[] {
  const availableTypes = getAvailableComponentTypes(content);
  const platforms = new Set<PlatformType>();

  availableTypes.forEach(type => {
    const config = getComponentTypeConfig(type);
    platforms.add(config.platform);
  });

  return Array.from(platforms);
}

/**
 * Get available versions for a specific platform
 */
export function getAvailableVersionsForPlatform(
  content: ContentExport,
  platform: PlatformType,
): ComponentType[] {
  const availableTypes = getAvailableComponentTypes(content);

  return availableTypes.filter(type => {
    const config = getComponentTypeConfig(type);

    return config.platform === platform;
  });
}

/**
 * Get the platform type for a component type
 */
export function getPlatformForComponentType(type: ComponentType): PlatformType {
  return getComponentTypeConfig(type).platform;
}

/**
 * Get the component element for a specific type (handles legacy and new structure)
 */
export function getComponentElement(
  content: ContentExport,
  type: ComponentType,
): unknown {
  switch (type) {
    case "web":
      return content.component?.web || content.component?.element;
    case "webSupported":
      return content.component?.webSupported;
    case "mobile":
      return content.component?.mobile || content.component?.mobileElement;
    default:
      return undefined;
  }
}

/**
 * Get the props for a specific type (handles legacy and new structure)
 */
export function getComponentProps(content: ContentExport, type: ComponentType) {
  switch (type) {
    case "web":
      return content.webProps || content.props;
    case "webSupported":
      return content.webSupportedProps;
    case "mobile":
      return content.mobileProps;
    default:
      return undefined;
  }
}

/**
 * Get the content component for a specific type (handles legacy and new structure)
 */
export function getComponentContent(
  content: ContentExport,
  type: ComponentType,
) {
  switch (type) {
    case "web":
      return content.webContent || content.content;
    case "webSupported":
      return content.webSupportedContent || content.content;
    case "mobile":
      return content.mobileContent || content.content;
    default:
      return content.content;
  }
}

/**
 * Get the notes component for a specific type (handles legacy and new structure)
 */
export function getComponentNotes(content: ContentExport, type: ComponentType) {
  switch (type) {
    case "web":
      return content.webNotes || content.notes;
    case "webSupported":
      return content.webSupportedNotes || content.notes;
    case "mobile":
      return content.mobileNotes || content.notes;
    default:
      return content.notes;
  }
}

/**
 * Get the links for a specific type (handles legacy and new structure)
 */
export function getComponentLinks(content: ContentExport, type: ComponentType) {
  switch (type) {
    case "web":
      return content.webLinks || content.links;
    case "webSupported":
      return content.webSupportedLinks;
    case "mobile":
      return content.mobileLinks || content.links;
    default:
      return content.links;
  }
}

/**
 * Get the configuration for a component type
 */
export function getComponentTypeConfig(
  type: ComponentType,
): ComponentTypeConfig {
  return COMPONENT_TYPE_CONFIGS[type];
}

/**
 * Get the default component type for a content export
 * Prefers webSupported over web, then falls back to mobile
 */
export function getDefaultComponentType(content: ContentExport): ComponentType {
  const availableTypes = getAvailableComponentTypes(content);

  // Prefer webSupported if available
  if (availableTypes.includes("webSupported")) return "webSupported";
  if (availableTypes.includes("web")) return "web";
  if (availableTypes.includes("mobile")) return "mobile";

  // Fallback (shouldn't happen with valid content)
  return "webSupported";
}

/**
 * Check if a component type is available for a content export
 */
export function isComponentTypeAvailable(
  content: ContentExport,
  type: ComponentType,
): boolean {
  return getAvailableComponentTypes(content).includes(type);
}
