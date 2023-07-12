import React from "react";
import { SvgXml } from "react-native-svg";
import { getQRsvgString } from "@jobber/qrcode";

export interface QRCodeSVGProps {
  /** The icon to show.  */
  readonly name: string;

  /** data to encode */
  readonly data: string;
}

export function QRCodeSVG({ name, data }: QRCodeSVGProps): JSX.Element {
  const SVGString = getQRsvgString(data);
  console.log(<SvgXml xml={SVGString} />);
  //viewBox={viewBox}
  return <SvgXml testID={name} xml={SVGString} width="100%" height="100%" />;
}
