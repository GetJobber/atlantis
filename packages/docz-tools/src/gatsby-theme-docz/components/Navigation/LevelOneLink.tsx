/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link } from "docz";
import { XOR } from "ts-xor";
import { Icon } from "@jobber/components/Icon";
import { levelOneLink } from "./styles";

interface LevelOneLinkBaseProps {
  readonly title: string;
  readonly active?: boolean;
}

interface LevelOneLinkLinkProps extends LevelOneLinkBaseProps {
  readonly url?: string;
}

interface LevelOneLinkGroupProps extends LevelOneLinkBaseProps {
  readonly open: boolean;
  onClick(): void;
}

type LevelOneLinkProps = XOR<LevelOneLinkLinkProps, LevelOneLinkGroupProps>;

export function LevelOneLink({
  title,
  active,
  url,
  onClick,
  open,
}: LevelOneLinkProps) {
  const iconName = open ? "arrowUp" : "arrowDown";
  const linkProps = {
    sx: levelOneLink(active),
  };

  if (onClick) {
    return (
      <Box {...linkProps} onClick={onClick}>
        {title} <Icon name={iconName} color="greyBlue" />
      </Box>
    );
  }

  return (
    <Link {...linkProps} to={url || "/"}>
      {title}
    </Link>
  );
}
