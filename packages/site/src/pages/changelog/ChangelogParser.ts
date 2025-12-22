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
  readonly timestamp: number;
  readonly changeType: string;
  readonly description: string;
  readonly prNumber?: string;
  readonly prUrl?: string;
  readonly affectedPackages?: string[];
  readonly isMultiPackage?: boolean;
  readonly isDuplicatedEntry?: boolean;
}

export const CHANGE_TYPES = {
  BUG_FIX: "Bug fix",
  FEATURE: "Feature",
  REVERSION: "Reversion",
  BREAKING_CHANGE: "Breaking change",
  VERSION_BUMP: "Version bump",
} as const;

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
    prNumber: "",
    prUrl: "",
    commitHash: "",
    commitUrl: "",
  };

  // Extract PR links: [#1234](https://github.com/repo/pull/1234)
  const prMatch = remaining.match(/\[#(\d+)\]\(([^)]+)\)/);

  if (prMatch) {
    extracted.prNumber = prMatch[1];
    extracted.prUrl = prMatch[2];
  }

  // Remove all markdown links: [text](url)
  remaining = remaining.replace(/\[[^\]]+\]\([^)]+\)/g, "").trim();

  // Remove bold formatting: **text**
  remaining = remaining.replace(/\*\*([^*]+)\*\*/g, "$1").trim();

  // Remove task numbers: [JOB-12345]
  remaining = remaining.replace(/\[([A-Z]+-\d+)\]/g, "").trim();

  // Remove change type or package prefixes from beginning: feat: description or components: description
  while (remaining.match(/^[a-z0-9-]+:\s*/i)) {
    remaining = remaining.replace(/^[a-z0-9-]+:\s*/i, "").trim();
  }

  // Remove "closes" references: , closes [#567](...)
  remaining = remaining.replace(/,?\s*closes\s*\[#\d+\]\([^)]+\)/gi, "").trim();

  // Remove leftover "closes" text
  remaining = remaining.replace(/,?\s*closes\s*/gi, "").trim();

  // Remove "breaking" text
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

const normalizeChangeType = (type: string, isBreaking = false): string => {
  if (isBreaking) return CHANGE_TYPES.BREAKING_CHANGE;
  const lower = type.toLowerCase();
  if (lower.includes("revert")) return CHANGE_TYPES.REVERSION;
  if (lower.includes("feat")) return CHANGE_TYPES.FEATURE;

  if (lower.includes("bug") || lower.includes("fix")) {
    return CHANGE_TYPES.BUG_FIX;
  }
  if (lower.includes("bump")) return CHANGE_TYPES.VERSION_BUMP;

  return type;
};

/**
 * Parses a date string and returns a timestamp
 */
const parseDateToTimestamp = (dateString: string): number => {
  let date = new Date(dateString);

  if (isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = new Date(dateString + "T00:00:00");
  }

  return isNaN(date.getTime()) ? 0 : date.getTime();
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
    timestamp: parseDateToTimestamp(state.currentDate),
    changeType: normalizeChangeType(
      isBumpOnly ? CHANGE_TYPES.VERSION_BUMP : state.currentChangeType,
      isBreakingChange,
    ),
    description: isBumpOnly ? "" : dismantled.cleanDescription,
    prNumber: dismantled.prNumber,
    prUrl: dismantled.prUrl,
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
            currentChangeType: CHANGE_TYPES.VERSION_BUMP,
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
 * Gets all available packages from a list of entries
 */
export const getAvailablePackages = (entries: ChangelogEntry[]): string[] => {
  const packages = new Set(entries.map(entry => entry.package));

  return Array.from(packages).sort();
};

/**
 * Gets all available change types from a list of entries
 */
export const getAvailableChangeTypes = (
  entries: ChangelogEntry[],
): string[] => {
  const types = new Set(entries.map(entry => entry.changeType));

  return Array.from(types).sort();
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
    if (a.timestamp !== b.timestamp) {
      return b.timestamp - a.timestamp; // Newest first
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
      if (!filters.changeTypes.includes(entry.changeType)) return false;
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromTimestamp = parseDateToTimestamp(filters.dateFrom);

      if (entry.timestamp < fromTimestamp) return false;
    }

    if (filters.dateTo) {
      const toTimestamp = parseDateToTimestamp(filters.dateTo);

      if (entry.timestamp > toTimestamp) return false;
    }

    // Exclude duplicated entries
    if (filters.excludeDuplicatedEntries && entry.isDuplicatedEntry) {
      return false;
    }

    return true;
  });
};
