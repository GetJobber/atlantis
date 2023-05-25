import React, { useRef, useState } from "react";
import { Button } from "../Button";
import { Content } from "../Content";
import { DataTable } from "../DataTable";
import { Grid } from "../Grid";
import { List } from "../List";
// import classnames from "classnames";
// import styles from "./PageLayoutTest.css";

// type test = React.PropsWithChildren<GridProps>;

interface TwoColumnPageLayoutTestProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly primary: React.ReactNode;

  /**
   * Text to display.
   */
  readonly secondary?: React.ReactNode;

  // readonly header: NewHeaderProps;
}

// interface TwoColumnPageLayoutRef {
//   openSecondary: () => void;
//   closeSecondary: () => void;
//   primaryState: any;
//   secondaryState: any;
// }

export function TwoColumnPageLayoutTest({
  primary,
  secondary,
}: TwoColumnPageLayoutTestProps) {
  const primarySize = { xs: 12 as const, ...(secondary && { md: 8 as const }) };
  const renders = useRef(0);
  renders.current += 1;
  console.log("main renders", renders.current);

  return (
    <Grid>
      <Grid.Cell size={primarySize}>{primary}</Grid.Cell>
      {secondary ? (
        <Grid.Cell size={{ xs: 12, md: 4 }}>{secondary}</Grid.Cell>
      ) : (
        <Grid.Cell size={{ xs: 12 }}>
          <></>
        </Grid.Cell>
      )}
    </Grid>
  );
}

// function UsingComponent() {
//   const [state, setState] = useState();

//   return (
//     <TwoColumnPageLayoutTest
//       primary={<Primary onUpdate={setState} onUpdate={setState} />}
//       secondary={state.showSecondary && <Secondary state={state} />}
//     />
//   );
// }

export function Secondary({
  toggle,
  shared,
  inc,
}: {
  toggle: () => void;
  inc: () => void;
  shared: number;
}) {
  const [intVal, setIntVal] = useState(0);
  const renders = useRef(0);
  renders.current += 1;
  console.log("secondary renders", renders.current);
  return (
    <Content>
      <Button label={`State ${intVal}`} onClick={() => setIntVal(o => o + 1)} />
      <Button label={`Shared ${shared}`} onClick={inc} />
      <Button label={`Toggle`} onClick={toggle} />

      <List
        items={[
          {
            id: 1,
            icon: "addNote",
            title: "Darryl Tec added a note",
            content: [
              '_"Called the client. Asked if they want the luxury package, they said yes!"_',
              "Deck Build",
            ],
            caption: "1 minute ago",
            section: "Today",
            isActive: true,
            onClick: () => alert("TODO: Implement onClick"),
          },
          {
            id: 2,
            icon: "checkmark",
            iconColor: "green",
            title: "Josh Elford completed a visit",
            content: "Annual Maintenance",
            caption: "2 hours ago",
            section: "Today",
            onClick: () => alert("TODO: Implement onClick"),
          },
          {
            id: 3,
            icon: "badInvoice",
            title: "Payment failed",
            content: "For services rendered",
            value: "$300.00",
            caption: "1 day ago",
            onClick: () => alert("TODO: Implement onClick"),
            section: "Yesterday",
          },
          {
            id: 4,
            icon: "addNote",
            title: "Darryl Tec added a note",
            content: [
              '_"Called the client. Asked if they want the luxury package, they said yes!"_',
              "Deck Build",
            ],
            caption: "1 minute ago",
            section: "Today",
            isActive: true,
            onClick: () => alert("TODO: Implement onClick"),
          },
          {
            id: 5,
            icon: "checkmark",
            iconColor: "green",
            title: "Josh Elford completed a visit",
            content: "Annual Maintenance",
            caption: "2 hours ago",
            section: "Today",
            onClick: () => alert("TODO: Implement onClick"),
          },
          {
            id: 6,
            icon: "badInvoice",
            title: "Payment failed",
            content: "For services rendered",
            value: "$300.00",
            caption: "1 day ago",
            onClick: () => alert("TODO: Implement onClick"),
            section: "Yesterday",
          },
        ]}
      />
    </Content>
  );
}

export function Primary({
  toggle,
  shared,
  inc,
}: {
  toggle: () => void;
  inc: () => void;
  shared: number;
}) {
  const [intVal, setIntVal] = useState(0);
  const renders = useRef(0);
  renders.current += 1;
  console.log("primary renders", renders.current);
  return (
    <Content>
      <Button
        label="toggle"
        onClick={() => {
          toggle();
        }}
      />
      <Button label={`Shared ${shared}`} onClick={inc} />
      <Button label={`State ${intVal}`} onClick={() => setIntVal(o => o + 1)} />
      <DataTable
        data={[
          {
            name: "Jon Snow",
            house: "Stark",
            region: "North",
            sigil: "Direwolf",
            isAlive: "Yes",
          },
          {
            name: "Robert",
            house: "Stark",
            region: "North",
            sigil: "Direwolf",
            isAlive: "No",
          },
          {
            name: "Rickon",
            house: "Stark",
            region: "North",
            sigil: "Direwolf",
            isAlive: "No",
          },
          {
            name: "Robert",
            house: "Baratheon",
            region: "Stormlands",
            sigil: "Black Stag",
            isAlive: "No",
          },
          {
            name: "Cercei",
            house: "Lannister",
            region: "Westerlands",
            sigil: "Golden Lion",
            isAlive: "Yes",
          },
        ]}
        columns={[
          {
            accessorKey: "name",
          },
          {
            accessorKey: "house",
          },
          {
            accessorKey: "region",
          },
          {
            accessorKey: "sigil",
          },
          {
            accessorKey: "isAlive",
            accessorFn: row =>
              row.name === "Jon Snow" ? "Resurrected" : row.isAlive,
          },
        ]}
      />
    </Content>
  );
}

const MemoPrimary = React.memo(Primary);
const MemoSecondary = React.memo(Secondary);
export function TestComponent() {
  const [showSecondary, setShowSecondary] = useState(false);
  const [shared, setShared] = useState(0);
  return (
    <TwoColumnPageLayoutTest
      primary={
        <MemoPrimary
          toggle={() => setShowSecondary(oldValue => !oldValue)}
          shared={shared}
          inc={() => setShared(o => o + 1)}
        />
      }
      secondary={
        showSecondary && (
          <MemoSecondary
            toggle={() => setShowSecondary(oldValue => !oldValue)}
            inc={() => setShared(o => o + 1)}
            shared={shared}
          />
        )
      }
    />
  );
}
