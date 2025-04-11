export interface CoverProps {
  readonly children: React.ReactNode;
  /** The minimum height of the element. Suggested to use `vh` units. */
  readonly minHeight?: string;
  /** The amount of space around the centered content */
  readonly space?: string;
}
