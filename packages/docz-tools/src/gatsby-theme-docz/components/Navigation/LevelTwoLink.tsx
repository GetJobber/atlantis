/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link } from "docz";
import { RefObject, createRef, useEffect } from "react";
import { levelTwoLink } from "./styles";

interface LevelTwoLinkProps {
  readonly title: string;
  readonly url?: string;
  readonly active: boolean;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

export function LevelTwoLink({
  title,
  url,
  active,
  sidebarRef,
}: LevelTwoLinkProps) {
  const linkRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (sidebarRef.current && linkRef.current && active) {
      sidebarRef.current.scrollTo(0, linkRef.current.offsetTop);
    }
  }, []);
  return (
    <Box ref={linkRef}>
      <Link sx={levelTwoLink(active)} to={url || ""}>
        {title}
      </Link>
    </Box>
  );
}
