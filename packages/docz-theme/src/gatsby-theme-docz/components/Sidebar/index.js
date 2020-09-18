/** @jsx jsx */
import { Fragment, useRef, useState } from "react";
import { Global } from "@emotion/core";
import { Box, jsx } from "theme-ui";
import t from "prop-types";
import { Logo } from "@jobber/docz-theme/components/Logo";
import { InputText } from "@jobber/components/InputText";
import { Navigation } from "@jobber/docz-theme/components/Navigation";
import * as styles from "./styles";

export function Sidebar(props) {
  const [query, setQuery] = useState("");
  const sidebarRef = useRef();

  return (
    <Fragment>
      <Box onClick={props.onClick} sx={styles.overlay(props)}>
        {props.open && <Global styles={styles.global} />}
      </Box>
      <Box ref={sidebarRef} sx={styles.wrapper(props)} data-testid="sidebar">
        <Logo />
        <Box sx={styles.search}>
          <InputText placeholder="Search the docs" onChange={setQuery} />
        </Box>
        <Navigation query={query} sidebarRef={sidebarRef} />
      </Box>
    </Fragment>
  );
}

Sidebar.propTypes = {
  onFocus: t.func,
  onBlur: t.func,
  onClick: t.func,
  open: t.bool,
};
