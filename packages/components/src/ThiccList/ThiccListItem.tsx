import React, { MouseEvent, useState } from "react";
import throttle from "lodash/throttle";
import classNames from "classnames";
import { AnimatePresence, Variants, motion } from "framer-motion";
import styles from "./ThiccList.css";
import { ThiccListItemMenu } from "./ThiccListItemMenu";
import { ThiccListAction } from "./ThiccListAction";
import { SideSheet } from "./SideSheet";
import { DataType } from "./data";
import { FormatRelativeDateTime } from "../FormatRelativeDateTime";
import { Text } from "../Text";
import { Grid } from "../Grid";
import { InlineLabel } from "../InlineLabel";

interface ThiccListItemProps {
  readonly isSelected: boolean;
  readonly data: DataType;
  readonly onClick: (
    data: DataType,
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
  readonly onDoubleClick: (data: DataType) => void;
}

const variants: Variants = {
  hidden: { y: "20%", opacity: 0, pointerEvents: "none" },
  visible: { y: 0, opacity: 1, pointerEvents: "auto" },
};

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

  const handleClick = throttle((event: MouseEvent<HTMLButtonElement>) => {
    onClick(data, event);
  }, 200);
  const maxTags = 3;

  return (
    <div
      className={classNames(styles.listContent, {
        [styles.listContentSelected]: isSelected,
      })}
      onMouseEnter={() => setShowHoverMenu(true)}
      onMouseLeave={() => setShowHoverMenu(false)}
      onContextMenu={toggleContextMenu}
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
              {data.address}
            </Text>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <div className={styles.inlineLabel}>
              {data.tags.map((tag, i) => (
                <InlineLabel key={tag + i}>{tag}</InlineLabel>
              ))}
              <div className={styles.overflowTags}>
                {data.tags.length > maxTags && (
                  <Text variation="subdued">+{data.tags.length - maxTags}</Text>
                )}
              </div>
            </div>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            {data.status.label !== "Active" && (
              <div className={styles.inlineLabel}>
                <InlineLabel color={data.status.color}>
                  {data.status.label}
                </InlineLabel>
              </div>
            )}
          </Grid.Cell>
          <Grid.Cell size={{ xs: 2 }}>
            <Text variation="subdued">
              <FormatRelativeDateTime date={data.lastActiveDate} />
            </Text>
          </Grid.Cell>
        </Grid>
      </button>

      {/* Float-y bits be portaled to the body */}
      <AnimatePresence>
        {showHoverMenu && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, delay: 0.2 }}
            className={styles.listContentHoverMenu}
            onContextMenu={e => e.stopPropagation()}
            onMouseLeave={() => setShowHoverMenu(false)}
          >
            <ThiccListAction
              label="Email"
              icon="email"
              onClick={e => {
                onClick(data, e);
                SideSheet.show();
              }}
            />
            <ThiccListAction label="Create Note" icon="addNote" />
            <ThiccListAction
              label="More actions"
              icon="more"
              onClick={toggleContextMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ThiccListItemMenu
        id={data.id}
        visible={showContextMenu}
        position={contextMenuPosition}
        onSelect={() => {
          setShowContextMenu(false);
        }}
        onRequestClose={() => setShowContextMenu(false)}
      />
    </div>
  );

  function toggleContextMenu(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) {
    e.preventDefault();
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowHoverMenu(false);
    setShowContextMenu(true);
  }
}
