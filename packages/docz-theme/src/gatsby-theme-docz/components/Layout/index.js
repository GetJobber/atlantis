/** @jsx jsx */
import { useRef, useState } from "react";
import { Layout as BaseLayout, Main, jsx } from "theme-ui";
import { Global } from "@emotion/core";
import t from "prop-types";
import global from "gatsby-theme-docz/src/theme/global";
import { Sidebar } from "gatsby-theme-docz/src/components/Sidebar";
import { MainContainer } from "gatsby-theme-docz/src/components/MainContainer";
import * as styles from "./styles";

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const nav = useRef();

  return (
    <BaseLayout>
      <Global styles={global} />
      <Main sx={styles.main}>
        <div sx={{ position: "fixed", top: 0, right: 0 }}>Buttons</div>
        <Sidebar
          ref={nav}
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
