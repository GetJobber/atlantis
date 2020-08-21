import React from "react";
import t from "prop-types";
import { Helmet } from "react-helmet";
import { useConfig, useCurrentDoc } from "docz";

import "@jobber/design/foundation.css";

const Wrapper = ({ children }) => {
  const {
    themeConfig: { favicon },
    title,
    description,
  } = useConfig();
  const { name, route } = useCurrentDoc();
  const isHomePage = route === "/";
  const hasName = name !== "";
  const showName = hasName && !isHomePage;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {showName ? (
          <title>
            {name} | {title}
          </title>
        ) : (
          <title>{title}</title>
        )}
        <meta name="description" content={description} />
        {favicon && <link rel="icon" type="image/png" href={favicon} />}
      </Helmet>
      {children}
    </>
  );
};

Wrapper.propTypes = {
  children: t.element,
};

// eslint-disable-next-line import/no-default-export
export default Wrapper;
