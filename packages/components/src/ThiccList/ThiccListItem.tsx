import React, { useState } from "react";
import styles from "./ThiccList.css";
import { ListQueryType } from "./gqlUtils";
import { ThiccListItemMenu } from "./ThiccListItemMenu";
import { FormatRelativeDateTime } from "../FormatRelativeDateTime";
import { Text } from "../Text";
import { Grid } from "../Grid";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

type ListNode = ListQueryType["allPeople"]["edges"][number]["node"];

interface ThiccListItemProps extends ListNode {
  onClick: (data: ListNode) => void;
}

export function ThiccListItem({ onClick, ...node }: ThiccListItemProps) {
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      className={styles.listContent}
      onMouseEnter={() => setShowHoverMenu(true)}
      onMouseLeave={() => setShowHoverMenu(false)}
      onContextMenu={e => {
        e.preventDefault();
        console.log(e);
        setContextMenuPosition({ x: e.pageX, y: e.pageY });
        setShowHoverMenu(false);
        setShowContextMenu(true);
      }}
    >
      <button
        key={node.id}
        className={styles.listContentItem}
        onClick={() => onClick(node)}
      >
        <Grid>
          <Grid.Cell size={{ xs: 3 }}>
            <Text>{node.name}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 3 }}>
            <Text variation="subdued">{node.homeworld.name}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">{node.gender}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">{node.skinColor}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">
              <FormatRelativeDateTime date={node.created} />
            </Text>
          </Grid.Cell>
        </Grid>
      </button>

      {/* Float-y bits be portaled to the body */}
      {showHoverMenu && (
        <div
          className={styles.listContentHoverMenu}
          onContextMenu={e => e.stopPropagation()}
        >
          <Tooltip message="Compose Email">
            <Button
              icon="email"
              ariaLabel="Email"
              variation="subtle"
              type="secondary"
            />
          </Tooltip>
          <Tooltip message="Create Note">
            <Button
              icon="addNote"
              ariaLabel="Note"
              variation="subtle"
              type="secondary"
            />
          </Tooltip>
          <Tooltip message="More actions">
            <Button
              icon="more"
              ariaLabel="More"
              variation="subtle"
              type="secondary"
            />
          </Tooltip>
        </div>
      )}

      <ThiccListItemMenu
        visible={showContextMenu}
        position={contextMenuPosition}
        onRequestClose={() => setShowContextMenu(false)}
      />
    </div>
  );
}
