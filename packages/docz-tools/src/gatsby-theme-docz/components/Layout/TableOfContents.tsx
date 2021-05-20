import React, { useState } from "react";
import { Link, useConfig, useCurrentDoc } from "docz";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
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
    themeConfig: { hasActions = true },
  } = useConfig();
  const toggleClass = classNames(styles.toggle, {
    [styles.open]: open,
  });
  const tocClass = classNames(styles.tableOfContents, {
    [styles.open]: open,
  });

  return (
    <>
      <div className={toggleClass}>
        <Button
          icon={open ? "remove" : "more"}
          onClick={toggleOpen}
          type="primary"
        />
      </div>
      <div className={tocClass}>
        <div className={styles.inner}>
          <div className={styles.header}>
            {hasActions && <Actions />}
            <Heading level={6}>Contents</Heading>
          </div>
          <ul>
            {headings
              .filter(heading => heading.depth === 2)
              .map(heading => (
                <li key={heading.slug}>
                  <Link to={`#${heading.slug}`} onClick={closeToggle}>
                    {heading.value}
                  </Link>
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

  function closeToggle() {
    setOpen(false);
  }
}
