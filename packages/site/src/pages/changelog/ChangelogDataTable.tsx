import { useMemo, useState } from "react";
import { Content, DataTable } from "@jobber/components";
import {
  CHANGE_TYPES,
  filterChangelogEntries,
  getAvailableChangeTypes,
  getAvailablePackages,
  parseAllChangelogs,
} from "./ChangelogParser";
import { useTableColumns } from "./useTableColumns";
import { ChangelogFilters } from "./ChangelogFilters";

const allEntries = parseAllChangelogs();
const availableChangeTypes = getAvailableChangeTypes(allEntries);
const availablePackages = getAvailablePackages(allEntries);

export const ChangelogDataTable = () => {
  const [filters, setFilters] = useState(() => ({
    packages: ["components", "components-native"],
    changeTypes: availableChangeTypes.filter(
      type => type !== CHANGE_TYPES.VERSION_BUMP,
    ),
  }));

  const filteredEntries = useMemo(
    () => filterChangelogEntries(allEntries, filters),
    [filters],
  );

  const columns = useTableColumns();

  return (
    <Content>
      <ChangelogFilters
        availablePackages={availablePackages}
        selectedPackages={filters.packages}
        onPackagesChange={packages =>
          setFilters(prev => ({ ...prev, packages }))
        }
        availableChangeTypes={availableChangeTypes}
        selectedChangeTypes={filters.changeTypes}
        onChangeTypesChange={changeTypes =>
          setFilters(prev => ({ ...prev, changeTypes }))
        }
      />

      <DataTable
        data={filteredEntries}
        columns={columns}
        pagination={{
          itemsPerPage: [10, 25, 50, 100],
          manualPagination: false,
        }}
        sorting={undefined}
        stickyHeader
      />
    </Content>
  );
};
