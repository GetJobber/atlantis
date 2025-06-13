import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import {
  DataListItemActionsProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import styles from "../../../../DataList.module.css";
import { useDataListLayoutActionsContext } from "../../../DataListLayoutActions/DataListLayoutContext";

export function DataListItemClickableInternal<T extends DataListObject>({
  onClick,
  url,
  to,
  children,
}: PropsWithChildren<
  Pick<DataListItemActionsProps<T>, "onClick" | "url" | "to">
>) {
  const { activeItem } = useDataListLayoutActionsContext<T>();

  if (!activeItem) return <>{children}</>;

  if (to) {
    const computedTo = typeof to === "string" ? to : to(activeItem);

    return (
      <Link
        className={styles.listItemClickable}
        to={computedTo}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }

  if (url) {
    const href = typeof url === "string" ? url : url(activeItem);

    return (
      <a className={styles.listItemClickable} href={href} onClick={handleClick}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      // A button can be nested within the list item. To prevent a button inside
      // button error, we need to manually declare a div to be a button
      <div
        role="button"
        tabIndex={0}
        className={styles.listItemClickable}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;

  function handleClick(evt?: React.MouseEvent<HTMLElement>) {
    activeItem && onClick?.(activeItem, evt);
  }
}
