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

const address = [
  "348 Burdett Avenue, Victoria, British Columbia, V8W IE9",
  "1507 Bellwood Acres Rd, Huntsville, Ontario, P0A 1K0",
  "3452 Haaglund Rd, Oliver, British Columbia, V0H 1T0",
  "4874 Bay Street, Toronto, Ontario, M5J 2R8",
  "2366 Lynden Road, Moonstone, Ontario, L0K 1N0",
  "3573 90th Avenue, Brooks, Alberta, T0J 0J0",
  "2108 Alness Street, Toronto, Ontario, M3J 2J1",
  "727 Brew Creek Rd, Port Hardy, British Columbia, V0N 2P0",
  "4086 Boulevard Ste-Geneviève, Chicoutimi, Quebec, G7H 5G3",
  "4571 Ste. Catherine Ouest, Montreal, Quebec, H3A 4G4",
  "4839 40th Street, Calgary, Alberta, T2A 1C8",
  "4320 Duke Street, Montreal, Quebec, H3C 5K4",
  "2383 Charing Cross Rd, Chatham, Ontario, N7M 2G9",
  "500 Eglinton Avenue, Toronto, Ontario, M4P 1A6",
  "4386 40th Street, Calgary, Alberta, T2A 1C8",
  "1946 43rd Avenue, Whitehorse, Yukon, Y1A 2A2",
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
  const addressNumber = useRef(
    Math.floor(Math.random() * address.length),
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
            <Text maxLines="single">{data.name}</Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 3 }}>
            <Text variation="subdued" maxLines="single">
              {data.homeworld.name}, {address[addressNumber]}
            </Text>
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
        onSelect={() => {
          onClick(data);
          setShowContextMenu(false);
        }}
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
