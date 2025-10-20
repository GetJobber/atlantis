import { useMemo, useState } from "react";
import { DataTable } from "@jobber/components";
import { filterChangelogEntries, parseAllChangelogs } from "./ChangelogParser";
import { useMultiSelectSync } from "./useMultiSelectSync";
import { useTableColumns } from "./useTableColumns";
import { ChangelogFilters } from "./ChangelogFilters";

export const ChangelogDataTable = () => {
  const [filters, setFilters] = useState({
    packages: [] as string[],
    changeTypes: [] as string[],
    excludeBumpOnly: false,
    onlyBreakingChanges: false,
  });

  const allEntries = useMemo(() => parseAllChangelogs(), []);

  const filteredEntries = useMemo(
    () => filterChangelogEntries(allEntries, filters),
    [allEntries, filters],
  );

  const availablePackages = useMemo(
    () => Array.from(new Set(allEntries.map(entry => entry.package))).sort(),
    [allEntries],
  );

  const availableChangeTypes = useMemo(() => {
    const filteredTypes = allEntries
      .map(entry => entry.changeType)
      .filter(type => {
        const lowerType = type.toLowerCase();

        return !lowerType.includes("breaking") && !lowerType.includes("revert");
      });

    const types = new Set(filteredTypes);

    const hasBreakingChanges = allEntries.some(entry => entry.isBreakingChange);

    if (hasBreakingChanges) {
      types.add("Breaking change");
    }

    const hasReversions = allEntries.some(entry =>
      entry.changeType.toLowerCase().includes("revert"),
    );

    if (hasReversions) {
      types.add("Reversion");
    }

    return Array.from(types).sort();
  }, [allEntries]);

  const packageMultiSelect = useMultiSelectSync(
    availablePackages,
    filters.packages,
    packages => setFilters(prev => ({ ...prev, packages })),
  );

  const changeTypeMultiSelect = useMultiSelectSync(
    availableChangeTypes,
    filters.changeTypes,
    changeTypes => setFilters(prev => ({ ...prev, changeTypes })),
  );

  const columns = useTableColumns();

  const clearAllFilters = () => {
    setFilters({
      packages: [],
      changeTypes: [],
      excludeBumpOnly: false,
      onlyBreakingChanges: false,
    });
  };

  return (
    <div>
      <ChangelogFilters
        packageMultiSelect={packageMultiSelect}
        changeTypeMultiSelect={changeTypeMultiSelect}
        excludeBumpOnly={filters.excludeBumpOnly}
        onExcludeBumpOnlyChange={checked =>
          setFilters(prev => ({ ...prev, excludeBumpOnly: checked }))
        }
        onClearAllFilters={clearAllFilters}
      />
      <DataTable
        data={filteredEntries}
        columns={columns as never}
        pagination={{
          itemsPerPage: [10, 25, 50, 100],
          manualPagination: false,
        }}
        sorting={undefined}
        stickyHeader
      />
    </div>
  );
};
