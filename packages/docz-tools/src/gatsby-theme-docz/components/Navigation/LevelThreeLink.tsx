/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "docz";
import { Icon } from "@jobber/components/Icon";
import { levelThreeLink } from "./styles";

interface LevelThreeLinkProps {
  readonly title: string;
  readonly slug: string;
}

export function LevelThreeLink({ title, slug }: LevelThreeLinkProps) {
  const link = `#${slug}`;
  const currentHash = getCurrentHash();
  const isActive = link === currentHash;

  return (
    <Link to={link} sx={levelThreeLink(isActive)}>
      <Icon
        name="arrowRight"
        size="small"
        color={isActive ? "white" : "greyBlue"}
      />
      {title}
    </Link>
  );

  function getCurrentHash() {
    if (typeof window === "undefined") {
      return "";
    }
    return window.location ? decodeURI(window.location.hash) : "";
  }
}
