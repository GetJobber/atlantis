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

  if (!items) {
    return <></>;
  }

  return (
    <div ref={sidebarRef}>
      <List items={items} sidebarRef={sidebarRef} />
    </div>
  );
}

interface ListProps {
  items: PageOrGroup[];
  level?: number;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

function List({ items, level = 1, sidebarRef }: ListProps) {
  const doc = useCurrentDoc();
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
      {items.map(item => {
        const itemClass = classNames(styles.item);
        const pageLabel = classNames(styles.label, styles.pageLabel);
        const linkRef = createRef<HTMLDivElement>();

        useEffect(() => {
          if (
            item.type === "page" &&
            sidebarRef?.current &&
            linkRef?.current &&
            item.item.route === doc.route
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
              />
            ) : (
              <div ref={linkRef}>
                <Link
                  to={item.item.route}
                  className={pageLabel}
                  activeClassName={styles.active}
                >
                  {item.name}
                </Link>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

interface NavigationGroupProps {
  readonly item: Group;
  readonly level: number;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

function NavigationGroup({ item, level, sidebarRef }: NavigationGroupProps) {
  const doc = useCurrentDoc();
  const [open, setOpen] = useState(getInitialOpen);
  const buttonLabel = classNames(styles.label, styles.groupLabel, {
    [styles.active]: open,
  });

  return (
    <>
      <button onClick={handleClick} className={buttonLabel}>
        {item.name}
        {level === 1 && (
          <Icon name={open ? "arrowUp" : "arrowDown"} color="greyBlue" />
        )}
      </button>
      {open && (
        <List items={item.items} level={level + 1} sidebarRef={sidebarRef} />
      )}
    </>
  );

  function handleClick() {
    if (level === 1) {
      setOpen(!open);
    }
  }

  function getInitialOpen() {
    if (doc.menu.startsWith(item.name)) {
      return true;
    }

    if (level !== 1) {
      return true;
    }

    return false;
  }
}
