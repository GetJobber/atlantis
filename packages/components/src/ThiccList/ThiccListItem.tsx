import React, { useState } from "react";
import throttle from "lodash/throttle";
import classNames from "classnames";
import styles from "./ThiccList.css";
import { ListNode } from "./gqlUtils";
import { ThiccListItemMenu } from "./ThiccListItemMenu";
import { ThiccListAction } from "./ThiccListAction";
import { FormatRelativeDateTime } from "../FormatRelativeDateTime";
import { Text } from "../Text";
import { Grid } from "../Grid";

interface ThiccListItemProps {
  readonly isSelected: boolean;
  readonly data: ListNode;
  readonly onClick: (data: ListNode) => void;
  readonly onDoubleClick: (data: ListNode) => void;
}

export function ThiccListItem({
  data,
  isSelected,
  onClick,
  onDoubleClick,
}: ThiccListItemProps) {
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleClick = throttle(() => onClick(data), 200);

  return (
    <div
      className={classNames(styles.listContent, {
        [styles.listContentSelected]: isSelected,
      })}
      onMouseEnter={() => setShowHoverMenu(true)}
      onMouseLeave={() => setShowHoverMenu(false)}
      onContextMenu={e => {
        e.preventDefault();
        console.log(e);
        setContextMenuPosition({ x: e.pageX, y: e.pageY });
        setShowHoverMenu(false);
        setShowContextMenu(true);
      }}
      onDoubleClick={() => {
        handleClick.cancel();
        onDoubleClick(data);
      }}
    >
      <button
        key={data.id}
        className={styles.listContentItem}
        onClick={handleClick}
      >
        <Grid>
          <Grid.Cell size={{ xs: 3 }}>
            <Text>{data.name}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 3 }}>
            <Text variation="subdued">{data.homeworld.name}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">{data.gender}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">{data.skinColor}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">
              <FormatRelativeDateTime date={data.created} />
            </Text>
          </Grid.Cell>
        </Grid>
      </button>

      {/* Float-y bits be portaled to the body */}
      {showHoverMenu && (
        <div
          className={styles.listContentHoverMenu}
          onContextMenu={e => e.stopPropagation()}
          onMouseLeave={() => setShowHoverMenu(false)}
        >
          <ThiccListAction label="Compose Email" icon="email" />
          <ThiccListAction label="Create Note" icon="addNote" />
          <ThiccListAction label="More actions" icon="more" />
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
