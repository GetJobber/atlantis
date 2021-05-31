import classNames from "classnames";
import React, { RefObject, createRef, useEffect, useState } from "react";
import { Link, useCurrentDoc } from "docz";
import { Icon } from "@jobber/components/Icon";
import { Group, PageOrGroup, useJobberMenu } from "./useJobberMenu";
import * as styles from "./Navigation.module.css";

interface NavigationProps {
  readonly query?: string;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

export function Navigation({ query, sidebarRef }: NavigationProps) {
  const items = useJobberMenu(query);
  const hasQuery = query != undefined && query !== "";

  if (!items) {
    return <></>;
  }

  return (
    <div ref={sidebarRef}>
      <List items={items} initialOpen={hasQuery} sidebarRef={sidebarRef} />
    </div>
  );
}

interface ListProps {
  items: PageOrGroup[];
  level?: number;
  readonly initialOpen: boolean;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

function List({ items, level = 1, initialOpen, sidebarRef }: ListProps) {
  const listClass = classNames(
    styles.list,
    /**
     * We are ignoring the error here so that we can allow
     * for arbitrary level classes within the CSS. Note: if
     * the classname (example: `level12345`) is not found, an error
     * does not occur and the class name is omitted.
     */
    // @ts-expect-error
    styles[`level${level}`],
  );

  return (
    <ul className={listClass}>
      {items.map(item => (
        <Item
          key={item.id}
          initialOpen={initialOpen}
          item={item}
          sidebarRef={sidebarRef}
          level={level}
        />
      ))}
    </ul>
  );
}

interface NavigationGroupProps {
  readonly item: Group;
  readonly level: number;
  readonly initialOpen: boolean;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

function NavigationGroup({
  item,
  level,
  initialOpen,
  sidebarRef,
}: NavigationGroupProps) {
  const doc = useCurrentDoc();
  const [open, setOpen] = useState(getInitialOpen);
  const buttonLabel = classNames(styles.label, styles.groupLabel, {
    [styles.active]: open,
  });

  useEffect(() => setOpen(getInitialOpen()), [initialOpen]);

  return (
    <>
      <button onClick={handleClick} className={buttonLabel}>
        {item.name.replace(/^\(\d+\)/, "").trim()}
        {level === 1 && (
          <Icon name={open ? "arrowUp" : "arrowDown"} color="greyBlue" />
        )}
      </button>
      {open && (
        <List
          items={item.items}
          level={level + 1}
          sidebarRef={sidebarRef}
          initialOpen={initialOpen}
        />
      )}
    </>
  );

  function handleClick() {
    if (level === 1) {
      setOpen(!open);
    }
  }

  function getInitialOpen() {
    if (initialOpen) {
      return true;
    }

    if (doc.menu.startsWith(item.name)) {
      return true;
    }

    if (level !== 1) {
      return true;
    }

    return false;
  }
}

interface ItemProps {
  readonly item: PageOrGroup;
  readonly level: number;
  readonly initialOpen: boolean;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

function Item({ item, level, initialOpen, sidebarRef }: ItemProps) {
  const currentDoc = useCurrentDoc();
  const itemClass = classNames(styles.item);
  const pageLabel = classNames(styles.label, styles.pageLabel);
  const linkRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (
      item.type === "page" &&
      sidebarRef?.current &&
      linkRef?.current &&
      item.item.route === currentDoc.route
    ) {
      sidebarRef.current.scrollTo(0, linkRef.current.offsetTop);
    }
  }, []);

  return (
    <li key={item.id} className={itemClass}>
      {item.type === "group" ? (
        <NavigationGroup
          item={item}
          level={level}
          sidebarRef={sidebarRef}
          initialOpen={initialOpen}
        />
      ) : (
        <div>
          <Link
            to={item.item.route}
            className={pageLabel}
            activeClassName={styles.active}
          >
            {item.name.replace(/^\(\d+\)/, "").trim()}
          </Link>
        </div>
      )}
    </li>
  );
}
