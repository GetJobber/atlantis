import React, { Fragment, PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

export default function Wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <Fragment>
      <Helmet>
        <script src="https://snack.expo.io/embed.js"></script>
      </Helmet>
      {children}
    </Fragment>
  );
}
