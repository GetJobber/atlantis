import React from "react";
import { Form } from "@remix-run/react";

export const BaseForm = ({ children, ...rest }: React.PropsWithChildren) => {
  return <Form {...rest}>{children}</Form>;
};
