export interface ChipProps {
  /**
   * Label of the chip
   */
  readonly label: string;

  /**
   * Changes the style of the chip to look different than the default
   */
  readonly active?: boolean;

  /**
   * Callback when the chip itself gets clicked.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}
