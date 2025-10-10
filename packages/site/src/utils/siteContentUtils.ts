import { getVersionedContent } from "./versionedContentUtils";
import {
  ContentExport,
  SiteContentItem,
  VersionName,
  VersionedContentExport,
} from "../types/content";

// This would be the type for the SiteContent object
export type SiteContentType = Record<string, SiteContentItem>;

/**
 * Check if a content item is versioned
 */
function isVersionedContent(
  content: SiteContentItem,
): content is VersionedContentExport {
  return "v1" in content || "v2" in content;
}

/**
 * Get content for a specific component and version
 * Usage: getSiteContent(SiteContent, "Autocomplete", "v2")
 */
export function getSiteContent(
  siteContent: SiteContentType,
  componentName: string,
  version?: VersionName,
): ContentExport {
  const componentContent = siteContent[componentName];

  // If it's versioned content, use the versioned utility
  if (isVersionedContent(componentContent)) {
    const versionedContent = getVersionedContent(componentContent, version);

    // If the requested version doesn't exist, fallback to default (v2 or v1)
    if (!versionedContent) {
      const defaultContent = getVersionedContent(componentContent); // No version = default

      if (!defaultContent) {
        throw new Error(
          `No content available for component "${componentName}"`,
        );
      }

      return defaultContent;
    }

    return versionedContent;
  }

  // If it's regular ContentExport, return as-is (ignore version parameter)
  return componentContent as ContentExport;
}

/**
 * Check if a component has multiple versions
 */
export function hasComponentVersions(
  siteContent: SiteContentType,
  componentName: string,
): boolean {
  const componentContent = siteContent[componentName];

  if (!componentContent) {
    return false;
  }

  // Only versioned content can have multiple versions
  if (!isVersionedContent(componentContent)) {
    return false;
  }

  return !!(componentContent.v1 && componentContent.v2);
}

/**
 * Get available versions for a component
 */
export function getComponentVersions(
  siteContent: SiteContentType,
  componentName: string,
): VersionName[] {
  const componentContent = siteContent[componentName];

  if (!componentContent) {
    return [];
  }

  // Only versioned content can have versions
  if (!isVersionedContent(componentContent)) {
    return [];
  }

  const versions: ("v1" | "v2")[] = [];

  if (componentContent.v1) {
    versions.push("v1");
  }

  if (componentContent.v2) {
    versions.push("v2");
  }

  return versions;
}

/**
 * Get the default version for a component
 */
export function getDefaultComponentVersion(
  siteContent: SiteContentType,
  componentName: string,
): VersionName | undefined {
  const componentContent = siteContent[componentName];

  if (!componentContent) {
    return undefined;
  }

  // Only versioned content can have versions
  if (!isVersionedContent(componentContent)) {
    return undefined;
  }

  if (componentContent.v2) {
    return "v2";
  }

  if (componentContent.v1) {
    return "v1";
  }

  return undefined;
}
