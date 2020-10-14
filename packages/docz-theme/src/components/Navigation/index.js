/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useCurrentDoc, useMenus } from "docz";
import t from "prop-types";
import { Icon } from "@jobber/components/Icon";
import * as styles from "./styles";

export function Navigation({ query, sidebarRef }) {
  const menus = useMenus({ query });

  return (
    <Box sx={styles.wrapper}>
      {menus.map(menu => {
        if (!menu.menu) {
          return (
            <NavigationLink
              key={menu.id}
              item={menu}
              variation="heading"
              sidebarRef={sidebarRef}
            />
          );
        }
        return (
          <NavigationGroup key={menu.id} item={menu} sidebarRef={sidebarRef} />
        );
      })}
    </Box>
  );
}

Navigation.propTypes = {
  query: t.string,
  sidebarRef: t.any,
};

function NavigationLink({ variation, item, sidebarRef }) {
  const headings = item.headings.filter(heading => heading.depth === 2);
  const current = useCurrentDoc();
  const linkRef = useRef();
  const isCurrent = item.route === current.route;
  const currentHash = getCurrentHash();

  useEffect(() => {
    const hasSidebarRef = sidebarRef && sidebarRef.current;
    if (hasSidebarRef && linkRef.current && isCurrent) {
      sidebarRef.current.scrollTo(0, linkRef.current.offsetTop - 55);
    }
  }, [sidebarRef, linkRef]);

  return (
    <Box>
      <Link
        ref={linkRef}
        to={item.route}
        sx={styles.mainLink(variation)}
        className={isCurrent ? "active" : ""}
      >
        {item.name}
      </Link>
      {isCurrent &&
        headings.map(link => (
          <Link
            key={link.slug}
            to={`#${link.slug}`}
            sx={styles.subLink(variation)}
            className={currentHash === `#${link.slug}` ? "active" : ""}
          >
            {link.value}
          </Link>
        ))}
    </Box>
  );
}

NavigationLink.propTypes = {
  sidebarRef: t.oneOfType([
    t.func,
    t.shape({ current: t.instanceOf(Element) }),
  ]),
  variation: t.oneOf(["heading", "bullet"]),
  item: t.shape({
    name: t.string,
    route: t.string,
    headings: t.arrayOf(
      t.shape({
        depth: t.oneOf([1, 2, 3, 4, 5]),
        slug: t.string,
        value: t.string,
      }),
    ),
  }),
};

function NavigationGroup({ item, sidebarRef }) {
  const current = useCurrentDoc();
  const isActive = item.name === current.menu;
  const [open, setOpen] = useState(isActive);

  return (
    <Fragment>
      <Box sx={styles.mainLink()} onClick={() => setOpen(!open)}>
        {item.name}
        <Icon name={open ? "arrowUp" : "arrowDown"} color="greyBlue" />
      </Box>
      {open && (
        <Box sx={styles.subNav}>
          {item.menu.map(menu => (
            <NavigationLink
              key={menu.id}
              item={menu}
              variation="bullet"
              sidebarRef={sidebarRef}
            />
          ))}
        </Box>
      )}
    </Fragment>
  );
}

NavigationGroup.propTypes = {
  sidebarRef: t.oneOfType([
    t.func,
    t.shape({ current: t.instanceOf(Element) }),
  ]),
  item: t.shape({
    id: t.string,
    name: t.string,
    menu: t.arrayOf(
      t.shape({
        name: t.string,
        route: t.string,
        headings: t.arrayOf(
          t.shape({
            depth: t.oneOf([1, 2, 3, 4, 5]),
            slug: t.string,
            value: t.string,
          }),
        ),
      }),
    ),
  }),
};

function getCurrentHash() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location ? decodeURI(window.location.hash) : "";
}
