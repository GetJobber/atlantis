import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import {
  DataListItemActionsProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import styles from "../../../../DataList.css";
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
      <button className={styles.listItemClickable} onClick={handleClick}>
        {children}
      </button>
    );
  }

  return <>{children}</>;

  function handleClick() {
    activeItem && onClick?.(activeItem);
  }
}
