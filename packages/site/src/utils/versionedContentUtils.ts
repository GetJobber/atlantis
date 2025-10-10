import { ContentExport, VersionedContentExport } from "../types/content";

/**
 * Get the content for a specific version
 */
export function getVersionedContent(
  content: VersionedContentExport,
  version?: "v1" | "v2",
): ContentExport | undefined {
  // If no version specified, prefer v2, then v1
  if (!version) {
    return content.v2 || content.v1;
  }

  // Return version-specific content if available
  return content[version];
}

/**
 * Check if a component has multiple versions
 */
export function hasMultipleVersions(content: VersionedContentExport): boolean {
  return !!(content.v1 && content.v2);
}

/**
 * Get available versions for a component
 */
export function getAvailableVersions(
  content: VersionedContentExport,
): ("v1" | "v2")[] {
  const versions: ("v1" | "v2")[] = [];

  if (content.v1) {
    versions.push("v1");
  }

  if (content.v2) {
    versions.push("v2");
  }

  return versions;
}

/**
 * Get the default version for a component (prefer v2 if available, otherwise v1)
 */
export function getDefaultVersion(
  content: VersionedContentExport,
): "v1" | "v2" | undefined {
  if (content.v2) {
    return "v2";
  }

  if (content.v1) {
    return "v1";
  }

  return undefined;
}
