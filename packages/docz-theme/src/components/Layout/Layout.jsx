/** @jsx jsx */
import { useState } from "react";
import { Layout as BaseLayout, Main, jsx } from "theme-ui";
import { Global } from "@emotion/core";
import t from "prop-types";
import global from "gatsby-theme-docz/src/theme/global";
import { MainContainer } from "gatsby-theme-docz/src/components/MainContainer";
import { Sidebar } from "@jobber/docz-theme/components/Sidebar";
import { CTAS } from "@jobber/docz-theme/components/CTAS";
import * as styles from "./styles";

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <BaseLayout>
      <Global styles={global} />
      <Main sx={styles.main}>
        <CTAS />
        <Sidebar
          open={open}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen(false)}
        />
        <MainContainer>{children}</MainContainer>
      </Main>
    </BaseLayout>
  );
};

Layout.propTypes = {
  children: t.oneOfType([t.element, t.arrayOf(t.element)]).isRequired,
};
