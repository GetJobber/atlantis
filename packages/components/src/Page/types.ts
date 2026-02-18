import type { ReactNode, RefObject } from "react";
import { type ButtonProps } from "../Button";
import { type SectionProps } from "../Menu";

export type ButtonActionProps = ButtonProps & {
  ref?: React.RefObject<HTMLDivElement | null>;
};

interface PageBaseProps {
  readonly children: ReactNode | ReactNode[];

  /**
   * Title of the page.
   *
   * Supports any React node. If a string is provided, it will be rendered as an H1 heading.
   * Otherwise it will be rendered as is.
   *
   * **Important**: If you're passing a custom element, it must include an H1-level heading within it.
   * Ideally <Heading level={1}> should be used here.
   */
  readonly title: ReactNode;

  /**
   * TitleMetaData component to be displayed
   * next to the title. Only compatible with string titles.
   */
  readonly titleMetaData?: ReactNode;

  /**
   * Subtitle of the page.
   */
  readonly subtitle?: string;

  /**
   * Determines the width of the page.
   *
   * Fill makes the width grow to 100%.
   *
   * Standard caps out at 1280px.
   *
   * Narrow caps out at 1024px.
   *
   * @default standard
   */
  readonly width?: "fill" | "standard" | "narrow";

  /**
   * Page title primary action button settings.
   */
  readonly primaryAction?: ButtonActionProps;

  /**
   * Page title secondary action button settings.
   */
  readonly secondaryAction?: ButtonActionProps;

  /**
   * Page title Action menu.
   */
  readonly moreActionsMenu?: SectionProps[];
}

interface PageWithIntroProps extends PageBaseProps {
  /**
   * Content of the page. This supports basic markdown node types
   * such as `_italic_`, `**bold**`, and `[link name](url)`.
   */
  readonly intro: string;

  /**
   * Causes any markdown links in the `intro` prop to open in a new
   * tab, i.e. with `target="_blank"`.
   *
   * Can only be used if `intro` prop is also specified.
   *
   * Defaults to `false`.
   */
  readonly externalIntroLinks?: boolean;
}

interface PageWithoutIntroProps extends PageBaseProps {
  readonly intro?: never;
  readonly externalIntroLinks?: never;
}

export type PageLegacyProps = PageWithIntroProps | PageWithoutIntroProps;

export interface PageComposableProps {
  readonly children: ReactNode;
  readonly width?: "fill" | "standard" | "narrow";
}

export type PageProps = PageLegacyProps | PageComposableProps;

export interface PageHeaderProps {
  readonly children: ReactNode;
}

export interface PageTitleProps {
  readonly children: ReactNode;
  readonly metadata?: ReactNode;
}

export interface PageSubtitleProps {
  readonly children: ReactNode;
}

export interface PageIntroProps {
  readonly children: ReactNode;
  readonly externalLinks?: boolean;
}

export interface PageActionsProps {
  readonly children: ReactNode;
}

export interface PageActionProps {
  readonly children?: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly label?: string;
  readonly onClick?: () => void;
  readonly icon?: ButtonProps["icon"];
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly ariaLabel?: string;
}

export interface PageMenuProps {
  readonly children: ReactNode;
  readonly triggerLabel?: string;
}

export interface PageBodyProps {
  readonly children: ReactNode;
}
