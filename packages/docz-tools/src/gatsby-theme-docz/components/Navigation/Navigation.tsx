import React, { RefObject, useState } from "react";
import classNames from "classnames";
import { Link } from "docz";
import { Icon } from "@jobber/components/Icon";
import { Group, PageOrGroup, useJobberMenu } from "./useJobberMenu";
import * as styles from "./Navigation.module.css";

interface NavigationProps {
  readonly query?: string;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Navigation({ query, sidebarRef }: NavigationProps) {
  const items = useJobberMenu(query);
  console.log(items);

  if (!items) {
    return <></>;
  }

  return (
    <div>
      <List items={items} />
    </div>
  );
}

interface ListProps {
  items: PageOrGroup[];
  level?: number;
}

function List({ items, level = 1 }: ListProps) {
  return (
    <ul className={styles.list}>
      {items.map(item => {
        const itemClass = classNames(
          styles.item,
          /**
           * We are ignoring the error here so that we can allow
           * for arbitrary level classes within the CSS. Note: if
           * the classname (example: `level12345`) is not found, an error
           * does not occur and the class name is omitted.
           */
          // @ts-expect-error
          styles[`level${level}`],
        );
        const pageLabel = classNames(styles.label, styles.pageLabel);

        return (
          <li key={item.id} className={itemClass}>
            {item.type === "group" ? (
              <NavigationGroup item={item} level={level} />
            ) : (
              <Link to={item.item.route} className={pageLabel}>
                {item.name}
              </Link>
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
}

function NavigationGroup({ item, level }: NavigationGroupProps) {
  const [open, setOpen] = useState(level === 1 ? false : true);
  const buttonLabel = classNames(styles.label, styles.groupLabel);

  return (
    <>
      <button onClick={handleClick} className={buttonLabel}>
        {item.name}
        {level === 1 && (
          <Icon name={open ? "arrowUp" : "arrowDown"} color="lightBlue" />
        )}
      </button>
      {open && <List items={item.items} level={level + 1} />}
    </>
  );

  function handleClick() {
    if (level === 1) {
      setOpen(!open);
    }
  }
}
