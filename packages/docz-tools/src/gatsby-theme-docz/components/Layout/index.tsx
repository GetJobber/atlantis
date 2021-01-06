/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, PropsWithChildren } from "react";
import { Global } from "@emotion/react";
import { global } from "~theme/global";

// eslint-disable-next-line import/no-relative-parent-imports
// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Global styles={global} />
      <Box>
        <Box></Box>
        <Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Fragment>
  );
}
