export interface FrameProps {
  readonly children: React.ReactNode;
  /** The horizontal (width) part of the aspect ratio */
  readonly aspectX?: number;
  /** The vertical (height) part of the aspect ratio */
  readonly aspectY?: number;
}
