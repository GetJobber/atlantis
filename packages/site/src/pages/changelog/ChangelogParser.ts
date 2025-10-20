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
 * Parses version header and extracts version and date
 */
const parseVersionHeader = (
  line: string,
): { version: string; date: string } | null => {
  const versionMatch = line.match(/^##?\s*\[([^\]]+)\]\([^)]*\)\s*\(([^)]+)\)/);

  if (versionMatch) {
    return {
      version: versionMatch[1],
      date: versionMatch[2].trim(),
    };
  }

  return null;
};

/**
 * Parses change type section header
 */
const parseChangeType = (line: string): string | null => {
  const changeTypeMatch = line.match(/^###\s*(.+)/);

  return changeTypeMatch ? changeTypeMatch[1] : null;
};

/**
 * Cleans changelog description by removing links and formatting
 */
const cleanDescription = (description: string): string => {
  return description
    .replace(/\s*\[#\d+\]\([^)]+\)\s*/g, "") // Remove PR links
    .replace(/\s*\[([a-f0-9]{7,})\]\([^)]+\)\s*/g, "") // Remove commit links
    .replace(/\*\*[^*]+\*\*/g, "") // Remove all bold text in **text** format
    .replace(/,\s*closes\s*\[#\d+\]\([^)]+\)/, "") // Remove "closes #xxx" references
    .replace(/\s*\(\s*\)\s*\(\s*\)\s*$/, "") // Remove empty parentheses patterns like () ()
    .replace(/\s*\(\s*\)\s*$/, "") // Remove single trailing empty parentheses
    .replace(/\b[Bb]reaking\b/g, "") // Remove "Breaking" or "breaking" text
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/^\[([A-Z]+-\d+)\]\s*/, "") // Remove task numbers from beginning
    .trim();
};

/**
 * Extracts PR and commit information from description
 */
const extractLinkInfo = (description: string) => {
  const prMatch = description.match(/\[#(\d+)\]\(([^)]+)\)/);
  const commitMatch = description.match(/\[([a-f0-9]{7,})\]\(([^)]+)\)/);

  return {
    prNumber: prMatch ? prMatch[1] : undefined,
    prUrl: prMatch ? prMatch[2] : undefined,
    commitHash: commitMatch ? commitMatch[1] : undefined,
    commitUrl: commitMatch ? commitMatch[2] : undefined,
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
  const linkInfo = extractLinkInfo(description);
  const cleanDesc = cleanDescription(description);

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
    description: isBumpOnly ? "Version bump only for package" : cleanDesc,
    ...linkInfo,
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
  const lines = content.split("\n");

  const state: ParsingState = {
    currentVersion: "",
    currentDate: "",
    currentChangeType: "",
    inVersionSection: false,
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Parse version headers
    const versionInfo = parseVersionHeader(trimmedLine);

    if (versionInfo) {
      state.currentVersion = versionInfo.version;
      state.currentDate = versionInfo.date;
      state.inVersionSection = true;
      state.currentChangeType = "";
      console.log(
        `Starting version section for ${state.currentVersion} with date: "${state.currentDate}"`,
      );
      continue;
    }

    // Skip lines until we're in a version section
    if (!state.inVersionSection) continue;

    // Stop at next version header
    if (
      (trimmedLine.startsWith("## [") || trimmedLine.startsWith("# [")) &&
      !versionInfo
    ) {
      console.log(
        `Ending version section for ${state.currentVersion} due to new version line: "${trimmedLine}"`,
      );
      state.inVersionSection = false;
      continue;
    }

    // Handle version bump only
    if (trimmedLine.includes("Version bump only")) {
      entries.push(
        createChangelogEntry(packageName, state, "Version bump only", true),
      );
      continue;
    }

    // Parse change type sections
    const changeType = parseChangeType(trimmedLine);

    if (changeType) {
      state.currentChangeType = changeType;
      console.log(
        `Found change type: "${state.currentChangeType}" for version ${state.currentVersion}`,
      );
      continue;
    }

    // Parse change entries
    const changeMatch = trimmedLine.match(/^\*\s*(.+)/);

    if (changeMatch && state.currentChangeType) {
      const description = changeMatch[1];
      console.log(
        `Found change: "${description}" of type "${state.currentChangeType}" for version ${state.currentVersion}`,
      );
      entries.push(createChangelogEntry(packageName, state, description));
    }
  }

  return entries;
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

  // Sort by date (newest first) and then by package
  return allEntries.sort((a, b) => {
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

    return true;
  });
};
