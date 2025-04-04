export interface FrameProps {
  readonly children: React.ReactNode;
  /** The left, width, initial, part of the ratio */
  readonly n?: number;
  /** The right, height, secondary part of the ratio */
  readonly d?: number;
}
