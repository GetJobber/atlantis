import React from "react";
import { getQRsvgString } from "@jobber/qrcode";

export interface QRCodeSVGProps {
  /** The icon to show.  */
  readonly name: string;

  /**
   * Changes the size to small or large.
   * @default base
   */
  readonly data?: string;
}

export function QRCodeSVG({ data }: QRCodeSVGProps) {
  const SVGString = getQRsvgString(data);

  return (
    <div>
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(SVGString)}`} />
    </div>
  );
}
