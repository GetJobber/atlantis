import type { ReactNode } from "react";
import type {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHelpers/types";

export interface ContainerProps extends CommonAtlantisProps {
  readonly children: ReactNode;
  /** The name of the container. This allows you to name your container query, but it's not necessary. */
  readonly name: string;
  /** The class name for the container. This allows you to target the container with CSS. */
  readonly className?: string;
  /** Whether to allow the container to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;
}
export interface ContainerApplyProps {
  readonly children: ReactNode;
  /** The class name for the container. This allows you to target the container with CSS. */
  readonly className?: string;
  /** The style for the container */
  readonly style?: React.CSSProperties;
  /** Whether to allow the container to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
}
