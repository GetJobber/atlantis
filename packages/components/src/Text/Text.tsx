import React, { ReactNode } from "react";
import { Typography } from "../Typography";

interface TextProps {
  readonly variation?:
    | "subdued"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "button"
    | "subhead";
  readonly children: ReactNode;
}

export function Text({ variation, children }: TextProps) {
  switch (variation) {
    case "subdued":
      return <Typography textColor="greyBlue">{children}</Typography>;
    case "success":
      return <Typography textColor="green">{children}</Typography>;
    case "error":
      return <Typography textColor="red">{children}</Typography>;
    case "warning":
      return <Typography textColor="yellow">{children}</Typography>;
    case "info":
      return <Typography textColor="lightBlue">{children}</Typography>;
    case "button":
      return (
        <Typography
          textCase="uppercase"
          textColor="green"
          fontWeight="extraBold"
          size="small"
        >
          {children}
        </Typography>
      );
    case "subhead":
      return <Typography size="larger">{children}</Typography>;
    default:
      return <Typography>{children}</Typography>;
  }
}
