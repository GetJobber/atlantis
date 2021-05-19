import React, { RefObject, useState } from "react";
// import classNames from "classnames";
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
}

function List({ items }: ListProps) {
  return (
    <ul className={styles.list}>
      {items.map(item => {
        return (
          <li key={item.id} className={styles.item}>
            {item.type === "group" ? (
              <NavigationGroup item={item} />
            ) : (
              <Link to={item.item.route} className={styles.label}>
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
  readonly level?: number;
}

function NavigationGroup({ item, level = 1 }: NavigationGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={handleClick}
        className={level === 1 ? styles.label : styles.groupLabel}
      >
        {item.name}
        {level === 1 && (
          <Icon name={open ? "arrowUp" : "arrowDown"} color="lightBlue" />
        )}
      </button>
      {open && (
        <ul>
          {item.items.map(menuItem => {
            // const itemClass = classNames({
            //   [styles.group]: menuItem.type === "group",
            //   [styles.page]: menuItem.type === "page",
            // });

            return (
              <li key={menuItem.id}>
                {menuItem.type === "page" ? (
                  <Link to={menuItem.item.route} className={styles.pageLink}>
                    {menuItem.name}
                  </Link>
                ) : (
                  <NavigationGroup item={menuItem} level={level + 1} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  function handleClick() {
    setOpen(!open);
  }
}
