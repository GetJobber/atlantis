import React from "react";

interface ImageProps {
  readonly src: string;
  readonly alt: string;
}

export function Image({ src, alt }: ImageProps) {
  return <img src={src} alt={alt} style={{ maxWidth: "100%" }} />;
}
