import React, { useRef, useState } from "react";
import throttle from "lodash/throttle";
import classNames from "classnames";
import styles from "./ThiccList.css";
import { ListNode } from "./gqlUtils";
import { ThiccListItemMenu } from "./ThiccListItemMenu";
import { ThiccListAction } from "./ThiccListAction";
import { FormatRelativeDateTime } from "../FormatRelativeDateTime";
import { Text } from "../Text";
import { Grid } from "../Grid";
import { InlineLabel, InlineLabelColors } from "../InlineLabel";

const tags =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit Ullam placeat nemo dolores eveniet ipsum libero alias autem aspernatur tempore aliquam officiis aliquid et quos aperiam quibusdam vitae animi debitis deserunt".split(
    " ",
  );

const status: { label: string; color: InlineLabelColors }[] = [
  { label: "Active", color: "green" },
  { label: "Archived", color: "greyBlue" },
  { label: "Lead", color: "lightBlue" },
];

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
  const date = useRef(randomDate()).current;
  const tagCount = useRef(Math.floor(Math.random() * 13)).current;
  const randomNumbersArray = useRef(
    Array.from({ length: tagCount }, () =>
      Math.floor(Math.random() * tags.length),
    ),
  ).current;
  const statusNumber = useRef(
    Math.floor(Math.random() * status.length),
  ).current;
  const selectedStatus = status[statusNumber];

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
            <div className={styles.inlineLabel}>
              <InlineLabel>{data.skinColor}</InlineLabel>
              {randomNumbersArray.map((num, i) => (
                <InlineLabel key={num + tags[num] + i}>{tags[num]}</InlineLabel>
              ))}
            </div>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            {selectedStatus.label !== "Active" && (
              <div className={styles.inlineLabel}>
                <InlineLabel color={selectedStatus.color}>
                  {selectedStatus.label}
                </InlineLabel>
              </div>
            )}
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">
              <FormatRelativeDateTime date={date} />
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

function randomDate() {
  const start = new Date(2023, 6, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}
