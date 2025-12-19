/* eslint-disable max-statements */

// Import changelog content as raw text using Vite's ?raw suffix
import ComponentsChangelog from "../../../../components/CHANGELOG.md?raw";
import ComponentsNativeChangelog from "../../../../components-native/CHANGELOG.md?raw";
import DesignChangelog from "../../../../design/CHANGELOG.md?raw";
import DocxChangelog from "../../../../docx/CHANGELOG.md?raw";
import EslintConfigChangelog from "../../../../eslint-config/CHANGELOG.md?raw";
import FormattersChangelog from "../../../../formatters/CHANGELOG.md?raw";
import GeneratorsChangelog from "../../../../generators/CHANGELOG.md?raw";
import HooksChangelog from "../../../../hooks/CHANGELOG.md?raw";
import StylelintConfigChangelog from "../../../../stylelint-config/CHANGELOG.md?raw";

export interface ChangelogEntry {
  readonly package: string;
  readonly version: string;
  readonly date: string;
  readonly changeType: string;
  readonly description: string;
  readonly prNumber?: string;
  readonly prUrl?: string;
  readonly commitHash?: string;
  readonly commitUrl?: string;
  readonly isBreakingChange: boolean;
  readonly isBumpOnly: boolean;
  readonly affectedPackages?: string[];
  readonly isMultiPackage?: boolean;
  readonly isDuplicatedEntry?: boolean;
}

interface ChangelogSource {
  readonly package: string;
  readonly content: string;
}

interface ParsingState {
  currentVersion: string;
  currentDate: string;
  currentChangeType: string;
  inVersionSection: boolean;
}

const changelogSources: ChangelogSource[] = [
  { package: "components", content: ComponentsChangelog },
  { package: "components-native", content: ComponentsNativeChangelog },
  { package: "design", content: DesignChangelog },
  { package: "docx", content: DocxChangelog },
  { package: "eslint-config", content: EslintConfigChangelog },
  { package: "formatters", content: FormattersChangelog },
  { package: "generators", content: GeneratorsChangelog },
  { package: "hooks", content: HooksChangelog },
  { package: "stylelint-config", content: StylelintConfigChangelog },
];

/**
 * Dismantles a changelog description by progressively extracting and removing pieces
 * Returns both the extracted metadata and the clean description
 */
const dismantleDescription = (originalDescription: string) => {
  let remaining = originalDescription;
  const extracted = {
    prNumber: undefined as string | undefined,
    prUrl: undefined as string | undefined,
    commitHash: undefined as string | undefined,
    commitUrl: undefined as string | undefined,
  };

  // Extract and remove PR links: [#1234](https://github.com/repo/pull/1234)
  const prMatch = remaining.match(/\[#(\d+)\]\(([^)]+)\)/);

  if (prMatch) {
    extracted.prNumber = prMatch[1];
    extracted.prUrl = prMatch[2];
    remaining = remaining.replace(prMatch[0], "").trim();
  }

  // Extract and remove commit links: [a1b2c3d](https://github.com/repo/commit/a1b2c3d)
  const commitMatch = remaining.match(/\[([a-f0-9]{7,})\]\(([^)]+)\)/);

  if (commitMatch) {
    extracted.commitHash = commitMatch[1];
    extracted.commitUrl = commitMatch[2];
    remaining = remaining.replace(commitMatch[0], "").trim();
  }

  // Remove task numbers from beginning: [JOB-12345]
  remaining = remaining.replace(/^\[([A-Z]+-\d+)\]\s*/, "").trim();

  // Remove bold formatting: **text**
  remaining = remaining.replace(/\*\*([^*]+)\*\*/g, "$1").trim();

  // Remove "closes" references: , closes [#567](...)
  remaining = remaining.replace(/,?\s*closes\s*\[#\d+\]\([^)]+\)/gi, "").trim();

  // Remove leftover "closes" text
  remaining = remaining.replace(/,?\s*closes\s*/gi, "").trim();

  // Remove "breaking" text (tracked separately)
  remaining = remaining.replace(/\b[Bb]reaking\s*/g, "").trim();

  // Remove empty parentheses patterns
  remaining = remaining.replace(/\(\s*\)/g, "").trim();

  // Clean up trailing commas and normalize whitespace
  remaining = remaining.replace(/,\s*$/, "").replace(/\s+/g, " ").trim();

  return {
    ...extracted,
    cleanDescription: remaining,
  };
};

/**
 * Creates a changelog entry
 */
const createChangelogEntry = (
  packageName: string,
  state: ParsingState,
  description: string,
  isBumpOnly = false,
): ChangelogEntry => {
  const dismantled = dismantleDescription(description);

  const isBreakingChange =
    description.toLowerCase().includes("breaking") ||
    description.includes("BREAKING CHANGE") ||
    state.currentChangeType.toLowerCase().includes("breaking") ||
    state.currentChangeType.toLowerCase().includes("major");

  return {
    package: packageName,
    version: state.currentVersion,
    date: state.currentDate,
    changeType: isBumpOnly ? "Version Bump" : state.currentChangeType,
    description: isBumpOnly ? "" : dismantled.cleanDescription,
    prNumber: dismantled.prNumber,
    prUrl: dismantled.prUrl,
    commitHash: dismantled.commitHash,
    commitUrl: dismantled.commitUrl,
    isBreakingChange,
    isBumpOnly,
  };
};

/**
 * Parses a changelog markdown string and extracts structured data
 */
const parseChangelogContent = (
  content: string,
  packageName: string,
): ChangelogEntry[] => {
  const entries: ChangelogEntry[] = [];

  // Extract all version sections at once
  const versionSections = content.match(
    /##?\s*\[([^\]]+)\]\([^)]*\)\s*\(([^)]+)\)([\s\S]*?)(?=##?\s*\[|$)/g,
  );

  if (!versionSections) return entries;

  for (const section of versionSections) {
    // Extract version and date from section header
    const versionMatch = section.match(
      /##?\s*\[([^\]]+)\]\([^)]*\)\s*\(([^)]+)\)/,
    );
    if (!versionMatch) continue;

    const version = versionMatch[1];
    const date = versionMatch[2].trim();

    // Check for version bump only
    if (section.includes("Version bump only")) {
      entries.push(
        createChangelogEntry(
          packageName,
          {
            currentVersion: version,
            currentDate: date,
            currentChangeType: "Version Bump",
            inVersionSection: true,
          },
          "Version bump only",
          true,
        ),
      );
      continue;
    }

    // Extract all change type sections within this version
    const changeTypeSections = section.match(
      /###\s*([^\n]+)([\s\S]*?)(?=###|$)/g,
    );

    if (changeTypeSections) {
      for (const typeSection of changeTypeSections) {
        // Extract change type
        const typeMatch = typeSection.match(/###\s*([^\n]+)/);
        if (!typeMatch) continue;

        const changeType = typeMatch[1].trim();

        // Extract all bullet points for this change type
        const bulletPoints = typeSection.match(/^\s*\*\s*(.+)$/gm);

        if (bulletPoints) {
          for (const bullet of bulletPoints) {
            const description = bullet.replace(/^\s*\*\s*/, "");
            entries.push(
              createChangelogEntry(
                packageName,
                {
                  currentVersion: version,
                  currentDate: date,
                  currentChangeType: changeType,
                  inVersionSection: true,
                },
                description,
              ),
            );
          }
        }
      }
    }
  }

  return entries;
};

/**
 * Enhances changelog entries by identifying multi-package PRs
 */
const enhanceWithMultiPackageInfo = (
  entries: ChangelogEntry[],
): ChangelogEntry[] => {
  // Group entries by PR number
  const prGroups = new Map<string, ChangelogEntry[]>();

  entries.forEach(entry => {
    if (entry.prNumber) {
      const existing = prGroups.get(entry.prNumber) || [];
      existing.push(entry);
      prGroups.set(entry.prNumber, existing);
    }
  });

  // Create a map of enhanced entries
  const enhancedMap = new Map<ChangelogEntry, ChangelogEntry>();

  prGroups.forEach(groupEntries => {
    if (groupEntries.length > 1) {
      // Check if entries are actually different or just duplicated
      const uniqueDescriptions = [
        ...new Set(groupEntries.map(e => e.description)),
      ];
      const affectedPackages = [...new Set(groupEntries.map(e => e.package))];

      // If all entries have the same description, it might be a changelog generation issue
      // rather than a true multi-package PR
      const isDuplicatedEntry = uniqueDescriptions.length === 1;

      if (isDuplicatedEntry) {
        console.warn(
          `Potential duplicated changelog entry for PR ${groupEntries[0].prNumber}:`,
          {
            packages: affectedPackages,
            description: uniqueDescriptions[0],
            entries: groupEntries.length,
          },
        );
      }

      groupEntries.forEach(entry => {
        enhancedMap.set(entry, {
          ...entry,
          affectedPackages,
          isMultiPackage: true,
          // Add a flag to indicate if this might be a duplicated entry
          ...(isDuplicatedEntry && { isDuplicatedEntry: true }),
        });
      });
    } else {
      // Single package PR - add the fields but mark as single package
      const entry = groupEntries[0];

      enhancedMap.set(entry, {
        ...entry,
        affectedPackages: [entry.package],
        isMultiPackage: false,
      });
    }
  });

  // Return enhanced entries, preserving original entries that don't have PR numbers
  return entries.map(entry => {
    const enhanced = enhancedMap.get(entry);

    if (enhanced) {
      return enhanced;
    }

    // For entries without PR numbers, add default values
    return {
      ...entry,
      affectedPackages: [entry.package],
      isMultiPackage: false,
    };
  });
};

/**
 * Gets a display-friendly string for affected packages
 */
export const getAffectedPackagesDisplay = (entry: ChangelogEntry): string => {
  if (!entry.affectedPackages || entry.affectedPackages.length === 0) {
    return entry.package;
  }

  if (entry.affectedPackages.length === 1) {
    return entry.affectedPackages[0];
  }

  // For multiple packages, show them in a readable format
  if (entry.affectedPackages.length === 2) {
    return entry.affectedPackages.join(" & ");
  }

  // For 3+ packages, show first few and "& X more"
  const first = entry.affectedPackages.slice(0, 2);
  const remaining = entry.affectedPackages.length - 2;

  return `${first.join(", ")} & ${remaining} more`;
};

/**
 * Filters out likely duplicated entries to show only one per PR
 */
export const deduplicateEntries = (
  entries: ChangelogEntry[],
): ChangelogEntry[] => {
  const prGroups = new Map<string, ChangelogEntry[]>();
  const result: ChangelogEntry[] = [];

  // Group by PR number
  entries.forEach(entry => {
    if (entry.prNumber && entry.isDuplicatedEntry) {
      const existing = prGroups.get(entry.prNumber) || [];
      existing.push(entry);
      prGroups.set(entry.prNumber, existing);
    } else {
      // Keep non-duplicated entries as-is
      result.push(entry);
    }
  });

  // For duplicated PR groups, keep only the "primary" package entry
  prGroups.forEach(groupEntries => {
    // Prefer the entry that matches the description's mentioned package
    // e.g., "**components:** React 19 support" should stay with components package
    const descriptionPackageMatch = groupEntries.find(entry => {
      const lowerDesc = entry.description.toLowerCase();

      return lowerDesc.includes(entry.package.toLowerCase());
    });

    if (descriptionPackageMatch) {
      result.push(descriptionPackageMatch);
    } else {
      // Fallback: keep the first entry
      result.push(groupEntries[0]);
    }
  });

  return result;
};

/**
 * Groups changelog entries by PR number for display purposes
 */
export const groupEntriesByPR = (
  entries: ChangelogEntry[],
): Map<string, ChangelogEntry[]> => {
  const groups = new Map<string, ChangelogEntry[]>();

  entries.forEach(entry => {
    if (entry.prNumber) {
      const existing = groups.get(entry.prNumber) || [];
      existing.push(entry);
      groups.set(entry.prNumber, existing);
    } else {
      // For entries without PR numbers, create unique groups
      const key = `${entry.package}-${entry.version}-${entry.description.slice(
        0,
        50,
      )}`;
      groups.set(key, [entry]);
    }
  });

  return groups;
};

/**
 * Parses all changelog files and returns combined structured data
 */
export const parseAllChangelogs = (): ChangelogEntry[] => {
  const allEntries: ChangelogEntry[] = [];

  for (const source of changelogSources) {
    try {
      const entries = parseChangelogContent(source.content, source.package);
      allEntries.push(...entries);
    } catch (error) {
      console.error(`Error parsing changelog for ${source.package}:`, error);
    }
  }

  // Enhance entries with multi-package information
  const enhancedEntries = enhanceWithMultiPackageInfo(allEntries);

  // Sort by date (newest first) and then by package
  return enhancedEntries.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime(); // Newest first
    }

    return a.package.localeCompare(b.package);
  });
};

/**
 * Filters changelog entries by various criteria
 */
export const filterChangelogEntries = (
  entries: ChangelogEntry[],
  filters: {
    readonly packages?: string[];
    readonly changeTypes?: string[];
    readonly dateFrom?: string;
    readonly dateTo?: string;
    readonly excludeBumpOnly?: boolean;
    readonly onlyBreakingChanges?: boolean;
    readonly excludeDuplicatedEntries?: boolean;
  } = {},
): ChangelogEntry[] => {
  return entries.filter(entry => {
    // Filter by packages
    if (filters.packages && filters.packages.length > 0) {
      if (!filters.packages.includes(entry.package)) return false;
    }

    // Filter by change types
    if (filters.changeTypes && filters.changeTypes.length > 0) {
      const matchesType = filters.changeTypes.some(filterType => {
        // Handle special filter types
        if (filterType === "Breaking change") {
          return entry.isBreakingChange;
        }

        if (filterType === "Reversion") {
          return entry.changeType.toLowerCase().includes("revert");
        }

        // Handle regular change types
        return entry.changeType === filterType;
      });

      if (!matchesType) return false;
    }

    // Filter by date range
    if (filters.dateFrom) {
      const entryDate = new Date(entry.date);
      const fromDate = new Date(filters.dateFrom);

      if (entryDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const entryDate = new Date(entry.date);
      const toDate = new Date(filters.dateTo);

      if (entryDate > toDate) return false;
    }

    // Exclude version bump only entries
    if (filters.excludeBumpOnly && entry.isBumpOnly) return false;

    // Only breaking changes
    if (filters.onlyBreakingChanges && !entry.isBreakingChange) return false;

    // Exclude duplicated entries
    if (filters.excludeDuplicatedEntries && entry.isDuplicatedEntry) {
      return false;
    }

    return true;
  });
};
