import { useMemo } from "react";
import { Button, InlineLabel, Link, Text } from "@jobber/components";

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

const TypeCell = ({
  type,
  entry,
}: {
  readonly type: string;
  readonly entry: { readonly isBreakingChange: boolean };
}) => {
  if (type.toLowerCase().includes("revert")) {
    return <InlineLabel color="blueDark">Reversion</InlineLabel>;
  }

  if (entry.isBreakingChange) {
    return <InlineLabel color="red">Breaking change</InlineLabel>;
  }

  if (type.toLowerCase().includes("feature")) {
    return <InlineLabel color="green">Feature</InlineLabel>;
  }

  if (type.toLowerCase().includes("bug")) {
    return <InlineLabel color="yellow">Bug</InlineLabel>;
  }

  return <InlineLabel color="greyBlue">{type}</InlineLabel>;
};

export const useTableColumns = () => {
  return useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: (info: { getValue: () => string }) => {
          const dateString = info.getValue();

          let date = new Date(dateString);

          if (
            isNaN(date.getTime()) &&
            dateString.match(/^\d{4}-\d{2}-\d{2}$/)
          ) {
            date = new Date(dateString + "T00:00:00");
          }

          if (isNaN(date.getTime())) {
            return dateString;
          }

          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: "package",
        header: "Package",
        cell: (info: { getValue: () => string }) => {
          return <PackageCell packageName={info.getValue()} />;
        },
      },
      {
        accessorKey: "version",
        header: "Version",
        cell: (info: { getValue: () => string }) => (
          <Text variation="subdued" size="small">
            {info.getValue()}
          </Text>
        ),
      },
      {
        accessorKey: "changeType",
        header: "Type",
        cell: (info: {
          getValue: () => string;
          row: {
            original: {
              isBreakingChange: boolean;
            };
          };
        }) => {
          const type = info.getValue();
          const entry = info.row.original;

          return <TypeCell type={type} entry={entry} />;
        },
        size: 160,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info: {
          getValue: () => string;
          row: {
            original: {
              isBreakingChange: boolean;
              prNumber?: string;
              prUrl?: string;
            };
          };
        }) => {
          const entry = info.row.original;

          return (
            <div>
              <Text size="small">{info.getValue()}</Text>
              {entry.prNumber && (
                <Button
                  type="tertiary"
                  size="small"
                  label={`PR #${entry.prNumber}`}
                  url={entry.prUrl}
                  external
                />
              )}
            </div>
          );
        },
      },
    ],
    [],
  );
};
