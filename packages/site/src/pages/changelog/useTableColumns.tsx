import { useMemo } from "react";
import { InlineLabel, Link, Text } from "@jobber/components";
import { ColumnDef } from "@jobber/components/DataTable";
import { CHANGE_TYPES, ChangelogEntry } from "./ChangelogParser";

const PackageCell = ({ packageName }: { readonly packageName: string }) => {
  switch (packageName) {
    case "components":
      return <Link url="/packages/components">components</Link>;
    case "design":
      return <Link url="/packages/design">design</Link>;
    case "eslint-config":
      return <Link url="/packages/eslint-config">eslint config</Link>;
    case "hooks":
      return <Link url="/packages/hooks">hooks</Link>;
    case "stylelint-config":
      return <Link url="/packages/stylelint-config">stylelint config</Link>;
    default:
      return <Text>{packageName}</Text>;
  }
};

const TypeCell = ({ type }: { readonly type: string }) => {
  switch (type) {
    case CHANGE_TYPES.REVERSION:
      return (
        <InlineLabel color="blueDark">{CHANGE_TYPES.REVERSION}</InlineLabel>
      );
    case CHANGE_TYPES.BREAKING_CHANGE:
      return (
        <InlineLabel color="red">{CHANGE_TYPES.BREAKING_CHANGE}</InlineLabel>
      );
    case CHANGE_TYPES.FEATURE:
      return <InlineLabel color="green">{CHANGE_TYPES.FEATURE}</InlineLabel>;
    case CHANGE_TYPES.BUG_FIX:
      return <InlineLabel color="yellow">{CHANGE_TYPES.BUG_FIX}</InlineLabel>;
    case CHANGE_TYPES.VERSION_BUMP:
      return (
        <InlineLabel color="greyBlue">{CHANGE_TYPES.VERSION_BUMP}</InlineLabel>
      );
    default:
      return <InlineLabel color="greyBlue">{type}</InlineLabel>;
  }
};

export const useTableColumns = (): ColumnDef<ChangelogEntry>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ getValue, row }) => {
          const timestamp = row.original.timestamp;

          if (timestamp === 0) {
            return getValue() as string;
          }

          return new Date(timestamp).toLocaleDateString();
        },
      },
      {
        accessorKey: "package",
        header: "Package",
        cell: ({ getValue }) => {
          return <PackageCell packageName={getValue() as string} />;
        },
      },
      {
        accessorKey: "version",
        header: "Version",
        cell: ({ getValue }) => (
          <Text variation="subdued" size="small">
            {getValue() as string}
          </Text>
        ),
      },
      {
        accessorKey: "changeType",
        header: "Type",
        cell: ({ getValue }) => {
          const type = getValue() as string;

          return <TypeCell type={type} />;
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => {
          return <Text size="small">{getValue() as string}</Text>;
        },
      },
      {
        accessorKey: "prNumber",
        header: "Pull Request",
        cell: ({ getValue, row }) => {
          const prNumber = getValue() as string;

          return (
            <Link url={row.original.prUrl ?? ""} external>
              {prNumber}
            </Link>
          );
        },
      },
    ],
    [],
  );
};
