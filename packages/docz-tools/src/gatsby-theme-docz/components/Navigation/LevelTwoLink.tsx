/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "docz";
import { levelTwoLink } from "./styles";

interface LevelTwoLinkProps {
  readonly title: string;
  readonly url?: string;
  readonly active: boolean;
}

export function LevelTwoLink({ title, url, active }: LevelTwoLinkProps) {
  return (
    <Link sx={levelTwoLink(active)} to={url || ""}>
      {title}
    </Link>
  );
}
