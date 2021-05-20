import React, { useState } from "react";
import { Link, useConfig, useCurrentDoc } from "docz";
import { AnimatePresence, motion } from "framer-motion";
import { Heading } from "@jobber/components/Heading";
import { Button } from "@jobber/components/Button";
import * as styles from "./TableOfContents.module.css";
import { Actions } from "../Actions";

interface DoczHeading {
  depth: number;
  slug: string;
  value: string;
}

export function TableOfContents() {
  const [open, setOpen] = useState(false);
  const { headings } = useCurrentDoc() as { headings: DoczHeading[] };

  const {
    themeConfig: { sideBarWidth, hasActions = true },
  } = useConfig();

  const tocStyles = {
    maxWidth: sideBarWidth,
    width: sideBarWidth,
    right: open ? 0 : -sideBarWidth,
  };
  const toggleStyle = {
    right: open ? sideBarWidth : 0,
    zIndex: open ? 9998 : 8887,
  };

  return (
    <>
      <div className={styles.toggle} style={toggleStyle}>
        <Button
          icon={open ? "remove" : "more"}
          onClick={toggleOpen}
          type="tertiary"
        />
      </div>
      <div className={styles.tableOfContents} style={tocStyles}>
        <div
          className={styles.tableOfContentsInner}
          style={{ width: sideBarWidth }}
        >
          <div className={styles.tableOfContentsHeader}>
            {hasActions && <Actions />}
            <Heading level={6}>Contents</Heading>
          </div>
          <ul>
            {headings
              .filter(heading => heading.depth === 2)
              .map(heading => (
                <li key={heading.slug}>
                  <Link to={`#${heading.slug}`}>{heading.value}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className={styles.overlay}
            onClick={toggleOpen}
          />
        )}
      </AnimatePresence>
    </>
  );

  function toggleOpen() {
    setOpen(!open);
  }
}
