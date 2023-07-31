import React, { PropsWithChildren } from "react";
import styles from "./ThiccList.css";
import { SortOrder } from "./utils";
import { Grid } from "../Grid";
import { Text } from "../Text";

const headers = [
  { label: "Client", sortable: true },
  { label: "Address", sortable: true },
  { label: "Tags", sortable: false },
  { label: "Status", sortable: true },
  { label: "Activity", sortable: true },
];

export type HeaderType = typeof headers;
export type HeaderLabelType = HeaderType[number]["label"];

interface ThiccListHeaderProps {
  readonly sortOrder: SortOrder;
  readonly sortedHeader: HeaderLabelType;
  readonly onClick: (label: HeaderLabelType, sortBy: SortOrder) => void;
}

export function ThiccListHeader({
  sortOrder,
  sortedHeader,
  onClick,
}: ThiccListHeaderProps) {
  const sortIcon = sortOrder === "A-Z" ? "⏷" : "⏶";

  return (
    <Grid alignItems="center">
      {headers.map(({ label, sortable }, i) => {
        let labelEl = <ThiccListHeaderText>{label}</ThiccListHeaderText>;

        if (sortable) {
          labelEl = (
            <button
              className={styles.listHeaderButton}
              onClick={() => {
                const sortBy =
                  sortedHeader === label && sortOrder === "A-Z" ? "Z-A" : "A-Z";
                onClick(label, sortBy);
              }}
            >
              <ThiccListHeaderText>
                {label} {sortedHeader === label && `, ${sortOrder} ${sortIcon}`}
              </ThiccListHeaderText>
            </button>
          );
        }

        return (
          <Grid.Cell key={label} size={{ xs: i <= 1 ? 3 : 2 }}>
            {labelEl}
          </Grid.Cell>
        );
      })}
    </Grid>
  );
}

function ThiccListHeaderText({ children }: PropsWithChildren<object>) {
  return (
    <Text size="small" variation="subdued">
      <b className={styles.listHeaderText}>{children}</b>
    </Text>
  );
}
