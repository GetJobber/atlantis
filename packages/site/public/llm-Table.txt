# Table

# Table

<Banner type="notice" dismissible={false}>
  Consider using the atomic [DataTable](/components/DataTable) components before
  reaching for the Table component.
</Banner>

Tables are used to organize and display tabular data to users.

In addition to the base Table component, there are additional `Header`, `Body`,
`Footer`, `Row` and `Cell` each of which is used to construct a compliant table.

Multiple [Cell types](#cell-types) are provided for common formats.

## Design & usage guidelines

The Table component is a great solution when you need to allow the user to
compare data across items. It's a tried-and-true means of data visualization
that can make reports easier to read.

A best practice in Table presentation is to ensure that all columns with
numerical data (and their headers) round to the same decimal point, and are
right-aligned. This makes it much easier for the reader to quickly parse large
distinctions in dollar amounts, inventory counts, and other key business data.

To list more complex collections of information (such as multi-line content like
a detailed property address), you may want to consider the
[List](/components/List) component. If you have a small list of information with
a 1:1 label-to-data relationship (for example, the issued and due dates on an
invoice), consider using [DescriptionList](/components/DescriptionList).

## Web Component Code

```tsx
Table  Web React import type { ReactElement } from "react";
import React from "react";

interface BodyProps {
  readonly children: ReactElement | ReactElement[];
}

export function Body({ children }: BodyProps) {
  return <tbody>{children}</tbody>;
}
import type { ReactElement } from "react";
import React from "react";
import styles from "./Table.module.css";
import { Row } from "./Row";

interface FooterProps {
  readonly children: ReactElement | ReactElement[];
}

export function Footer({ children }: FooterProps) {
  return (
    <tfoot className={styles.footer}>
      <Row>{children}</Row>
    </tfoot>
  );
}
import type { ReactElement } from "react";
import React from "react";
import styles from "./Table.module.css";
import { Row } from "./Row";

interface HeaderProps {
  readonly children: ReactElement | ReactElement[];
}

export function Header({ children }: HeaderProps) {
  return (
    <thead className={styles.header}>
      <Row>{children}</Row>
    </thead>
  );
}
import type { ReactElement } from "react";
import React from "react";
import styles from "./Table.module.css";

interface RowProps {
  readonly children: ReactElement | ReactElement[];
}

export function Row({ children }: RowProps) {
  return <tr className={styles.row}>{children}</tr>;
}
import type { ReactElement } from "react";
import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  readonly children: ReactElement | ReactElement[];
}

export function Table({ children }: TableProps) {
  return <table className={styles.table}>{children}</table>;
}

```

## Props

### Web Props

_No props documented._

## Categories

- Lists & Tables

## Web Test Code

```typescript
Table  Web React Test Testing Jest import { render } from "@testing-library/react";
import React from "react";
import {
  Body,
  Cell,
  CellCurrency,
  CellNumeric,
  Footer,
  Header,
  Row,
  Table,
} from ".";

it("renders a table", () => {
  const { container } = render(
    <Table>
      <Header>
        <Cell>Ship</Cell>
        <Cell>Class</Cell>
        <Cell>Cost</Cell>
        <Cell>Crew</Cell>
      </Header>
      <Body>
        <Row>
          <Cell>Nostromo</Cell>
          <Cell>Towing Vehicle</Cell>
          <CellCurrency value={42000000} />
          <CellNumeric value={7} />
        </Row>
        <Row>
          <Cell>Rodger Young</Cell>
          <Cell>Corvette Transport</Cell>
          <Cell />
          <CellNumeric value={200} />
        </Row>
        <Row>
          <Cell>USS Enterprise</Cell>
          <Cell>Constitution</Cell>
          <Cell />
          <CellNumeric value={205} />
        </Row>
      </Body>
      <Footer>
        <Cell />
        <Cell />
        <Cell />
        <CellNumeric value={412} />
      </Footer>
    </Table>,
  );
  expect(container).toMatchSnapshot();
});

```

## Component Path

`/components/Table`

---

_Generated on 2025-08-21T17:35:16.372Z_
