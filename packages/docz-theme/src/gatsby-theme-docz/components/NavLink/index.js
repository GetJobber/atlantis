/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { useCurrentDoc, useDocs } from "docz";
import t from "prop-types";
import * as styles from "./styles";

// eslint-disable-next-line max-statements
export function NavLink({ item, sidebarRef, ...props }) {
  const docs = useDocs();
  const current = useCurrentDoc();
  const linkRef = useRef();

  const to = item.route;
  const headings = docs && getHeadings();
  const isCurrent = to === current.route;
  const showHeadings = isCurrent && headings && headings.length > 0;
  const currentHash = getCurrentHash();

  useEffect(() => {
    const hasSidebarRef = sidebarRef && sidebarRef.current;
    if (hasSidebarRef && linkRef.current && isCurrent) {
      sidebarRef.current.scrollTo(0, linkRef.current.offsetTop);
    }
  }, [sidebarRef, linkRef]);

  if (item.hidden) {
    return undefined;
  }

  return (
    <Fragment>
      <Link {...props} to={to} activeClassName="active" ref={linkRef} />
      {showHeadings && (
        <Box sx={styles.headings}>
          {headings.map(heading => (
            <Link
              key={heading.slug}
              to={`${to}#${heading.slug}`}
              sx={styles.smallLink}
              className={currentHash === `#${heading.slug}` ? "active" : ""}
            >
              {heading.value}
            </Link>
          ))}
        </Box>
      )}
    </Fragment>
  );

  function getHeadings() {
    const { headings: docHeadings } = docs.find(doc => doc.route === to);
    return docHeadings
      ? docHeadings.filter(heading => heading.depth === 2)
      : [];
  }

  function getCurrentHash() {
    if (typeof window === "undefined") {
      return "";
    }
    return window.location ? decodeURI(window.location.hash) : "";
  }
}

NavLink.propTypes = {
  item: t.shape({
    route: t.string,
    hidden: t.bool,
  }),
  sidebarRef: t.shape({ current: t.instanceOf(Element) }),
};
